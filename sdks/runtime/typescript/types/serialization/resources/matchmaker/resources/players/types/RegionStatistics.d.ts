/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../../../..";
import * as Rivet from "../../../../../../api";
import * as core from "../../../../../../core";
export declare const RegionStatistics: core.serialization.ObjectSchema<serializers.matchmaker.RegionStatistics.Raw, Rivet.matchmaker.RegionStatistics>;
export declare namespace RegionStatistics {
    interface Raw {
        player_count: number;
    }
}
