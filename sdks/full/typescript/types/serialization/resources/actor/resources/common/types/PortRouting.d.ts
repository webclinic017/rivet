/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../../../../index";
import * as Rivet from "../../../../../../api/index";
import * as core from "../../../../../../core";
import { actor } from "../../../../index";
export declare const PortRouting: core.serialization.ObjectSchema<serializers.actor.PortRouting.Raw, Rivet.actor.PortRouting>;
export declare namespace PortRouting {
    interface Raw {
        game_guard?: actor.GameGuardRouting.Raw | null;
        host?: actor.HostRouting.Raw | null;
    }
}
