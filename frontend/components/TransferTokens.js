import { useState } from "react";
import TransferButton from "./buttons/TransferButton";

export default function TransferTokens() {
    const [inputTo, setTo] = useState("");
    const [inputAmount, setAmount] = useState("");

    return(
        <div className="mt-20 pt-20 flex flex-col justify-center place-items-center">
            <div className="flex flex-col border p-6 rounded-lg bg-white w-96">
                <h2 className="text-medium font-bold mb-4 underline">TRANSFER TOKENS</h2>
                <label className="mt-2">enter the recipient</label>
                <input className="border input-form p-4 rounded mt-3" value={inputTo} onChange={(e) => {setTo(e.target.value)}} placeholder="0x....123" />
                <label className="mt-5">enter the amount</label>
                <input className="border input-form p-4 rounded mt-3" value={inputAmount} onChange={(e) => {setAmount(e.target.value)}} placeholder="0" />
                <TransferButton to={inputTo} amount={inputAmount} />
            </div>
        </div>
    )
}