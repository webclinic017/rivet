/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../../../../index";
import * as Rivet from "../../../../../../api/index";
import * as core from "../../../../../../core";
import { actor } from "../../../../index";
export declare const Network: core.serialization.ObjectSchema<serializers.actor.Network.Raw, Rivet.actor.Network>;
export declare namespace Network {
    interface Raw {
        mode?: actor.NetworkMode.Raw | null;
        ports: Record<string, actor.Port.Raw>;
    }
}
