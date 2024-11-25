/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../index";
import * as RivetClient from "../../../../../api/index";
import * as core from "../../../../../core";
import { Jwt } from "../../../common/types/Jwt";

export const SetupRequest: core.serialization.Schema<
    serializers.identity.SetupRequest.Raw,
    RivetClient.identity.SetupRequest
> = core.serialization.object({
    existingIdentityToken: core.serialization.property("existing_identity_token", Jwt.optional()),
});

export declare namespace SetupRequest {
    interface Raw {
        existing_identity_token?: Jwt.Raw | null;
    }
}
