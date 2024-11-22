/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as Rivet from "../../../../../../api/index";
import * as core from "../../../../../../core";
import { GuardRouting } from "./GuardRouting";
import { HostRouting } from "./HostRouting";

export const PortRouting: core.serialization.ObjectSchema<serializers.actor.PortRouting.Raw, Rivet.actor.PortRouting> =
    core.serialization.object({
        guard: GuardRouting.optional(),
        host: HostRouting.optional(),
    });

export declare namespace PortRouting {
    interface Raw {
        guard?: GuardRouting.Raw | null;
        host?: HostRouting.Raw | null;
    }
}
