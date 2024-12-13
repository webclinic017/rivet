/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../../../../..";
import * as Rivet from "../../../../../../../api";
import * as core from "../../../../../../../core";
export declare const JoinLobbyRequest: core.serialization.Schema<serializers.matchmaker.JoinLobbyRequest.Raw, Rivet.matchmaker.JoinLobbyRequest>;
export declare namespace JoinLobbyRequest {
    interface Raw {
        lobby_id: string;
        captcha?: serializers.captcha.Config.Raw | null;
        verification_data?: unknown | null;
    }
}
