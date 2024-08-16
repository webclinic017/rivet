variable "namespace" {
	type = string
}

variable "deploy_method_local" {
	type = bool
}

variable "deploy_method_cluster" {
	type = bool
}

variable "public_ip" {
	type = string
    nullable = true
    default = null
}

# MARK: DNS
variable "domain_main" {
	type = string
}

variable "domain_cdn" {
	type = string
}

variable "domain_job" {
	type = string
}

variable "dns_deprecated_subdomains" {
	type = bool
}

variable "extra_dns" {
	description = "DNS records generated by Bolt. These records are used to expose Bolt services to the web. See `ServiceRouter` in `lib/bolt/config/src/service.rs`."
	type = list(object({
		zone_name = string
		name = string
	}))
}

# MARK: Backend
variable "backend_enabled" {
	type = bool
}

# MARK: Cloudflare
variable "cloudflare_account_id" {
	type = string
}
