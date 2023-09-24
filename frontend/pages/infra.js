import CreateState from "@/components/CreateState";
import Navbar from "@/components/Navbar";

export default function Dapp() {
    return (
    <div className='container mx-auto mt-10 font-sans'>
        <Navbar />
        <CreateState />
    </div>
    )
}