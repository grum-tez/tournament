import {
  get_account,
  reset_experiment,
  set_mockup,
  set_mockup_now,
} from '@completium/experiment-ts'

import { Int } from '@completium/archetype-ts-types'

import { tournament } from './binding/tournament'

const assert = require('assert')

/* Accounts ---------------------------------------------------------------- */

const alice = get_account('alice')
const bob = get_account('owner_one')
const carol = get_account('owner_two')
const dave = get_account('owner_three')
const eve = get_account('owner_four')
const frank = get_account('owner_five')
const grace = get_account('owner_six')
const helen = get_account('minter_one')

/* Initialisation ---------------------------------------------------------- */

describe('Initialisation', async () => {
  it('Reset experiment', async () => {
    await reset_experiment({
      account: 'alice',
      endpoint: 'mockup',
      quiet: true,
    })
  })
  it('set_mockup', async () => {
    set_mockup()
    // await mockup_init()
  })
  it('set_mockup_now', async () => {
    set_mockup_now(new Date(Date.now()))
  })
})

/* Scenario ---------------------------------------------------------------- */

describe('[TOURNAMENT] Contract deployment', async () => {
  it('Deploy test_binding', async () => {
    await tournament.deploy({ as: alice })
  })
})

describe('[TOURNAMENT] Call join entry', async () => {
  it("Call 'myentry'", async () => {
    const next_player_id_before = await tournament.get_next_player_id()
    assert(next_player_id_before.to_number() === 1)
    await tournament.signup('alice', { as: alice })
    const next_player_id_after = await tournament.get_next_player_id()
    assert(next_player_id_after.to_number() === 2)
  })
})

describe('[TOURNAMENT] Signup many players', async () => {
  it('Sign up 7 players', async () => {
    await tournament.signup('bob', { as: bob })
    await tournament.signup('carol', { as: carol })
    await tournament.signup('dave', { as: dave })
    await tournament.signup('eve', { as: eve })
    await tournament.signup('frank', { as: frank })
    await tournament.signup('grace', { as: grace })
    await tournament.signup('helen', { as: helen })

    const players = await tournament.get_players()
    console.log(players)

    await tournament.createTournament({ as: alice })
    const matches_asset = await tournament.get_matches()
    console.log(matches_asset)
  })
})
