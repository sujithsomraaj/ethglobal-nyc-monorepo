import { useState } from "react";
import TransferButton from "./buttons/TransferButton";
import Image from "next/image";

export default function TransferTokens() {
    const [inputTo, setTo] = useState("");
    const [inputAmount, setAmount] = useState("");

    return(
        <div className="mt-20 pt-10 flex flex-col justify-center place-items-center">
            <div className="flex flex-col border p-6 rounded-lg bg-white w-96">
                <h2 className="text-medium font-bold mb-4 underline"><span className="line-through">BRIDGE</span> TRANSFER TOKENS</h2>
                <label className="mt-2">enter the recipient</label>
                <input className="border input-form p-4 rounded mt-3" value={inputTo} onChange={(e) => {setTo(e.target.value)}} placeholder="0x....123" />
                <label className="mt-5">enter the amount</label>
                <input className="border input-form p-4 rounded mt-3" value={inputAmount} onChange={(e) => {setAmount(e.target.value)}} placeholder="0" />
                <label className="mt-5">State Bridges Used</label>
                <div className="grid grid-cols-4 gap-2 mt-5">
                    <div className="bg-blue p-5 rounded-xl">
                        <Image src="/hyperlane.svg" height={40}  width={40} />
                    </div>
                    <div className="p-5 rounded-xl border">
                        <Image src="/axelar.png" height={40}  width={40} />
                    </div>
                </div>
                <TransferButton to={inputTo} amount={inputAmount} />
            </div>
        </div>
    )
}