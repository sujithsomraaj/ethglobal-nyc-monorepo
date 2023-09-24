import {
    TransferCompleted
  } from "../generated/ERC20/ERC20"
  import { TransferData } from "../generated/schema"

export function handleTransfer(event: TransferCompleted): void {
    let entity = new TransferData(event.transaction.hash.concatI32(event.logIndex.toI32()));

    entity.from = event.params.from.toHexString();
    entity.to = event.params.to.toHexString();
    entity.amount = event.params.amount;

    entity.save();
}