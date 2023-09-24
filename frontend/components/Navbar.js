import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

export default function Navbar() {
    return (
        <div className='flex flex-row justify-between place-items-center'>
         <Link href="/">
          <h1 className='font-bold text-3xl'>Capital <span className='text-green'>ε</span></h1>
        </Link>
        <ConnectButton />
      </div>
    );
}