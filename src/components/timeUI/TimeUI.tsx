import TimeQuaver from "./TimeQuaver";

function TimeUI({ sequencerPlayState }: { sequencerPlayState: React.MutableRefObject<number> }) {
    return (
        <div className='flex flex-row gap-8'>
            <div className='flex flex-row gap-1'>
                <TimeQuaver shouldLight={sequencerPlayState.current == 1} />
                <TimeQuaver shouldLight={sequencerPlayState.current == 2} />
                <TimeQuaver shouldLight={sequencerPlayState.current == 3} />
                <TimeQuaver shouldLight={sequencerPlayState.current == 4} />
            </div>
            <div className='flex flex-row gap-1'>
                <TimeQuaver shouldLight={sequencerPlayState.current == 5} />
                <TimeQuaver shouldLight={sequencerPlayState.current == 6} />
                <TimeQuaver shouldLight={sequencerPlayState.current == 7} />
                <TimeQuaver shouldLight={sequencerPlayState.current == 8} />
            </div>
            <div className='flex flex-row gap-1'>
                <TimeQuaver shouldLight={sequencerPlayState.current == 9} />
                <TimeQuaver shouldLight={sequencerPlayState.current == 10} />
                <TimeQuaver shouldLight={sequencerPlayState.current == 11} />
                <TimeQuaver shouldLight={sequencerPlayState.current == 12} />
            </div>
            <div className='flex flex-row gap-1'>
                <TimeQuaver shouldLight={sequencerPlayState.current == 13} />
                <TimeQuaver shouldLight={sequencerPlayState.current == 14} />
                <TimeQuaver shouldLight={sequencerPlayState.current == 15} />
                <TimeQuaver shouldLight={sequencerPlayState.current == 16} />
            </div>
        </div>
    );
}
export default TimeUI;