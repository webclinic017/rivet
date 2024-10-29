/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../../../../index";
import * as Rivet from "../../../../../../api/index";
import * as core from "../../../../../../core";
import { upload } from "../../../../index";
export declare const GameBannerUploadPrepareResponse: core.serialization.ObjectSchema<serializers.cloud.games.GameBannerUploadPrepareResponse.Raw, Rivet.cloud.games.GameBannerUploadPrepareResponse>;
export declare namespace GameBannerUploadPrepareResponse {
    interface Raw {
        upload_id: string;
        presigned_request: upload.PresignedRequest.Raw;
    }
}
