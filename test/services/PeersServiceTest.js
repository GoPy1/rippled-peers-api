import 'sails-test-helper'
import assert from 'assert'

describe('PeersService', () => {

  it('.listPeers should be a function', () => {
    assert.strictEqual(typeof PeersService.listPeers, 'function')
  })
})

