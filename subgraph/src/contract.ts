import {
  ExecuteCall,
  HandleCall,
  InitData as InitDataEvent,
  UpdateData as UpdateDataEvent
} from "../generated/Contract/Contract"
import { InitData, UpdateData } from "../generated/schema"

export function handleInitData(event: InitDataEvent): void {
  let entity = new InitData(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.slotId = event.params.slotId
  entity.data = event.params.data
  entity.currState_ = event.params.currState_

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUpdateData(event: UpdateDataEvent): void {
  let entity = new UpdateData(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.slotId = event.params.slotId
  entity.data = event.params.data
  entity.currState_ = event.params.currState_

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleHyperlane(call: HandleCall): void {

}

export function handleAxelar(call: ExecuteCall): void {
  
}