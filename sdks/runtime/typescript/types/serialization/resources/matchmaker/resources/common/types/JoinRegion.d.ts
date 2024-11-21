/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../../../../index";
import * as Rivet from "../../../../../../api/index";
import * as core from "../../../../../../core";
import { Identifier } from "../../../../common/types/Identifier";
import { DisplayName } from "../../../../common/types/DisplayName";
export declare const JoinRegion: core.serialization.ObjectSchema<serializers.matchmaker.JoinRegion.Raw, Rivet.matchmaker.JoinRegion>;
export declare namespace JoinRegion {
    interface Raw {
        region_id: Identifier.Raw;
        display_name: DisplayName.Raw;
    }
}
