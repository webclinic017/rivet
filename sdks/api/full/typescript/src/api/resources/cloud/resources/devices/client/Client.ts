/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "../../../../../../environments";
import * as core from "../../../../../../core";
import { Links } from "../resources/links/client/Client";

export declare namespace Devices {
    interface Options {
        environment?: core.Supplier<environments.RivetClientEnvironment | string>;
        token?: core.Supplier<core.BearerToken | undefined>;
        fetcher?: core.FetchFunction;
    }

    interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
    }
}

export class Devices {
    constructor(protected readonly _options: Devices.Options = {}) {}

    protected _links: Links | undefined;

    public get links(): Links {
        return (this._links ??= new Links(this._options));
    }
}
