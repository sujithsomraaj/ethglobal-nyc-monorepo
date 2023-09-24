import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Navbar() {
    return (
        <div className='flex flex-row justify-between place-items-center'>
        <h1 className='font-medium text-4xl'>Capital <span className='text-green'>ε</span></h1>
        <ConnectButton />
      </div>
    );
}