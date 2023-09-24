import Navbar from "@/components/Navbar";
import TransferTokens from "@/components/TransferTokens";

export default function Bridge() {
    return (
    <div className='container mx-auto mt-10 font-sans'>
        <Navbar />
        <TransferTokens />
    </div>
    )
}