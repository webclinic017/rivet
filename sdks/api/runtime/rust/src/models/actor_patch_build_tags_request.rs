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
pub struct ActorPatchBuildTagsRequest {
    #[serde(rename = "tags", deserialize_with = "Option::deserialize")]
    pub tags: Option<serde_json::Value>,
    /// **Deprecated** Removes the given tag keys from all other builds.
    #[serde(rename = "exclusive_tags", skip_serializing_if = "Option::is_none")]
    pub exclusive_tags: Option<Vec<String>>,
}

impl ActorPatchBuildTagsRequest {
    pub fn new(tags: Option<serde_json::Value>) -> ActorPatchBuildTagsRequest {
        ActorPatchBuildTagsRequest {
            tags,
            exclusive_tags: None,
        }
    }
}


