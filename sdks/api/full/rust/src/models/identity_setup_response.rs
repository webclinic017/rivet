/*
 * Rivet API
 *
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.0.1
 *
 * Generated by: https://openapi-generator.tech
 */

#[derive(Clone, Debug, PartialEq, Default, Serialize, Deserialize)]
pub struct IdentitySetupResponse {
	/// Documentation at https://jwt.io/
	#[serde(rename = "identity_token")]
	pub identity_token: String,
	/// RFC3339 timestamp
	#[serde(rename = "identity_token_expire_ts")]
	pub identity_token_expire_ts: String,
	#[serde(rename = "identity")]
	pub identity: Box<crate::models::IdentityProfile>,
	#[serde(rename = "game_id")]
	pub game_id: uuid::Uuid,
}

impl IdentitySetupResponse {
	pub fn new(
		identity_token: String,
		identity_token_expire_ts: String,
		identity: crate::models::IdentityProfile,
		game_id: uuid::Uuid,
	) -> IdentitySetupResponse {
		IdentitySetupResponse {
			identity_token,
			identity_token_expire_ts,
			identity: Box::new(identity),
			game_id,
		}
	}
}
