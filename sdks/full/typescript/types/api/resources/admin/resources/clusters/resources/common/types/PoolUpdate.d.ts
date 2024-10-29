/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as Rivet from "../../../../../../../index";
export interface PoolUpdate {
    poolType: Rivet.admin.clusters.PoolType;
    hardware: Rivet.admin.clusters.Hardware[];
    desiredCount?: number;
    minCount?: number;
    maxCount?: number;
    drainTimeout?: number;
}
