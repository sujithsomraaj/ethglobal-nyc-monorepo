import { useEffect, useState } from "react";
import TransferButton from "./buttons/TransferButton";
import Image from "next/image";
import { useAccount } from "wagmi";
import request, { gql } from "graphql-request";

const noHyperlane = [];

export default function TransferTokens() {
    const {account} = useAccount();

    const [inputTo, setTo] = useState("");
    const [inputAmount, setAmount] = useState("");
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchData(account);
    }, []);

    const fetchData = async (userNow) => {
        const query = gql`{
                        transferDatas {
                         from
                         to
                         amount
                }}`;
    
        const url = "https://api.thegraph.com/subgraphs/name/sujithsomraaj/capital-epsilon";
        
        try {
          const data = await request(url, query, {user: userNow});
          setData(data.transferDatas);
        } catch (err) {
          console.log(err);
        }
    }

    return(
        <div className="mt-10 pt-10 flex flex-col justify-center place-items-center">
            <div className="flex flex-col border p-6 rounded-lg bg-white w-96">
                <h2 className="text-medium font-bold mb-4 underline"><span className="line-through text-green">BRIDGE</span> TRANSFER TOKENS</h2>
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
            <div className="mb-10 mt-10">
                    <div className="grid grid-cols-3 mt-2 border p-3 pl-10">
                        <p className="font-bold">From</p>
                        <p className="">To</p>
                        <p>Amount</p>
                    </div> 
                {data?.map((d, key) => {
                    return (
                    <div className="grid grid-cols-3 mt-2 border p-3 rounded" key={key}>
                        <p className="flex">{d.from}</p>
                        <p className="flex">{d.to}</p>
                        <p>{d.amount}</p>
                    </div> 
                    )
                })}
            </div>
        </div>
    )
}