/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "../../../../environments";
import * as core from "../../../../core";
import { Datacenters } from "../resources/datacenters/client/Client";
import { Servers } from "../resources/servers/client/Client";
import { Tunnel } from "../resources/tunnel/client/Client";

export declare namespace Provision {
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

export class Provision {
    constructor(protected readonly _options: Provision.Options = {}) {}

    protected _datacenters: Datacenters | undefined;

    public get datacenters(): Datacenters {
        return (this._datacenters ??= new Datacenters(this._options));
    }

    protected _servers: Servers | undefined;

    public get servers(): Servers {
        return (this._servers ??= new Servers(this._options));
    }

    protected _tunnel: Tunnel | undefined;

    public get tunnel(): Tunnel {
        return (this._tunnel ??= new Tunnel(this._options));
    }
}
