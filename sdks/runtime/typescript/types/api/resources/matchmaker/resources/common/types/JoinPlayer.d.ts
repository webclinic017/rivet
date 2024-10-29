/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as Rivet from "../../../../../index";
/**
 * A matchmaker lobby player.
 */
export interface JoinPlayer {
    /** Pass this token through the socket to the lobby server. The lobby server will validate this token with `PlayerConnected.player_token` */
    token: Rivet.Jwt;
}
