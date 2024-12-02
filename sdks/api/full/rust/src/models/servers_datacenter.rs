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
pub struct ServersDatacenter {
	#[serde(rename = "id")]
	pub id: uuid::Uuid,
	#[serde(rename = "slug")]
	pub slug: String,
	#[serde(rename = "name")]
	pub name: String,
}

impl ServersDatacenter {
	pub fn new(id: uuid::Uuid, slug: String, name: String) -> ServersDatacenter {
		ServersDatacenter { id, slug, name }
	}
}
