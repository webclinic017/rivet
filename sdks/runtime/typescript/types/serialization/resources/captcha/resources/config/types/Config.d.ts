/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../../../../index";
import * as Rivet from "../../../../../../api/index";
import * as core from "../../../../../../core";
import { captcha } from "../../../../index";
export declare const Config: core.serialization.ObjectSchema<serializers.captcha.Config.Raw, Rivet.captcha.Config>;
export declare namespace Config {
    interface Raw {
        hcaptcha?: captcha.ConfigHcaptcha.Raw | null;
        turnstile?: captcha.ConfigTurnstile.Raw | null;
    }
}
