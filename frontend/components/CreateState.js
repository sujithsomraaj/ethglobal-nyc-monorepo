import { useState } from "react"
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";

import ExecutionLayer_ABI from "../abi/ExecutionLayer.json";
import StorageLayer_ABI from "../abi/StorageLayer.json";

export default function CreateState() {
    const [inputValue, setInputValue] = useState("");

    const { config } = usePrepareContractWrite({ address: "", abi: ExecutionLayer_ABI, functionName: "initializeStorage", args: [["12", "1", [], []]], value: parseEther("0.1")});
    const { data, write } = useContractWrite({ ...config, onError(data) { console.log("SUCCESS"); }, });
    
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