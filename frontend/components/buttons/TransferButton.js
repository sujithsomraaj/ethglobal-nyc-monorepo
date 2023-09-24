import { useContractWrite, useWaitForTransaction } from "wagmi";
import StatelessERC20_ABI from "../../abi/StatelessERC20.json";
import {parseEther} from "ethers";
import { PuffLoader } from "react-spinners";
import { useState } from "react";
import Link from "next/link";
import { useNetwork } from 'wagmi'


export default function TransferButton(props) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const {chain} = useNetwork();

    const { data, write } = useContractWrite({ 
        address: chain.id == 80001 ? '0x9fCA34a10585FE0F59bC3F7fa26888213A3A3140' : chain.id == 84531 ? '0x9851c54B1E85722632B65230f51aBE396C7B09f8' : '0xa9ad0cfd649a51211419c66aa60aa0bee4e49667',
        abi: StatelessERC20_ABI,
        functionName: 'transfer',
        args: [
            props.to,
            props.amount
        ],
        value: parseEther("0.05"),
        onError(error) {
            alert(error);
            setLoading(false);
        }
     });
    
    useWaitForTransaction({ hash: data?.hash, onSuccess(data) { 
        setLoading(false);
        setSuccess(true);
     } });

    return(
        <>
        <div>
        <button className="pl-20 pr-20 pt-4 pb-4 bg-blue rounded-lg mt-8 text-white font-medium w-full" onClick={() => {
            setLoading(true);
            write?.();
        }}>
            {
            loading ? 
            <div className="grid grid-cols-6 gap-2 place-items-center justify-center"><PuffLoader className="col-span-1" color={"var(--white)"} size={20} /> <p className="col-span-5">GO TO WALLET...</p> </div>
            :
            "TRANSFER TOKENS"
            }
        </button>
        </div>
        <div>
       {success ?  <div className="bg-success mt-5 p-3 text-white rounded-lg">
            <h1>Transaction Successful. Track <Link className="underline" href={`https://explorer.hyperlane.xyz/message/${data?.hash}`} target="_blank">Hyperlane</Link>, <Link className="underline" href={`https://testnet.axelarscan.io/gmp/${data?.hash}`} target="_blank">Axelar</Link></h1>
        </div> : null }
        </div>
        </>
    )
}