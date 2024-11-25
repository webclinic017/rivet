/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as RivetClient from "../../../../../../../../../../index";

/**
 * @example
 *     {
 *         beforeCreateTs: "2024-01-15T09:30:00Z"
 *     }
 */
export interface ListNamespaceLobbiesRequest {
    /**
     * Returns lobbies created before this timestamp.
     */
    beforeCreateTs?: RivetClient.Timestamp;
}
