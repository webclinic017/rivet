/*
 * Rivet API
 *
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.0.1
 *
 * Generated by: https://openapi-generator.tech
 */

use reqwest;

use super::{configuration, Error};
use crate::apis::ResponseContent;

/// struct for typed errors of method [`cloud_games_versions_create_game_version`]
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(untagged)]
pub enum CloudGamesVersionsCreateGameVersionError {
	Status400(crate::models::ErrorBody),
	Status403(crate::models::ErrorBody),
	Status404(crate::models::ErrorBody),
	Status408(crate::models::ErrorBody),
	Status429(crate::models::ErrorBody),
	Status500(crate::models::ErrorBody),
	UnknownValue(serde_json::Value),
}

/// struct for typed errors of method [`cloud_games_versions_get_game_version_by_id`]
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(untagged)]
pub enum CloudGamesVersionsGetGameVersionByIdError {
	Status400(crate::models::ErrorBody),
	Status403(crate::models::ErrorBody),
	Status404(crate::models::ErrorBody),
	Status408(crate::models::ErrorBody),
	Status429(crate::models::ErrorBody),
	Status500(crate::models::ErrorBody),
	UnknownValue(serde_json::Value),
}

/// struct for typed errors of method [`cloud_games_versions_reserve_version_name`]
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(untagged)]
pub enum CloudGamesVersionsReserveVersionNameError {
	Status400(crate::models::ErrorBody),
	Status403(crate::models::ErrorBody),
	Status404(crate::models::ErrorBody),
	Status408(crate::models::ErrorBody),
	Status429(crate::models::ErrorBody),
	Status500(crate::models::ErrorBody),
	UnknownValue(serde_json::Value),
}

/// struct for typed errors of method [`cloud_games_versions_validate_game_version`]
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(untagged)]
pub enum CloudGamesVersionsValidateGameVersionError {
	Status400(crate::models::ErrorBody),
	Status403(crate::models::ErrorBody),
	Status404(crate::models::ErrorBody),
	Status408(crate::models::ErrorBody),
	Status429(crate::models::ErrorBody),
	Status500(crate::models::ErrorBody),
	UnknownValue(serde_json::Value),
}

/// Creates a new game version.
pub async fn cloud_games_versions_create_game_version(
	configuration: &configuration::Configuration,
	game_id: &str,
	cloud_games_create_game_version_request: crate::models::CloudGamesCreateGameVersionRequest,
) -> Result<
	crate::models::CloudGamesCreateGameVersionResponse,
	Error<CloudGamesVersionsCreateGameVersionError>,
> {
	let local_var_configuration = configuration;

	let local_var_client = &local_var_configuration.client;

	let local_var_uri_str = format!(
		"{}/cloud/games/{game_id}/versions",
		local_var_configuration.base_path,
		game_id = crate::apis::urlencode(game_id)
	);
	let mut local_var_req_builder =
		local_var_client.request(reqwest::Method::POST, local_var_uri_str.as_str());

	if let Some(ref local_var_user_agent) = local_var_configuration.user_agent {
		local_var_req_builder =
			local_var_req_builder.header(reqwest::header::USER_AGENT, local_var_user_agent.clone());
	}
	if let Some(ref local_var_token) = local_var_configuration.bearer_access_token {
		local_var_req_builder = local_var_req_builder.bearer_auth(local_var_token.to_owned());
	};
	local_var_req_builder = local_var_req_builder.json(&cloud_games_create_game_version_request);

	let local_var_req = local_var_req_builder.build()?;
	let local_var_resp = local_var_client.execute(local_var_req).await?;

	let local_var_status = local_var_resp.status();
	let local_var_content = local_var_resp.text().await?;

	if !local_var_status.is_client_error() && !local_var_status.is_server_error() {
		serde_json::from_str(&local_var_content).map_err(Error::from)
	} else {
		let local_var_entity: Option<CloudGamesVersionsCreateGameVersionError> =
			serde_json::from_str(&local_var_content).ok();
		let local_var_error = ResponseContent {
			status: local_var_status,
			content: local_var_content,
			entity: local_var_entity,
		};
		Err(Error::ResponseError(local_var_error))
	}
}

/// Returns a game version by its version ID.
pub async fn cloud_games_versions_get_game_version_by_id(
	configuration: &configuration::Configuration,
	game_id: &str,
	version_id: &str,
) -> Result<
	crate::models::CloudGamesGetGameVersionByIdResponse,
	Error<CloudGamesVersionsGetGameVersionByIdError>,
