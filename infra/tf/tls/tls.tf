resource "tls_private_key" "main" {
	lifecycle {
		# Prevent destruction since our server leaders can't gracefully transfer
		# ownership without being able to SSH and stop the old services.
		# TODO: SVC-2459
		# prevent_destroy = true
	}

	algorithm = "ECDSA"
	ecdsa_curve = "P384"
}

# MARK: Cloudflare origin cert (rivet.gg)
# See https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull#zone-level--cloudflare-certificate
resource "tls_private_key" "cf_origin_rivet_gg" {
	algorithm = "RSA"
}

resource "tls_cert_request" "cf_origin_rivet_gg" {
	private_key_pem = tls_private_key.cf_origin_rivet_gg.private_key_pem

	subject {
		common_name  = ""
		organization = "Rivet Gaming, LLC"
	}
}

resource "cloudflare_origin_ca_certificate" "rivet_gg" {
	csr = tls_cert_request.cf_origin_rivet_gg.cert_request_pem
	hostnames = ["*.${var.domain_main}", "${var.domain_main}", "*.api.${var.domain_main}", "api.${var.domain_main}"]
	request_type = "origin-rsa"
	requested_validity = 15 * 365
}

# for creating locally signed certs
resource "tls_private_key" "root_ca" {
  algorithm = "RSA"
}

# create self-signed root certificate, which acts as local CA 
resource "tls_self_signed_cert" "root_ca" {
	key_algorithm   = "RSA"
  	private_key_pem = tls_private_key.root_ca.private_key_pem
  	is_ca_certificate = true

  	subject {
    	common_name  = ""
    	organization = "Rivet Gaming, LLC"
  	}

	validity_period_hours = 8760 # 1 year

	allowed_uses = [
		"key_encipherment",
    	"digital_signature",
    	"cert_signing",
    	"crl_signing"
  	]
}

resource "tls_private_key" "locally_signed_tunnel_server" {
	algorithm = "RSA"
}

resource "tls_cert_request" "locally_signed_tunnel_server" {
	private_key_pem = tls_private_key.locally_signed_tunnel_server.private_key_pem

	subject {
		common_name  = ""
		organization = "Rivet Gaming, LLC"
	}
}

resource "tls_locally_signed_cert" "locally_signed_tunnel_server" {
	cert_request_pem = tls_cert_request.locally_signed_tunnel_server.cert_request_pem
  
	ca_key_algorithm   = "RSA"
	ca_private_key_pem = tls_private_key.root_ca.private_key_pem
	ca_cert_pem        = tls_self_signed_cert.root_ca.cert_pem
  
	validity_period_hours = 8760 # 1 year
  
	allowed_uses = [
    	"key_encipherment",
    	"digital_signature",
    	"server_auth"
  	]
}

# for nomad clients
resource "tls_private_key" "locally_signed_nomad_client" {
	algorithm = "RSA"
}

resource "tls_cert_request" "locally_signed_nomad_client" {
	private_key_pem = tls_private_key.locally_signed_nomad_client.private_key_pem

	subject {
		common_name  = ""
		organization = "Rivet Gaming, LLC"
	}
}

resource "tls_locally_signed_cert" "locally_signed_nomad_client" {
	cert_request_pem = tls_cert_request.locally_signed_nomad_client.cert_request_pem
  
	ca_key_algorithm   = "RSA"
	ca_private_key_pem = tls_private_key.root_ca.private_key_pem
	ca_cert_pem        = tls_self_signed_cert.root_ca.cert_pem
  
	validity_period_hours = 8760 # 1 year
  
	allowed_uses = [
    	"key_encipherment",
    	"digital_signature",
    	"server_auth"
  	]
}

# for game guard nodes
resource "tls_private_key" "locally_signed_game_guard" {
	algorithm = "RSA"
}

resource "tls_cert_request" "locally_signed_game_guard" {
	private_key_pem = tls_private_key.locally_signed_game_guard.private_key_pem

	subject {
		common_name  = ""
		organization = "Rivet Gaming, LLC"
	}
}

resource "tls_locally_signed_cert" "locally_signed_game_guard" {
	cert_request_pem = tls_cert_request.locally_signed_game_guard.cert_request_pem
  
	ca_key_algorithm   = "RSA"
	ca_private_key_pem = tls_private_key.root_ca.private_key_pem
	ca_cert_pem        = tls_self_signed_cert.root_ca.cert_pem
  
	validity_period_hours = 8760 # 1 year
  
	allowed_uses = [
    	"key_encipherment",
    	"digital_signature",
    	"server_auth"
  	]
}

# for game guard
# TODO add once get the nomad client talking to the core cluster

