/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "../../../../../../environments";
import * as core from "../../../../../../core";
import * as RivetClient from "../../../../../index";
import urlJoin from "url-join";
import * as serializers from "../../../../../../serialization/index";
import * as errors from "../../../../../../errors/index";

export declare namespace Games {
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

export class Games {
    constructor(protected readonly _options: Games.Options = {}) {}

    /**
     * Returns a game profile.
     *
     * @param {string} gameNameId - A human readable short identifier used to references resources. Different than a `rivet.common#Uuid` because this is intended to be human readable. Different than `rivet.common#DisplayName` because this should not include special characters and be short.
     * @param {RivetClient.portal.GetGameProfileRequest} request
     * @param {Games.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link RivetClient.InternalError}
     * @throws {@link RivetClient.RateLimitError}
     * @throws {@link RivetClient.ForbiddenError}
     * @throws {@link RivetClient.UnauthorizedError}
     * @throws {@link RivetClient.NotFoundError}
     * @throws {@link RivetClient.BadRequestError}
     *
     * @example
     *     await client.portal.games.getGameProfile("string", {
     *         watchIndex: "string"
     *     })
     */
    public async getGameProfile(
        gameNameId: string,
        request: RivetClient.portal.GetGameProfileRequest = {},
        requestOptions?: Games.RequestOptions
    ): Promise<RivetClient.portal.GetGameProfileResponse> {
        const { watchIndex } = request;
        const _queryParams: Record<string, string | string[] | object | object[]> = {};
        if (watchIndex != null) {
            _queryParams["watch_index"] = watchIndex;
        }

        const _response = await (this._options.fetcher ?? core.fetcher)({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.RivetClientEnvironment.Production,
                `/portal/games/${encodeURIComponent(gameNameId)}/profile`
            ),
            method: "GET",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Fern-Language": "JavaScript",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
            },
            contentType: "application/json",
            queryParameters: _queryParams,
            requestType: "json",
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 180000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return serializers.portal.GetGameProfileResponse.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            switch (_response.error.statusCode) {
                case 500:
                    throw new RivetClient.InternalError(
                        serializers.ErrorBody.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: ["response"],
                        })
                    );
                case 429:
                    throw new RivetClient.RateLimitError(
                        serializers.ErrorBody.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: ["response"],
                        })
                    );
                case 403:
                    throw new RivetClient.ForbiddenError(
                        serializers.ErrorBody.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: ["response"],
                        })
                    );
                case 408:
                    throw new RivetClient.UnauthorizedError(
                        serializers.ErrorBody.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: ["response"],
                        })
                    );
                case 404:
                    throw new RivetClient.NotFoundError(
                        serializers.ErrorBody.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: ["response"],
                        })
                    );
                case 400:
                    throw new RivetClient.BadRequestError(
                        serializers.ErrorBody.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: ["response"],
                        })
                    );
                default:
                    throw new errors.RivetClientError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                    });
            }
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.RivetClientError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.RivetClientTimeoutError();
            case "unknown":
                throw new errors.RivetClientError({
                    message: _response.error.errorMessage,
                });
        }
    }

    protected async _getAuthorizationHeader(): Promise<string | undefined> {
        const bearer = await core.Supplier.get(this._options.token);
        if (bearer != null) {
            return `Bearer ${bearer}`;
        }

        return undefined;
    }
}