> {
	let local_var_configuration = configuration;

	let local_var_client = &local_var_configuration.client;

	let local_var_uri_str = format!(
		"{}/cloud/games/{game_id}/versions/{version_id}",
		local_var_configuration.base_path,
		game_id = crate::apis::urlencode(game_id),
		version_id = crate::apis::urlencode(version_id)
	);
	let mut local_var_req_builder =
		local_var_client.request(reqwest::Method::GET, local_var_uri_str.as_str());

	if let Some(ref local_var_user_agent) = local_var_configuration.user_agent {
		local_var_req_builder =
			local_var_req_builder.header(reqwest::header::USER_AGENT, local_var_user_agent.clone());
	}
	if let Some(ref local_var_token) = local_var_configuration.bearer_access_token {
		local_var_req_builder = local_var_req_builder.bearer_auth(local_var_token.to_owned());
	};

	let local_var_req = local_var_req_builder.build()?;
	let local_var_resp = local_var_client.execute(local_var_req).await?;

	let local_var_status = local_var_resp.status();
	let local_var_content = local_var_resp.text().await?;

	if !local_var_status.is_client_error() && !local_var_status.is_server_error() {
		serde_json::from_str(&local_var_content).map_err(Error::from)
	} else {
		let local_var_entity: Option<CloudGamesVersionsGetGameVersionByIdError> =
			serde_json::from_str(&local_var_content).ok();
		let local_var_error = ResponseContent {
			status: local_var_status,
			content: local_var_content,
			entity: local_var_entity,
		};
		Err(Error::ResponseError(local_var_error))
	}
}

/// Reserves a display name for the next version. Used to generate a monotomically increasing build number without causing a race condition with multiple versions getting created at the same time.
pub async fn cloud_games_versions_reserve_version_name(
	configuration: &configuration::Configuration,
	game_id: &str,
) -> Result<
	crate::models::CloudGamesReserveVersionNameResponse,
	Error<CloudGamesVersionsReserveVersionNameError>,
> {
	let local_var_configuration = configuration;

	let local_var_client = &local_var_configuration.client;

	let local_var_uri_str = format!(
		"{}/cloud/games/{game_id}/versions/reserve-name",
		local_var_configuration.base_path,
		game_id = crate::apis::urlencode(game_id)
	);
	let mut local_var_req_builder =
		local_var_client.request(reqwest::Method::POST, local_var_uri_str.as_str());

	if let Some(ref local_var_user_agent) = local_var_configuration.user_agent {
		local_var_req_builder =
			local_var_req_builder.header(reqwest::header::USER_AGENT, local_var_user_agent.clone());
	}
	if let Some(ref local_var_token) = local_var_configuration.bearer_access_token {
		local_var_req_builder = local_var_req_builder.bearer_auth(local_var_token.to_owned());
	};

	let local_var_req = local_var_req_builder.build()?;
	let local_var_resp = local_var_client.execute(local_var_req).await?;

	let local_var_status = local_var_resp.status();
	let local_var_content = local_var_resp.text().await?;

	if !local_var_status.is_client_error() && !local_var_status.is_server_error() {
		serde_json::from_str(&local_var_content).map_err(Error::from)
	} else {
		let local_var_entity: Option<CloudGamesVersionsReserveVersionNameError> =
			serde_json::from_str(&local_var_content).ok();
		let local_var_error = ResponseContent {
			status: local_var_status,
			content: local_var_content,
			entity: local_var_entity,
		};
		Err(Error::ResponseError(local_var_error))
	}
}

/// Validates information used to create a new game version.
pub async fn cloud_games_versions_validate_game_version(
	configuration: &configuration::Configuration,
	game_id: &str,
	cloud_games_validate_game_version_request: crate::models::CloudGamesValidateGameVersionRequest,
) -> Result<
	crate::models::CloudGamesValidateGameVersionResponse,
	Error<CloudGamesVersionsValidateGameVersionError>,
> {
	let local_var_configuration = configuration;

	let local_var_client = &local_var_configuration.client;

	let local_var_uri_str = format!(
		"{}/cloud/games/{game_id}/versions/validate",
		local_var_configuration.base_path,
		game_id = crate::apis::urlencode(game_id)
	);
	let mut local_var_req_builder =
		local_var_client.request(reqwest::Method::POST, local_var_uri_str.as_str());

	if let Some(ref local_var_user_agent) = local_var_configuration.user_agent {
		local_var_req_builder =
			local_var_req_builder.header(reqwest::header::USER_AGENT, local_var_user_agent.clone());
	}
	if let Some(ref local_var_token) = local_var_configuration.bearer_access_token {
		local_var_req_builder = local_var_req_builder.bearer_auth(local_var_token.to_owned());
	};
	local_var_req_builder = local_var_req_builder.json(&cloud_games_validate_game_version_request);

	let local_var_req = local_var_req_builder.build()?;
	let local_var_resp = local_var_client.execute(local_var_req).await?;

	let local_var_status = local_var_resp.status();
	let local_var_content = local_var_resp.text().await?;

	if !local_var_status.is_client_error() && !local_var_status.is_server_error() {
		serde_json::from_str(&local_var_content).map_err(Error::from)
	} else {
		let local_var_entity: Option<CloudGamesVersionsValidateGameVersionError> =
			serde_json::from_str(&local_var_content).ok();
		let local_var_error = ResponseContent {
			status: local_var_status,
			content: local_var_content,
			entity: local_var_entity,
		};
		Err(Error::ResponseError(local_var_error))
	}
}
