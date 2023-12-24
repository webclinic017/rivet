/*
 * Rivet API
 *
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.0.1
 * 
 * Generated by: https://openapi-generator.tech
 */

/// CloudLogsLobbyStatusStopped : The status of a stopped lobby.



#[derive(Clone, Debug, PartialEq, Default, Serialize, Deserialize)]
pub struct CloudLogsLobbyStatusStopped {
    /// The exit code returned by the lobby's main process when stopped.
    #[serde(rename = "exit_code")]
    pub exit_code: i32,
    /// Whether or not the lobby failed or stopped successfully.
    #[serde(rename = "failed")]
    pub failed: bool,
    #[serde(rename = "stop_ts")]
    pub stop_ts: String,
}

impl CloudLogsLobbyStatusStopped {
    /// The status of a stopped lobby.
    pub fn new(exit_code: i32, failed: bool, stop_ts: String) -> CloudLogsLobbyStatusStopped {
        CloudLogsLobbyStatusStopped {
            exit_code,
            failed,
            stop_ts,
        }
    }
}


