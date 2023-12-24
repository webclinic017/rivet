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
pub struct KvPutRequest {
    /// A string representing a key in the key-value database. Maximum length of 512 characters. *Recommended Key Path Format* Key path components are split by a slash (e.g. `a/b/c` has the path components `[\"a\", \"b\", \"c\"]`). Slashes can be escaped by using a backslash (e.g. `a/b/c/d` has the path components `[\"a\", \"b/c\", \"d\"]`). This format is not enforced by Rivet, but the tools built around Rivet KV work better if this format is used.
    #[serde(rename = "key")]
    pub key: String,
    #[serde(rename = "namespace_id", skip_serializing_if = "Option::is_none")]
    pub namespace_id: Option<uuid::Uuid>,
    /// A JSON object stored in the KV database. A `null` value indicates the entry is deleted. Maximum length of 262,144 bytes when encoded.
    #[serde(rename = "value", deserialize_with = "Option::deserialize")]
    pub value: Option<serde_json::Value>,
}

impl KvPutRequest {
    pub fn new(key: String, value: Option<serde_json::Value>) -> KvPutRequest {
        KvPutRequest {
            key,
            namespace_id: None,
            value,
        }
    }
}


