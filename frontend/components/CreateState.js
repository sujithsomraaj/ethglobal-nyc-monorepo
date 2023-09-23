import { useState } from "react"
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";

import ExecutionLayer_ABI from "../abi/ExecutionLayer.json";
import StorageLayer_ABI from "../abi/StorageLayer.json";

import {parseEther} from "ethers";

export default function CreateState() {
    const [inputValue, setInputValue] = useState("");

    // const { config } = usePrepareContractWrite({ address: '0x9764e24D0fE6c4D78b4F4Dd782EE13C26AEB13a1', abi: ExecutionLayer_ABI, functionName: "initializeStorage", args: [["12", "1", [], []]]});
    const { data, write } = useContractWrite({ 
        address: '0x805deF1C4B18B264138c238366B4a9BEA62442c2',
        abi: ExecutionLayer_ABI,
        functionName: 'initializeStorage',
        args: [{
            extInfo_: "",
            state_: 1,
            accessList_: [],
            allowedChainIds: []
        }],
        value: parseEther("0.02")
     });
    
    useWaitForTransaction({ hash: data?.hash, onSuccess(data) { 
        console.log("SUCCESS");
     } });

    return(
        <div className="mt-5 pt-5">
            <input className="border" value={inputValue} onChange={(e) => {setInputValue(e.value)}} />
            <button onClick={() => write?.()}>Click Me</button>
        </div>
    )
}