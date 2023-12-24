/*
 * Rivet API
 *
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.0.1
 * 
 * Generated by: https://openapi-generator.tech
 */

/// IdentitySummary : An identity summary.



#[derive(Clone, Debug, PartialEq, Default, Serialize, Deserialize)]
pub struct IdentitySummary {
    #[serde(rename = "account_number")]
    pub account_number: i32,
    /// The URL of this identity's avatar image.
    #[serde(rename = "avatar_url")]
    pub avatar_url: String,
    #[serde(rename = "display_name")]
    pub display_name: String,
    #[serde(rename = "external")]
    pub external: Box<crate::models::IdentityExternalLinks>,
    /// Whether or not the requestee's identity is following this identity.
    #[serde(rename = "following")]
    pub following: bool,
    #[serde(rename = "identity_id")]
    pub identity_id: uuid::Uuid,
    /// Whether or not this identity is both following and is followed by the requestee's identity.
    #[serde(rename = "is_following_me")]
    pub is_following_me: bool,
    #[serde(rename = "is_mutual_following")]
    pub is_mutual_following: bool,
    /// Whether or not this identity is registered with a linked account.
    #[serde(rename = "is_registered")]
    pub is_registered: bool,
    #[serde(rename = "presence", skip_serializing_if = "Option::is_none")]
    pub presence: Option<Box<crate::models::IdentityPresence>>,
}

impl IdentitySummary {
    /// An identity summary.
    pub fn new(account_number: i32, avatar_url: String, display_name: String, external: crate::models::IdentityExternalLinks, following: bool, identity_id: uuid::Uuid, is_following_me: bool, is_mutual_following: bool, is_registered: bool) -> IdentitySummary {
        IdentitySummary {
            account_number,
            avatar_url,
            display_name,
            external: Box::new(external),
            following,
            identity_id,
            is_following_me,
            is_mutual_following,
            is_registered,
            presence: None,
        }
    }
}


