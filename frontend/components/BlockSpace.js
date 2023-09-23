export default function BlockSpace() {
    return(
        <div className="grid grid-cols-4 gap-3 mt-20">
            <div className="p-4 border rounded">
                <h3 className="text-xl font-medium">Rollup-1</h3>
                <h3 className="text-medium font-light mt-5">15% BLOCK GAS USED</h3>
            </div>
            <div className="p-4 border rounded">
                <h3 className="text-xl font-medium">Rollup-2</h3>
                <h3 className="text-medium font-light mt-5">25% BLOCK GAS USED</h3>
            </div>
            <div className="p-4 border rounded">
                <h3 className="text-xl font-medium">Rollup-3</h3>
                <h3 className="text-medium font-light mt-5">35% BLOCK GAS USED</h3>
            </div>
            <div className="p-4 border rounded">
                <h3 className="text-xl font-medium">Rollup-4</h3>
                <h3 className="text-medium font-light mt-5">45% BLOCK GAS USED</h3>
            </div>
        </div>
    )
}