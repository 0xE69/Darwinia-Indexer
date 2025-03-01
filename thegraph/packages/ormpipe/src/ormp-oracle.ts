import {
  Assigned as AssignedEvent,
  ImportedMessageRoot as ImportedMessageRootEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  SetApproved as SetApprovedEvent,
  SetFee as SetFeeEvent,
  Withdrawal as WithdrawalEvent
} from "../generated/OrmpOracle/OrmpOracle"
import {
  OrmpOracleAssigned,
  OrmpOracleImportedMessageRoot,
  OrmpOracleOwnershipTransferred,
  OrmpOracleSetApproved,
  OrmpOracleSetFee,
  OrmpOracleWithdrawal, OrmpProtocolMessageAccepted
} from "../generated/schema"

export function handleAssigned(event: AssignedEvent): void {
  let entity = new OrmpOracleAssigned(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.msgHash = event.params.msgHash
  entity.fee = event.params.fee

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  const messageAccepted = OrmpProtocolMessageAccepted.load(entity.msgHash);
  if (messageAccepted) {
    messageAccepted.oracleAssigned = true;
    messageAccepted.oracleAssignedFee = entity.fee;
    messageAccepted.save();
  }
}

export function handleImportedMessageRoot(
  event: ImportedMessageRootEvent
): void {
  let entity = new OrmpOracleImportedMessageRoot(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.chainId = event.params.chainId
  entity.blockHeight = event.params.blockHeight
  entity.messageRoot = event.params.messageRoot

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OrmpOracleOwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSetApproved(event: SetApprovedEvent): void {
  let entity = new OrmpOracleSetApproved(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.operator = event.params.operator
  entity.approve = event.params.approve

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSetFee(event: SetFeeEvent): void {
  let entity = new OrmpOracleSetFee(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.chainId = event.params.chainId
  entity.fee = event.params.fee

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdrawal(event: WithdrawalEvent): void {
  let entity = new OrmpOracleWithdrawal(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.to = event.params.to
  entity.amt = event.params.amt

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
