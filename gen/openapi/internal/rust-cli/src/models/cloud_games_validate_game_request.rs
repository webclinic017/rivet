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
pub struct CloudGamesValidateGameRequest {
    /// Represent a resource's readable display name.
    #[serde(rename = "display_name")]
    pub display_name: String,
    /// A human readable short identifier used to references resources. Different than a `rivet.common#Uuid` because this is intended to be human readable. Different than `rivet.common#DisplayName` because this should not include special characters and be short.
    #[serde(rename = "name_id")]
    pub name_id: String,
}

impl CloudGamesValidateGameRequest {
    pub fn new(display_name: String, name_id: String) -> CloudGamesValidateGameRequest {
        CloudGamesValidateGameRequest {
            display_name,
            name_id,
        }
    }
}


