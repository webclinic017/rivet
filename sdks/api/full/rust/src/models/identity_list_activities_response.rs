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
pub struct IdentityListActivitiesResponse {
	#[serde(rename = "identities")]
	pub identities: Vec<crate::models::IdentityHandle>,
	#[serde(rename = "games")]
	pub games: Vec<crate::models::GameSummary>,
	#[serde(rename = "suggested_groups")]
	pub suggested_groups: Vec<crate::models::GroupSummary>,
	#[serde(rename = "suggested_players")]
	pub suggested_players: Vec<crate::models::IdentityHandle>,
	#[serde(rename = "watch")]
	pub watch: Box<crate::models::WatchResponse>,
}

impl IdentityListActivitiesResponse {
	pub fn new(
		identities: Vec<crate::models::IdentityHandle>,
		games: Vec<crate::models::GameSummary>,
		suggested_groups: Vec<crate::models::GroupSummary>,
		suggested_players: Vec<crate::models::IdentityHandle>,
		watch: crate::models::WatchResponse,
	) -> IdentityListActivitiesResponse {
		IdentityListActivitiesResponse {
			identities,
			games,
			suggested_groups,
			suggested_players,
			watch: Box::new(watch),
		}
	}
}
