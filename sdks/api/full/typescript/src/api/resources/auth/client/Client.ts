/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "../../../../environments";
import * as core from "../../../../core";
import { Identity } from "../resources/identity/client/Client";
import { Tokens } from "../resources/tokens/client/Client";

export declare namespace Auth {
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

export class Auth {
    constructor(protected readonly _options: Auth.Options = {}) {}

    protected _identity: Identity | undefined;

    public get identity(): Identity {
        return (this._identity ??= new Identity(this._options));
    }

    protected _tokens: Tokens | undefined;

    public get tokens(): Tokens {
        return (this._tokens ??= new Tokens(this._options));
    }
}
