import { useState } from "react"

import ExecutionLayer_ABI from "../abi/ExecutionLayer.json";

import {gql, request} from "graphql-request";
import { useEffect } from "react";
import SyncStateButton from "./buttons/SyncStateButton";

import {BiCopyAlt} from "react-icons/bi";
import Image from "next/image";

export default function CreateState() {
    const [inputValue, setInputValue] = useState("");
    const [inputState, setInputState] = useState("");
    const [syncData, setData] = useState([]);

     useEffect(() => {
        findRouterInfo();
    }, []);

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
          console.log(data.initDatas);
          setData(data.initDatas);
        } catch (err) {
          console.log(err);
        }
      }


    return(
        <div className="mt-5 pt-5 grid grid-rows-2 lg:grid-cols-2 gap-5">
            <div className="flex flex-col border p-6 rounded-lg bg-white">
                <h2 className="text-medium font-bold mb-4 underline">STATE SYNC</h2>
                <label className="mt-2">enter a value to sync</label>
                <input className="border input-form p-4 rounded mt-3" value={inputValue} onChange={(e) => {setInputValue(e.target.value)}} placeholder="Enter a value to sync" />
                <label className="mt-5">enter a state</label>
                <input className="border input-form p-4 rounded mt-3" value={inputState} onChange={(e) => {setInputState(e.target.value)}} placeholder="Enter a state to sync" />
                <SyncStateButton value={inputValue} state={inputState} />
            </div>
            <div className="flex flex-col border p-6 rounded-lg bg-white">
            <h2 className="text-medium font-bold mb-4 underline">SYNC HISTORY</h2>
            {
                syncData?.map((d, key) => {
                    return (
                        <div className="grid grid-cols-3 mt-2 border p-3 rounded place-items-center" key={key}>
                            <p className="flex place-items-center justify-center">{d.slotId.slice(0, 5) + "....." + d.slotId.slice(d.slotId.length - 5, d.slotId.length)} <BiCopyAlt  className="ml-2" /></p>
                            <p>{d.currState_}</p>
                            {/* <p className="flex justify-center place-items-center"><Image className="m-3" src="/base-icon.svg" height={20} width={20} /> Base</p> */}
                            <p>{d.data.slice(0, 10) + "....." + d.data.slice(d.data.length - 10, d.data.length)}</p>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}