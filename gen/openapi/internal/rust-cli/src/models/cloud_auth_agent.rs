/*
 * Rivet API
 *
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.0.1
 * 
 * Generated by: https://openapi-generator.tech
 */

/// CloudAuthAgent : The current authenticated agent.



#[derive(Clone, Debug, PartialEq, Default, Serialize, Deserialize)]
pub struct CloudAuthAgent {
    #[serde(rename = "game_cloud", skip_serializing_if = "Option::is_none")]
    pub game_cloud: Option<Box<crate::models::CloudAuthAgentGameCloud>>,
    #[serde(rename = "identity", skip_serializing_if = "Option::is_none")]
    pub identity: Option<Box<crate::models::CloudAuthAgentIdentity>>,
}

impl CloudAuthAgent {
    /// The current authenticated agent.
    pub fn new() -> CloudAuthAgent {
        CloudAuthAgent {
            game_cloud: None,
            identity: None,
        }
    }
}


