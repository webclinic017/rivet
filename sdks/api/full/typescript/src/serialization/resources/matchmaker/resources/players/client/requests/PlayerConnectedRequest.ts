/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../../index";
import * as RivetClient from "../../../../../../../api/index";
import * as core from "../../../../../../../core";

export const PlayerConnectedRequest: core.serialization.Schema<
    serializers.matchmaker.PlayerConnectedRequest.Raw,
    RivetClient.matchmaker.PlayerConnectedRequest
> = core.serialization.object({
    playerToken: core.serialization.property("player_token", core.serialization.string()),
});

export declare namespace PlayerConnectedRequest {
    interface Raw {
        player_token: string;
    }
}
