/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../../../..";
import * as Rivet from "../../../../../../api";
import * as core from "../../../../../../core";
export declare const ValidateGameResponse: core.serialization.ObjectSchema<serializers.cloud.games.ValidateGameResponse.Raw, Rivet.cloud.games.ValidateGameResponse>;
export declare namespace ValidateGameResponse {
    interface Raw {
        errors: serializers.ValidationError.Raw[];
    }
}
