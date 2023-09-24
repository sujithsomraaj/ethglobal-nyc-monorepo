import { useState } from "react"
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";

import ExecutionLayer_ABI from "../abi/ExecutionLayer.json";
import StorageLayer_ABI from "../abi/StorageLayer.json";

import {parseEther, ethers} from "ethers";

import {GraphQLClient, gql, request} from "graphql-request";
import { useEffect } from "react";

export default function CreateState() {
    const [inputValue, setInputValue] = useState("");
    const [inputChain, setInputChain] = useState("");
    const [syncData, setData] = useState([]);

    const { data, write } = useContractWrite({ 
        address: '0x805deF1C4B18B264138c238366B4a9BEA62442c2',
        abi: ExecutionLayer_ABI,
        functionName: 'initializeStorage',
        args: [{
            extInfo_: inputValue,
            state_: 1,
            accessList_: [],
            allowedChainIds: []
        }],
        value: parseEther("0.02")
     });
    
    useWaitForTransaction({ hash: data?.hash, onSuccess(data) { 
        console.log("SUCCESS");
     } });

     useEffect(() => {
        findRouterInfo();
    }, [])

    const findRouterInfo = async () => {
        const query = gql`{
            initDatas {
                        slotId
                        currState_
                        data
            }
        }`;
    
        const url = "https://api.thegraph.com/subgraphs/name/sujithsomraaj/capital-epsilon";
        
        try {
          const data = await request(url, query);
          setData(data.initDatas);
        } catch (err) {
          console.log(err);
        }
      };


    return(
        <div className="mt-5 pt-5 grid grid-rows-2 lg:grid-cols-2 gap-5">
            <div className="flex flex-col border p-6 rounded-lg bg-white">
                <h2 className="text-xl font-bold mb-4">STATE SYNC</h2>
                <label className="mt-2">enter a value to sync</label>
                <input className="border input-form p-4 rounded mt-3" value={inputValue} onChange={(e) => {setInputValue(e.value)}} placeholder="Enter a value to sync" />
                <label className="mt-5">select from chain</label>
                <input className="border input-form p-4 rounded mt-3" value={inputChain} onChange={(e) => {setInputChain(e.value)}} placeholder="Enter a value to sync" />
                <button className="pl-20 pr-20 pt-4 pb-4 bg-blue rounded-lg mt-8 text-white font-medium" onClick={() => write?.()}>SYNC STATE</button>
            </div>
            <div className="flex flex-col border p-6 rounded-lg bg-white">
            <h2 className="text-xl font-bold mb-4">SYNC HISTORY</h2>
            {
                syncData?.map((d) => {
                    return (
                        <div className="grid grid-cols-3 mt-2 border p-3 rounded">
                            <p>{d.slotId.slice(0, 10) + "" + d.slotId.slice(d.slotId.length - 10, d.slotId.length)}</p>
                            <p>{d.currState_}</p>
                            <p>{d.data.slice(0, 10) + "....." + d.data.slice(d.data.length - 10, d.data.length)}</p>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}