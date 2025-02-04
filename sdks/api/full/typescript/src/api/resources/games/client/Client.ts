/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "../../../../environments";
import * as core from "../../../../core";
import { Environments } from "../resources/environments/client/Client";

export declare namespace Games {
    interface Options {
        environment?: core.Supplier<environments.RivetEnvironment | string>;
        token?: core.Supplier<core.BearerToken | undefined>;
        /** Override the X-API-Version header */
        xApiVersion?: "25.1.0";
        fetcher?: core.FetchFunction;
    }

    interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
        /** Additional headers to include in the request. */
        headers?: Record<string, string>;
        /** Override the X-API-Version header */
        xApiVersion?: "25.1.0";
    }
}

export class Games {
    constructor(protected readonly _options: Games.Options = {}) {}

    protected _environments: Environments | undefined;

    public get environments(): Environments {
        return (this._environments ??= new Environments(this._options));
    }
}
