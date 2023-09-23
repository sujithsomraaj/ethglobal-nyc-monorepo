import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, BigInt } from "@graphprotocol/graph-ts"
import { InitData, UpdateData } from "../generated/Contract/Contract"

export function createInitDataEvent(
  slotId: Bytes,
  data: Bytes,
  currState_: BigInt
): InitData {
  let initDataEvent = changetype<InitData>(newMockEvent())

  initDataEvent.parameters = new Array()

  initDataEvent.parameters.push(
    new ethereum.EventParam("slotId", ethereum.Value.fromFixedBytes(slotId))
  )
  initDataEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytes(data))
  )
  initDataEvent.parameters.push(
    new ethereum.EventParam(
      "currState_",
      ethereum.Value.fromUnsignedBigInt(currState_)
    )
  )

  return initDataEvent
}

export function createUpdateDataEvent(
  slotId: Bytes,
  data: Bytes,
  currState_: BigInt
): UpdateData {
  let updateDataEvent = changetype<UpdateData>(newMockEvent())

  updateDataEvent.parameters = new Array()

  updateDataEvent.parameters.push(
    new ethereum.EventParam("slotId", ethereum.Value.fromFixedBytes(slotId))
  )
  updateDataEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytes(data))
  )
  updateDataEvent.parameters.push(
    new ethereum.EventParam(
      "currState_",
      ethereum.Value.fromUnsignedBigInt(currState_)
    )
  )

  return updateDataEvent
}
