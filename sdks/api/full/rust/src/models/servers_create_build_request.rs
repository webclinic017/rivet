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
pub struct ServersCreateBuildRequest {
	#[serde(rename = "name")]
	pub name: String,
	/// A tag given to the game build.
	#[serde(rename = "image_tag")]
	pub image_tag: String,
	#[serde(rename = "image_file")]
	pub image_file: Box<crate::models::UploadPrepareFile>,
	#[serde(rename = "multipart_upload", skip_serializing_if = "Option::is_none")]
	pub multipart_upload: Option<bool>,
	#[serde(rename = "kind", skip_serializing_if = "Option::is_none")]
	pub kind: Option<crate::models::ServersBuildKind>,
	#[serde(rename = "compression", skip_serializing_if = "Option::is_none")]
	pub compression: Option<crate::models::ServersBuildCompression>,
	#[serde(
		rename = "prewarm_datacenters",
		skip_serializing_if = "Option::is_none"
	)]
	pub prewarm_datacenters: Option<Vec<uuid::Uuid>>,
}

impl ServersCreateBuildRequest {
	pub fn new(
		name: String,
		image_tag: String,
		image_file: crate::models::UploadPrepareFile,
	) -> ServersCreateBuildRequest {
		ServersCreateBuildRequest {
			name,
			image_tag,
			image_file: Box::new(image_file),
			multipart_upload: None,
			kind: None,
			compression: None,
			prewarm_datacenters: None,
		}
	}
}
