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
pub struct ActorLifecycle {
	/// The duration to wait for in milliseconds before killing the actor. This should be set to a safe default, and can be overridden during a DELETE request if needed.
	#[serde(rename = "kill_timeout", skip_serializing_if = "Option::is_none")]
	pub kill_timeout: Option<i64>,
	/// If true, the actor will try to reschedule itself automatically in the event of a crash or a datacenter failover. The actor will not reschedule if it exits successfully.
	#[serde(rename = "durable", skip_serializing_if = "Option::is_none")]
	pub durable: Option<bool>,
}

impl ActorLifecycle {
	pub fn new() -> ActorLifecycle {
		ActorLifecycle {
			kill_timeout: None,
			durable: None,
		}
	}
}
