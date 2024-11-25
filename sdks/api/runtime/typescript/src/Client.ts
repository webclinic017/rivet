/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "./environments";
import * as core from "./core";
import { Actor } from "./api/resources/actor/client/Client";

export declare namespace RivetClientClient {
    interface Options {
        environment?: core.Supplier<environments.RivetClientEnvironment | string>;
        token: core.Supplier<core.BearerToken>;
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

export class RivetClientClient {
    constructor(protected readonly _options: RivetClientClient.Options) {}

    protected _actor: Actor | undefined;

    public get actor(): Actor {
        return (this._actor ??= new Actor(this._options));
    }
}
