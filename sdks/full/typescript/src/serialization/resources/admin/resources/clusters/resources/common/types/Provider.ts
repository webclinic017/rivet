/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../../..";
import * as Rivet from "../../../../../../../../api";
import * as core from "../../../../../../../../core";

export const Provider: core.serialization.Schema<
    serializers.admin.clusters.Provider.Raw,
    Rivet.admin.clusters.Provider
> = core.serialization.enum_(["linode"]);

export declare namespace Provider {
    type Raw = "linode";
}
