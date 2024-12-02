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
pub struct GroupGetJoinRequestsResponse {
	/// A list of group join requests.
	#[serde(rename = "join_requests")]
	pub join_requests: Vec<crate::models::GroupJoinRequest>,
	/// The pagination anchor.
	#[serde(rename = "anchor", skip_serializing_if = "Option::is_none")]
	pub anchor: Option<String>,
	#[serde(rename = "watch")]
	pub watch: Box<crate::models::WatchResponse>,
}

impl GroupGetJoinRequestsResponse {
	pub fn new(
		join_requests: Vec<crate::models::GroupJoinRequest>,
		watch: crate::models::WatchResponse,
	) -> GroupGetJoinRequestsResponse {
		GroupGetJoinRequestsResponse {
			join_requests,
			anchor: None,
			watch: Box::new(watch),
		}
	}
}
