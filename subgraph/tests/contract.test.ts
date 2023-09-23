import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Bytes, BigInt } from "@graphprotocol/graph-ts"
import { InitData } from "../generated/schema"
import { InitData as InitDataEvent } from "../generated/Contract/Contract"
import { handleInitData } from "../src/contract"
import { createInitDataEvent } from "./contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let slotId = Bytes.fromI32(1234567890)
    let data = Bytes.fromI32(1234567890)
    let currState_ = BigInt.fromI32(234)
    let newInitDataEvent = createInitDataEvent(slotId, data, currState_)
    handleInitData(newInitDataEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("InitData created and stored", () => {
    assert.entityCount("InitData", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "InitData",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "slotId",
      "1234567890"
    )
    assert.fieldEquals(
      "InitData",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "data",
      "1234567890"
    )
    assert.fieldEquals(
      "InitData",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "currState_",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
