import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export const players_key_mich_type: att.MichelineType = att.prim_annot_to_mich_type("int", []);
export const matches_key_mich_type: att.MichelineType = att.prim_annot_to_mich_type("int", []);
export class matches_value implements att.ArchetypeType {
    constructor(public player1_id: att.Int, public player2_id: att.Int, public player1_claims_win: att.Option<boolean>, public player2_claims_win: att.Option<boolean>, public final_winner_id: att.Int) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.player1_id.to_mich(), this.player2_id.to_mich(), this.player1_claims_win.to_mich((x => { return att.bool_to_mich(x); })), this.player2_claims_win.to_mich((x => { return att.bool_to_mich(x); })), this.final_winner_id.to_mich()]);
    }
    equals(v: matches_value): boolean {
        return att.micheline_equals(this.to_mich(), v.to_mich());
    }
    static from_mich(input: att.Micheline): matches_value {
        return new matches_value(att.Int.from_mich((input as att.Mpair).args[0]), att.Int.from_mich((input as att.Mpair).args[1]), att.Option.from_mich((input as att.Mpair).args[2], x => { return att.mich_to_bool(x); }), att.Option.from_mich((input as att.Mpair).args[3], x => { return att.mich_to_bool(x); }), att.Int.from_mich((input as att.Mpair).args[4]));
    }
}
export const players_value_mich_type: att.MichelineType = att.prim_annot_to_mich_type("string", []);
export const matches_value_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("int", ["%player1_id"]),
    att.prim_annot_to_mich_type("int", ["%player2_id"]),
    att.option_annot_to_mich_type(att.prim_annot_to_mich_type("bool", []), ["%player1_claims_win"]),
    att.option_annot_to_mich_type(att.prim_annot_to_mich_type("bool", []), ["%player2_claims_win"]),
    att.prim_annot_to_mich_type("int", ["%final_winner_id"])
], []);
export type players_container = Array<[
    att.Int,
    string
]>;
export type matches_container = Array<[
    att.Int,
    matches_value
]>;
export const players_container_mich_type: att.MichelineType = att.pair_annot_to_mich_type("map", att.prim_annot_to_mich_type("int", []), att.prim_annot_to_mich_type("string", []), []);
export const matches_container_mich_type: att.MichelineType = att.pair_annot_to_mich_type("map", att.prim_annot_to_mich_type("int", []), att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("int", ["%player1_id"]),
    att.prim_annot_to_mich_type("int", ["%player2_id"]),
    att.option_annot_to_mich_type(att.prim_annot_to_mich_type("bool", []), ["%player1_claims_win"]),
    att.option_annot_to_mich_type(att.prim_annot_to_mich_type("bool", []), ["%player2_claims_win"]),
    att.prim_annot_to_mich_type("int", ["%final_winner_id"])
], []), []);
const exec_arg_to_mich = (): att.Micheline => {
    return att.unit_mich;
}
const signup_arg_to_mich = (s_discord_username: string): att.Micheline => {
    return att.string_to_mich(s_discord_username);
}
const createTournament_arg_to_mich = (): att.Micheline => {
    return att.unit_mich;
}
export class Tournament {
    address: string | undefined;
    constructor(address: string | undefined = undefined) {
        this.address = address;
    }
    get_address(): att.Address {
        if (undefined != this.address) {
            return new att.Address(this.address);
        }
        throw new Error("Contract not initialised");
    }
    async get_balance(): Promise<att.Tez> {
        if (null != this.address) {
            return await ex.get_balance(new att.Address(this.address));
        }
        throw new Error("Contract not initialised");
    }
    async deploy(params: Partial<ex.Parameters>) {
        const address = (await ex.deploy("./contracts/tournament.arl", {}, params)).address;
        this.address = address;
    }
    async exec(params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "exec", exec_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async signup(s_discord_username: string, params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "signup", signup_arg_to_mich(s_discord_username), params);
        }
        throw new Error("Contract not initialised");
    }
    async createTournament(params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "createTournament", createTournament_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_exec_param(params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "exec", exec_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_signup_param(s_discord_username: string, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "signup", signup_arg_to_mich(s_discord_username), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_createTournament_param(params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "createTournament", createTournament_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_s(): Promise<string> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_string((storage as att.Mpair).args[0]);
        }
        throw new Error("Contract not initialised");
    }
    async get_next_player_id(): Promise<att.Int> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.Int.from_mich((storage as att.Mpair).args[1]);
        }
        throw new Error("Contract not initialised");
    }
    async get_players(): Promise<players_container> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_map((storage as att.Mpair).args[2], (x, y) => [att.Int.from_mich(x), att.mich_to_string(y)]);
        }
        throw new Error("Contract not initialised");
    }
    async get_matches(): Promise<matches_container> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_map((storage as att.Mpair).args[3], (x, y) => [att.Int.from_mich(x), matches_value.from_mich(y)]);
        }
        throw new Error("Contract not initialised");
    }
    errors = {
        OPTION_IS_NONE: att.string_to_mich("\"OPTION_IS_NONE\""),
        r1_eight_players: att.pair_to_mich([att.string_to_mich("\"INVALID_CONDITION\""), att.string_to_mich("\"r1_eight_players\"")])
    };
}
export const tournament = new Tournament();