locals {
	# Cloudflare client cert used for mTLS. See
	# https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull#zone-level--cloudflare-certificate
	cloudflare_ca_cert = <<EOF
-----BEGIN CERTIFICATE-----
MIIGCjCCA/KgAwIBAgIIV5G6lVbCLmEwDQYJKoZIhvcNAQENBQAwgZAxCzAJBgNV
BAYTAlVTMRkwFwYDVQQKExBDbG91ZEZsYXJlLCBJbmMuMRQwEgYDVQQLEwtPcmln
aW4gUHVsbDEWMBQGA1UEBxMNU2FuIEZyYW5jaXNjbzETMBEGA1UECBMKQ2FsaWZv
cm5pYTEjMCEGA1UEAxMab3JpZ2luLXB1bGwuY2xvdWRmbGFyZS5uZXQwHhcNMTkx
MDEwMTg0NTAwWhcNMjkxMTAxMTcwMDAwWjCBkDELMAkGA1UEBhMCVVMxGTAXBgNV
BAoTEENsb3VkRmxhcmUsIEluYy4xFDASBgNVBAsTC09yaWdpbiBQdWxsMRYwFAYD
VQQHEw1TYW4gRnJhbmNpc2NvMRMwEQYDVQQIEwpDYWxpZm9ybmlhMSMwIQYDVQQD
ExpvcmlnaW4tcHVsbC5jbG91ZGZsYXJlLm5ldDCCAiIwDQYJKoZIhvcNAQEBBQAD
ggIPADCCAgoCggIBAN2y2zojYfl0bKfhp0AJBFeV+jQqbCw3sHmvEPwLmqDLqynI
42tZXR5y914ZB9ZrwbL/K5O46exd/LujJnV2b3dzcx5rtiQzso0xzljqbnbQT20e
ihx/WrF4OkZKydZzsdaJsWAPuplDH5P7J82q3re88jQdgE5hqjqFZ3clCG7lxoBw
hLaazm3NJJlUfzdk97ouRvnFGAuXd5cQVx8jYOOeU60sWqmMe4QHdOvpqB91bJoY
QSKVFjUgHeTpN8tNpKJfb9LIn3pun3bC9NKNHtRKMNX3Kl/sAPq7q/AlndvA2Kw3
Dkum2mHQUGdzVHqcOgea9BGjLK2h7SuX93zTWL02u799dr6Xkrad/WShHchfjjRn
aL35niJUDr02YJtPgxWObsrfOU63B8juLUphW/4BOjjJyAG5l9j1//aUGEi/sEe5
lqVv0P78QrxoxR+MMXiJwQab5FB8TG/ac6mRHgF9CmkX90uaRh+OC07XjTdfSKGR
PpM9hB2ZhLol/nf8qmoLdoD5HvODZuKu2+muKeVHXgw2/A6wM7OwrinxZiyBk5Hh
CvaADH7PZpU6z/zv5NU5HSvXiKtCzFuDu4/Zfi34RfHXeCUfHAb4KfNRXJwMsxUa
+4ZpSAX2G6RnGU5meuXpU5/V+DQJp/e69XyyY6RXDoMywaEFlIlXBqjRRA2pAgMB
AAGjZjBkMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMBAf8ECDAGAQH/AgECMB0GA1Ud
DgQWBBRDWUsraYuA4REzalfNVzjann3F6zAfBgNVHSMEGDAWgBRDWUsraYuA4REz
alfNVzjann3F6zANBgkqhkiG9w0BAQ0FAAOCAgEAkQ+T9nqcSlAuW/90DeYmQOW1
QhqOor5psBEGvxbNGV2hdLJY8h6QUq48BCevcMChg/L1CkznBNI40i3/6heDn3IS
zVEwXKf34pPFCACWVMZxbQjkNRTiH8iRur9EsaNQ5oXCPJkhwg2+IFyoPAAYURoX
VcI9SCDUa45clmYHJ/XYwV1icGVI8/9b2JUqklnOTa5tugwIUi5sTfipNcJXHhgz
6BKYDl0/UP0lLKbsUETXeTGDiDpxZYIgbcFrRDDkHC6BSvdWVEiH5b9mH2BON60z
0O0j8EEKTwi9jnafVtZQXP/D8yoVowdFDjXcKkOPF/1gIh9qrFR6GdoPVgB3SkLc
5ulBqZaCHm563jsvWb/kXJnlFxW+1bsO9BDD6DweBcGdNurgmH625wBXksSdD7y/
fakk8DagjbjKShYlPEFOAqEcliwjF45eabL0t27MJV61O/jHzHL3dknXeE4BDa2j
bA+JbyJeUMtU7KMsxvx82RmhqBEJJDBCJ3scVptvhDMRrtqDBW5JShxoAOcpFQGm
iYWicn46nPDjgTU0bX1ZPpTpryXbvciVL5RkVBuyX2ntcOLDPlZWgxZCBp96x07F
AnOzKgZk4RzZPNAxCXERVxajn/FLcOhglVAKo5H0ac+AitlQ0ip55D2/mf8o72tM
fVQ6VpyjEXdiIXWUq/o=
-----END CERTIFICATE-----
EOF
}

