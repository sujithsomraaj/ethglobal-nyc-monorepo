import BlockSpace from "@/components/BlockSpace";
import CreateState from "@/components/CreateState";
import Jumbotron from "@/components/Jumbotron";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  return (
    <main>
      <div className='container mx-auto mt-5 font-sans'>
          <div className='flex flex-row justify-between place-items-center'>
            <h1 className='font-medium text-4xl'>Capital <span className='text-green'>ε</span></h1>
            <ConnectButton />
          </div>
          <div>
            <Jumbotron />
            {/* <BlockSpace /> */}
            <CreateState />
          </div>
      </div>
    </main>
  )
}
