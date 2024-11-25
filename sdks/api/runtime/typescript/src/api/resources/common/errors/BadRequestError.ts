/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as errors from "../../../../errors/index";
import * as RivetClient from "../../../index";

export class BadRequestError extends errors.RivetClientError {
    constructor(body: RivetClient.ErrorBody) {
        super({
            message: "BadRequestError",
            statusCode: 400,
            body: body,
        });
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}
