import TimeQuaver from "./TimeQuaver";

function TimeUI({ sequencerPlayState }: { sequencerPlayState: number }) {
    return (
        <div className='flex flex-row gap-8'>
            <div className='flex flex-row gap-1'>
                <TimeQuaver shouldLight={sequencerPlayState == 1} />
                <TimeQuaver shouldLight={sequencerPlayState == 2} />
                <TimeQuaver shouldLight={sequencerPlayState == 3} />
                <TimeQuaver shouldLight={sequencerPlayState == 4} />
            </div>
            <div className='flex flex-row gap-1'>
                <TimeQuaver shouldLight={sequencerPlayState == 5} />
                <TimeQuaver shouldLight={sequencerPlayState == 6} />
                <TimeQuaver shouldLight={sequencerPlayState == 7} />
                <TimeQuaver shouldLight={sequencerPlayState == 8} />
            </div>
            <div className='flex flex-row gap-1'>
                <TimeQuaver shouldLight={sequencerPlayState == 9} />
                <TimeQuaver shouldLight={sequencerPlayState == 10} />
                <TimeQuaver shouldLight={sequencerPlayState == 11} />
                <TimeQuaver shouldLight={sequencerPlayState == 12} />
            </div>
            <div className='flex flex-row gap-1'>
                <TimeQuaver shouldLight={sequencerPlayState == 13} />
                <TimeQuaver shouldLight={sequencerPlayState == 14} />
                <TimeQuaver shouldLight={sequencerPlayState == 15} />
                <TimeQuaver shouldLight={sequencerPlayState == 16} />
            </div>
        </div>
    );
}
export default TimeUI;