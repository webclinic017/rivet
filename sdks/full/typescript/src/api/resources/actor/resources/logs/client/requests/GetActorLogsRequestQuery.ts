/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Rivet from "../../../../../../index";

/**
 * @example
 *     {
 *         gameId: "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32",
 *         environmentId: "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32",
 *         stream: Rivet.actor.LogStream.StdOut,
 *         watchIndex: "string"
 *     }
 */
export interface GetActorLogsRequestQuery {
    gameId?: string;
    environmentId?: string;
    stream: Rivet.actor.LogStream;
    /**
     * A query parameter denoting the requests watch index.
     */
    watchIndex?: string;
}
