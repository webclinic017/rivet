/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../../..";
import * as Rivet from "../../../../../../../../api";
import * as core from "../../../../../../../../core";

export const PoolType: core.serialization.Schema<
    serializers.admin.clusters.PoolType.Raw,
    Rivet.admin.clusters.PoolType
> = core.serialization.enum_(["job", "gg", "ats"]);

export declare namespace PoolType {
    type Raw = "job" | "gg" | "ats";
}
