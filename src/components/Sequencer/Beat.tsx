

function Beat({index, channelId, sequencerCollection, setSequencerCollection} : {index: number, channelId: number, sequencerCollection: boolean[][], setSequencerCollection: React.Dispatch<React.SetStateAction<boolean[][]>>}) {
    
    function handleClick(quaverToChangeId : number) {
        let seq = sequencerCollection.map((item) => item)
        seq[channelId][quaverToChangeId] = !seq[channelId][quaverToChangeId]
        setSequencerCollection(seq)
    }
    
    return (
        <div className='flex flex-row gap-1'>
                <a onClick={() => handleClick(index)} onDragLeave={() => handleClick(index)} className={`${sequencerCollection[channelId][index] && "bg-green-600 "} h-16 w-16 border-2 border-black rounded-2xl hover:bg-green-300 cursor-pointer`}></a>
                <a onClick={() =>  handleClick(index + 1)} onDragLeave={() => handleClick(index + 1)} className={`${sequencerCollection[channelId][index + 1] && "bg-green-600 "} h-16 w-16 border-2 border-black rounded-2xl hover:bg-green-300 cursor-pointer`}></a>
                <a onClick={() =>  handleClick(index + 2)} onDragLeave={() => handleClick(index + 2)} className={`${sequencerCollection[channelId][index + 2] && "bg-green-600 "} h-16 w-16 border-2 border-black rounded-2xl hover:bg-green-300 cursor-pointer`}></a>
                <a onClick={() => handleClick(index + 3)} onDragLeave={() => handleClick(index + 3)} className={`${sequencerCollection[channelId][index + 3] && "bg-green-600 "} h-16 w-16 border-2 border-black rounded-2xl hover:bg-green-300 cursor-pointer`}></a>
            </div>
    )
}
export default Beat