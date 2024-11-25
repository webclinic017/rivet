/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../index";
import * as RivetClient from "../../../../../api/index";
import * as core from "../../../../../core";

export const PrepareAvatarUploadRequest: core.serialization.Schema<
    serializers.identity.PrepareAvatarUploadRequest.Raw,
    RivetClient.identity.PrepareAvatarUploadRequest
> = core.serialization.object({
    path: core.serialization.string(),
    mime: core.serialization.string(),
    contentLength: core.serialization.property("content_length", core.serialization.number()),
});

export declare namespace PrepareAvatarUploadRequest {
    interface Raw {
        path: string;
        mime: string;
        content_length: number;
    }
}
