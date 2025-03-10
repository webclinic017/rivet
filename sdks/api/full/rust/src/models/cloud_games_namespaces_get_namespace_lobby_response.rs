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
pub struct CloudGamesNamespacesGetNamespaceLobbyResponse {
	#[serde(rename = "lobby")]
	pub lobby: Box<crate::models::CloudLogsLobbySummary>,
	#[serde(rename = "metrics", skip_serializing_if = "Option::is_none")]
	pub metrics: Option<Box<crate::models::CloudSvcMetrics>>,
	/// **Deprecated** A list of URLs.
	#[serde(rename = "stdout_presigned_urls")]
	pub stdout_presigned_urls: Vec<String>,
	/// **Deprecated** A list of URLs.
	#[serde(rename = "stderr_presigned_urls")]
	pub stderr_presigned_urls: Vec<String>,
	/// **Deprecated** A list of service performance summaries.
	#[serde(rename = "perf_lists")]
	pub perf_lists: Vec<crate::models::CloudSvcPerf>,
}

impl CloudGamesNamespacesGetNamespaceLobbyResponse {
	pub fn new(
		lobby: crate::models::CloudLogsLobbySummary,
		stdout_presigned_urls: Vec<String>,
		stderr_presigned_urls: Vec<String>,
		perf_lists: Vec<crate::models::CloudSvcPerf>,
	) -> CloudGamesNamespacesGetNamespaceLobbyResponse {
		CloudGamesNamespacesGetNamespaceLobbyResponse {
			lobby: Box::new(lobby),
			metrics: None,
			stdout_presigned_urls,
			stderr_presigned_urls,
			perf_lists,
		}
	}
}
