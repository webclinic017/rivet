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
pub struct MatchmakerLobbiesCreateRequest {
	#[serde(rename = "game_mode")]
	pub game_mode: String,
	#[serde(rename = "region", skip_serializing_if = "Option::is_none")]
	pub region: Option<String>,
	#[serde(rename = "publicity", skip_serializing_if = "Option::is_none")]
	pub publicity: Option<crate::models::MatchmakerCustomLobbyPublicity>,
	#[serde(rename = "tags", skip_serializing_if = "Option::is_none")]
	pub tags: Option<::std::collections::HashMap<String, String>>,
	#[serde(rename = "max_players", skip_serializing_if = "Option::is_none")]
	pub max_players: Option<i32>,
	#[serde(
		rename = "lobby_config",
		default,
		with = "::serde_with::rust::double_option",
		skip_serializing_if = "Option::is_none"
	)]
	pub lobby_config: Option<Option<serde_json::Value>>,
	#[serde(rename = "captcha", skip_serializing_if = "Option::is_none")]
	pub captcha: Option<Box<crate::models::CaptchaConfig>>,
	#[serde(
		rename = "verification_data",
		default,
		with = "::serde_with::rust::double_option",
		skip_serializing_if = "Option::is_none"
	)]
	pub verification_data: Option<Option<serde_json::Value>>,
}

impl MatchmakerLobbiesCreateRequest {
	pub fn new(game_mode: String) -> MatchmakerLobbiesCreateRequest {
		MatchmakerLobbiesCreateRequest {
			game_mode,
			region: None,
			publicity: None,
			tags: None,
			max_players: None,
			lobby_config: None,
			captcha: None,
			verification_data: None,
		}
	}
}
