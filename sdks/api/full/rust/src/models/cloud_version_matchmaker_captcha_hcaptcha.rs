/*
 * Rivet API
 *
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.0.1
 *
 * Generated by: https://openapi-generator.tech
 */

/// CloudVersionMatchmakerCaptchaHcaptcha : hCpatcha configuration.

#[derive(Clone, Debug, PartialEq, Default, Serialize, Deserialize)]
pub struct CloudVersionMatchmakerCaptchaHcaptcha {
	#[serde(rename = "level", skip_serializing_if = "Option::is_none")]
	pub level: Option<crate::models::CloudVersionMatchmakerCaptchaHcaptchaLevel>,
	/// Site key for your hCaptcha application. Must be set.
	#[serde(rename = "site_key", skip_serializing_if = "Option::is_none")]
	pub site_key: Option<String>,
	/// Secret key for your hCaptcha application. Must be set.
	#[serde(rename = "secret_key", skip_serializing_if = "Option::is_none")]
	pub secret_key: Option<String>,
}

impl CloudVersionMatchmakerCaptchaHcaptcha {
	/// hCpatcha configuration.
	pub fn new() -> CloudVersionMatchmakerCaptchaHcaptcha {
		CloudVersionMatchmakerCaptchaHcaptcha {
			level: None,
			site_key: None,
			secret_key: None,
		}
	}
}
