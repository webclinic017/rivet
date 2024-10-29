/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../../../../index";
import * as Rivet from "../../../../../../api/index";
import * as core from "../../../../../../core";
export declare const GameBannerUploadPrepareRequest: core.serialization.ObjectSchema<serializers.cloud.games.GameBannerUploadPrepareRequest.Raw, Rivet.cloud.games.GameBannerUploadPrepareRequest>;
export declare namespace GameBannerUploadPrepareRequest {
    interface Raw {
        path: string;
        mime?: string | null;
        content_length: number;
    }
}
