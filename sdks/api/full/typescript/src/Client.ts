/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "./environments";
import * as core from "./core";
import { Actor } from "./api/resources/actor/client/Client";
import { Cloud } from "./api/resources/cloud/client/Client";
import { Group } from "./api/resources/group/client/Client";
import { Identity } from "./api/resources/identity/client/Client";
import { Provision } from "./api/resources/provision/client/Client";
import { Servers } from "./api/resources/servers/client/Client";
import { Auth } from "./api/resources/auth/client/Client";
import { Games } from "./api/resources/games/client/Client";
import { Job } from "./api/resources/job/client/Client";
import { Matchmaker } from "./api/resources/matchmaker/client/Client";
import { Portal } from "./api/resources/portal/client/Client";

export declare namespace RivetClient {
    interface Options {
        environment?: core.Supplier<environments.RivetEnvironment | string>;
        token?: core.Supplier<core.BearerToken | undefined>;
        /** Override the X-API-Version header */
        xApiVersion?: "25.1.1";
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
        xApiVersion?: "25.1.1";
    }
}

export class RivetClient {
    constructor(protected readonly _options: RivetClient.Options = {}) {}

    protected _actor: Actor | undefined;

    public get actor(): Actor {
        return (this._actor ??= new Actor(this._options));
    }

    protected _cloud: Cloud | undefined;

    public get cloud(): Cloud {
        return (this._cloud ??= new Cloud(this._options));
    }

    protected _group: Group | undefined;

    public get group(): Group {
        return (this._group ??= new Group(this._options));
    }

    protected _identity: Identity | undefined;

    public get identity(): Identity {
        return (this._identity ??= new Identity(this._options));
    }

    protected _provision: Provision | undefined;

    public get provision(): Provision {
        return (this._provision ??= new Provision(this._options));
    }

    protected _servers: Servers | undefined;

    public get servers(): Servers {
        return (this._servers ??= new Servers(this._options));
    }

    protected _auth: Auth | undefined;

    public get auth(): Auth {
        return (this._auth ??= new Auth(this._options));
    }

    protected _games: Games | undefined;

    public get games(): Games {
        return (this._games ??= new Games(this._options));
    }

    protected _job: Job | undefined;

    public get job(): Job {
        return (this._job ??= new Job(this._options));
    }

    protected _matchmaker: Matchmaker | undefined;

    public get matchmaker(): Matchmaker {
        return (this._matchmaker ??= new Matchmaker(this._options));
    }

    protected _portal: Portal | undefined;

    public get portal(): Portal {
        return (this._portal ??= new Portal(this._options));
    }
}
