import Link from 'next/link';

export default function Jumbotron() {
    return(
        <div className="flex flex-col place-items-center justify-center mt-20 bg-lines pt-20 pb-20 rounded">
            <div>
                <h1 className="text-6xl font-black text-black mt-20">Utilize BlockSpace <span className="text-green">Efficiently</span> and <span className="text-green">Effectively</span></h1>
                <br />
                <p className="text-xl mt-5">Capital ε attempts to fix rollup/alternative L1 driven state fragmentation through an open global state layer accessible to all</p>
            </div>
            <div className='mt-20 mb-20'>
                <Link className="pr-20 pl-20 pt-4 pb-4 bg-blue text-white border font-bold rounded-xl" href="/infra">EXPLORE INFRA</Link>
                <Link className="pr-20 pl-20 pt-4 pb-4 ml-10 bg-blue text-white border font-bold rounded-xl" href="/bridge">BRIDGE TOKENS</Link>
            </div>
        </div>
    )
}