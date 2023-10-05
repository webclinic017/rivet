locals {
	clickhouse_k8s = var.clickhouse_provider == "kubernetes"
	service_clickhouse = lookup(var.services, "clickhouse", {
		count = 1
		resources = {
			cpu = 100
			cpu_cores = 0
			memory = 1500
		}
	})
}

module "clickhouse_secrets" {
	count = local.clickhouse_k8s ? 1 : 0

	source = "../modules/secrets"

	keys = [
		"clickhouse/users/default/password"
	]
}

resource "kubernetes_namespace" "clickhouse" {
	count = local.clickhouse_k8s ? 1 : 0

	metadata {
		name = "clickhouse"
	}
}

resource "helm_release" "clickhouse" {
	depends_on = [helm_release.prometheus]
	count = local.clickhouse_k8s ? 1 : 0

	name = "clickhouse"
	namespace = kubernetes_namespace.clickhouse[0].metadata.0.name
	repository = "oci://registry-1.docker.io/bitnamicharts"
	chart = "clickhouse"
	version = "4.0.4"
	values = [yamlencode({
		global = {
			storageClass = var.k8s_storage_class
		}
		replicaCount = local.service_clickhouse.count
		shards = 1
		zookeeper = {
			replicaCount = 1
		}

		resources = {
			limits = {
				memory = "${local.service_clickhouse.resources.memory}Mi"
				cpu = (
					local.service_clickhouse.resources.cpu_cores > 0 ?
					"${local.service_clickhouse.resources.cpu_cores * 1000}m"
					: "${local.service_clickhouse.resources.cpu}m"
				)
			}
		}

		tls = {
			enabled = true
			autoGenerated = true
		}

		# Disable insecure ports
		# See: https://clickhouse.com/docs/en/guides/sre/configuring-ssl#5-configure-ssl-tls-interfaces-on-clickhouse-nodes
		extraOverrides = <<-EOF
			<?xml version="1.0"?>
			<clickhouse>
				<http_port remove="remove"/>
				<tcp_port remove="remove"/>
				<interserver_http_port remove="remove"/>
				<interserver_https_port>9010</interserver_https_port>

				# See https://clickhouse.com/docs/en/engines/table-engines/mergetree-family/replication#replicatedmergetree-parameters
				<default_replica_path>/clickhouse/tables/{shard}/{database}/{table}</default_replica_path>
				<default_replica_name>{replica}</default_replica_name>
			</clickhouse>
			EOF
		
		# Grant access to default user
		usersExtraOverrides = <<-EOF
			<?xml version="1.0"?>
			<clickhouse>
				<users>
					<default>
						<access_management>1</access_management>
					</default>
				</users>
			</clickhouse>
			EOF

		# Probes can't use https for some reason
		livenessProbe = {
			enabled = false
		}
		readinessProbe = {
			enabled = false
		}
		# TODO: Make probes use secure port
		# customLivenessProbe = {
		# 	httpGet = {
		# 		path = "/ping"
		# 		port = "https"
		# 	}
		# }
		# customReadinessProbe = {
		# 	httpGet = {
		# 		path = "/ping"
		# 		port = "https"
		# 	}
		# }

		# Admin auth
		auth = {
			username = "default"
			password = module.clickhouse_secrets[0].values["clickhouse/users/default/password"]
		}

		metrics = {
			enabled = true

			serviceMonitor = {
				enabled = true
				namespace = kubernetes_namespace.clickhouse[0].metadata.0.name
			}

			# TOOD:
			# prometheusRule = {
			# 	enabled = true
			# 	namespace = kubernetes_namespace.prometheus.metadata.0.name
			# }
		}
	})]
}

data "kubernetes_secret" "clickhouse_ca" {
	count = local.clickhouse_k8s ? 1 : 0

	depends_on = [helm_release.clickhouse]

	metadata {
		name = "clickhouse-crt"
		namespace = kubernetes_namespace.clickhouse[0].metadata.0.name
	}
}

resource "kubernetes_config_map" "clickhouse_ca" {
	for_each = local.clickhouse_k8s ? toset(["rivet-service", "bolt"]) : toset([])

	metadata {
		name = "clickhouse-ca"
		namespace = each.value
	}

	data = {
		"ca.crt" = data.kubernetes_secret.clickhouse_ca[0].data["ca.crt"]
	}
}

