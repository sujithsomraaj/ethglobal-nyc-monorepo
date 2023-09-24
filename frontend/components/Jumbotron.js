import Link from 'next/link';

export default function Jumbotron() {
    return(
        <div className="flex flex-col place-items-center justify-center mt-20 bg-lines h-96 rounded">
            <div>
                <h1 className="text-6xl font-black text-black">Utilize BlockSpace <span className="text-green">Efficiently</span> and <span className="text-green">Effectively</span></h1>
                <br />
                <p className="text-xl mt-3">Capital ε attempts to fix rollup/alternative L1 driven state fragmentation through an open global state layer accessible to all</p>
            </div>
            <div className='mt-14'>
                <Link className="pr-20 pl-20 pt-4 pb-4 bg-blue text-white border font-bold rounded-xl" href="/dapp">ENTER THE APP</Link>
            </div>
        </div>
    )
}