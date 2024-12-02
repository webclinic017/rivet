/*
 * Rivet API
 *
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.0.1
 *
 * Generated by: https://openapi-generator.tech
 */

/// MatchmakerRegionInfo : A region that the player can connect to.

#[derive(Clone, Debug, PartialEq, Default, Serialize, Deserialize)]
pub struct MatchmakerRegionInfo {
	/// A human readable short identifier used to references resources. Different than a `uuid` because this is intended to be human readable. Different than `DisplayName` because this should not include special characters and be short.
	#[serde(rename = "region_id")]
	pub region_id: String,
	/// Represent a resource's readable display name.
	#[serde(rename = "provider_display_name")]
	pub provider_display_name: String,
	/// Represent a resource's readable display name.
	#[serde(rename = "region_display_name")]
	pub region_display_name: String,
	#[serde(rename = "datacenter_coord")]
	pub datacenter_coord: Box<crate::models::GeoCoord>,
	#[serde(rename = "datacenter_distance_from_client")]
	pub datacenter_distance_from_client: Box<crate::models::GeoDistance>,
}

impl MatchmakerRegionInfo {
	/// A region that the player can connect to.
	pub fn new(
		region_id: String,
		provider_display_name: String,
		region_display_name: String,
		datacenter_coord: crate::models::GeoCoord,
		datacenter_distance_from_client: crate::models::GeoDistance,
	) -> MatchmakerRegionInfo {
		MatchmakerRegionInfo {
			region_id,
			provider_display_name,
			region_display_name,
			datacenter_coord: Box::new(datacenter_coord),
			datacenter_distance_from_client: Box::new(datacenter_distance_from_client),
		}
	}
}
