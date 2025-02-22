/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "../../../../../../environments";
import * as core from "../../../../../../core";
import { Tokens } from "../resources/tokens/client/Client";

export declare namespace Environments {
    interface Options {
        environment?: core.Supplier<environments.RivetEnvironment | string>;
        token?: core.Supplier<core.BearerToken | undefined>;
        /** Override the X-API-Version header */
        xApiVersion?: "5.1.2";
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
        xApiVersion?: "5.1.2";
    }
}

export class Environments {
    constructor(protected readonly _options: Environments.Options = {}) {}

    protected _tokens: Tokens | undefined;

    public get tokens(): Tokens {
        return (this._tokens ??= new Tokens(this._options));
    }
}
