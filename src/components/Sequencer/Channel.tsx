
import Beat from "./Beat"

function Channel({ sequencerCollection, setSequencerCollection, volumes, setVolumes, index, name }: { sequencerCollection: boolean[][], setSequencerCollection: React.Dispatch<React.SetStateAction<boolean[][]>>, volumes: number[], setVolumes: React.Dispatch<React.SetStateAction<number[]>>, index: number, name: string }) {

    // console.log({volumes, setVolumes})
    return (
        <div>
            <h3 className="text-xl">{name}</h3>
            <div className='flex flex-row gap-8'>
                <Beat channelId={index} index={0} sequencerCollection={sequencerCollection} setSequencerCollection={setSequencerCollection} />
                <Beat channelId={index} index={4} sequencerCollection={sequencerCollection} setSequencerCollection={setSequencerCollection} />
                <Beat channelId={index} index={8} sequencerCollection={sequencerCollection} setSequencerCollection={setSequencerCollection} />
                <Beat channelId={index} index={12} sequencerCollection={sequencerCollection} setSequencerCollection={setSequencerCollection} />
            </div>
        </div>
    )
}
export default Channel