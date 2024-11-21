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
pub struct ActorUpgradeActorRequest {
	#[serde(rename = "build", skip_serializing_if = "Option::is_none")]
	pub build: Option<uuid::Uuid>,
	#[serde(
		rename = "buildTags",
		default,
		with = "::serde_with::rust::double_option",
		skip_serializing_if = "Option::is_none"
	)]
	pub build_tags: Option<Option<serde_json::Value>>,
}

impl ActorUpgradeActorRequest {
	pub fn new() -> ActorUpgradeActorRequest {
		ActorUpgradeActorRequest {
			build: None,
			build_tags: None,
		}
	}
}
