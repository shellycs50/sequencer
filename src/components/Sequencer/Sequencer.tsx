import Channel from "./Channel";
function Sequencer({sequencerCollection, setSequencerCollection, volumes, setVolumes} : {sequencerCollection: boolean[][], setSequencerCollection: React.Dispatch<React.SetStateAction<boolean[][]>>, volumes: number[], setVolumes: React.Dispatch<React.SetStateAction<number[]>> }) {
    
      

    return (
    <div className='flex flex-col gap-5'>
        <Channel name="Kick" sequencerCollection={sequencerCollection} setSequencerCollection={setSequencerCollection} index={0} volumes={volumes} setVolumes={setVolumes} />
        <Channel name="Snare" sequencerCollection={sequencerCollection} setSequencerCollection={setSequencerCollection} index={1} volumes={volumes} setVolumes={setVolumes} />
        <Channel name="Hi-Hat" sequencerCollection={sequencerCollection} setSequencerCollection={setSequencerCollection} index={2} volumes={volumes} setVolumes={setVolumes} />
        <Channel name="Open Hi-Hat" sequencerCollection={sequencerCollection} setSequencerCollection={setSequencerCollection} index={3} volumes={volumes} setVolumes={setVolumes} />
      </div>
    )
}

export default Sequencer