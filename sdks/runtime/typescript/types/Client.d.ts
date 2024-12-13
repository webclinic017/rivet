/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as environments from "./environments";
import * as core from "./core";
import { Kv } from "./api/resources/kv/client/Client";
import { Matchmaker } from "./api/resources/matchmaker/client/Client";
export declare namespace RivetClient {
    interface Options {
        environment?: core.Supplier<environments.RivetEnvironment | string>;
        token: core.Supplier<core.BearerToken>;
        fetcher?: core.FetchFunction;
    }
    interface RequestOptions {
        timeoutInSeconds?: number;
        maxRetries?: number;
    }
}
export declare class RivetClient {
    protected readonly _options: RivetClient.Options;
    constructor(_options: RivetClient.Options);
    protected _kv: Kv | undefined;
    get kv(): Kv;
    protected _matchmaker: Matchmaker | undefined;
    get matchmaker(): Matchmaker;
}
