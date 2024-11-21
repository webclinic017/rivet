/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Rivet from "../../../../index";

/**
 * @example
 *     {
 *         project: "string",
 *         environment: "string",
 *         body: {
 *             region: "string",
 *             tags: {
 *                 "key": "value"
 *             },
 *             build: "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32",
 *             buildTags: {
 *                 "key": "value"
 *             },
 *             runtime: {
 *                 arguments: ["string"],
 *                 environment: {
 *                     "string": "string"
 *                 }
 *             },
 *             network: {
 *                 mode: "bridge",
 *                 ports: {}
 *             },
 *             resources: {
 *                 cpu: 1,
 *                 memory: 1
 *             },
 *             lifecycle: {
 *                 killTimeout: 1000000,
 *                 durable: true
 *             }
 *         }
 *     }
 */
export interface CreateActorRequestQuery {
    project?: string;
    environment?: string;
    body: Rivet.actor.CreateActorRequest;
}
