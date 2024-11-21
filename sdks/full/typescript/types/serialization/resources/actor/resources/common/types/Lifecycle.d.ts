/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../../../../index";
import * as Rivet from "../../../../../../api/index";
import * as core from "../../../../../../core";
export declare const Lifecycle: core.serialization.ObjectSchema<serializers.actor.Lifecycle.Raw, Rivet.actor.Lifecycle>;
export declare namespace Lifecycle {
    interface Raw {
        kill_timeout?: number | null;
        durable?: boolean | null;
    }
}
