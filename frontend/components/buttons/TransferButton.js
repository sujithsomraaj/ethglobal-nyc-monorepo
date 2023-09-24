import { useContractWrite, useWaitForTransaction } from "wagmi";
import StatelessERC20_ABI from "../../abi/StatelessERC20.json";
import {parseEther} from "ethers";

export default function TransferButton(props) {
    const { data, write } = useContractWrite({ 
        address: '0x9fCA34a10585FE0F59bC3F7fa26888213A3A3140',
        abi: StatelessERC20_ABI,
        functionName: 'transfer',
        args: [
            props.to,
            props.amount
        ],
        value: parseEther("0.05")
     });
    
    useWaitForTransaction({ hash: data?.hash, onSuccess(data) { 
        console.log("SUCCESS");
     } });

    return(
        <button className="pl-20 pr-20 pt-4 pb-4 bg-blue rounded-lg mt-8 text-white font-medium" onClick={() => write?.()}>TRANSFER BUTTON</button>
    )
}