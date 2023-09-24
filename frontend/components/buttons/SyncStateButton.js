import { useContractWrite, useWaitForTransaction } from "wagmi";
import ExecutionLayer_ABI from "../../abi/ExecutionLayer.json";
import {parseEther} from "ethers";

export default function SyncStateButton(props) {
    console.log(props.value)

    const { data, write } = useContractWrite({ 
        address: '0x36602dd0E00C6Ed0b4e3c463214002dBaAf7baC4',
        abi: ExecutionLayer_ABI,
        functionName: 'initializeStorage',
        args: [{
            extInfo_: props.value,
            state_: props.state,
            accessList_: [],
            allowedChainIds: []
        }],
        value: parseEther("0.05")
     });
    
    useWaitForTransaction({ hash: data?.hash, onSuccess(data) { 
        console.log("SUCCESS");
     } });

    return(
        <button className="pl-20 pr-20 pt-4 pb-4 bg-blue rounded-lg mt-8 text-white font-medium" onClick={() => write?.()}>SYNC STATE</button>
    )
}