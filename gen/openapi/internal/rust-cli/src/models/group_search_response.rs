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
pub struct GroupSearchResponse {
    #[serde(rename = "anchor", skip_serializing_if = "Option::is_none")]
    pub anchor: Option<String>,
    /// A list of group handles.
    #[serde(rename = "groups")]
    pub groups: Vec<crate::models::GroupHandle>,
}

impl GroupSearchResponse {
    pub fn new(groups: Vec<crate::models::GroupHandle>) -> GroupSearchResponse {
        GroupSearchResponse {
            anchor: None,
            groups,
        }
    }
}


