import { useState, useRef, useEffect } from 'react'
import { FaPlay, FaStop } from "react-icons/fa";
// import { Progress } from "@/components/ui/progress"
import './App.css'
import Sequencer from './components/Sequencer/Sequencer';
import hiHatFile from './assets/hihat.wav'
import kickFile from './assets/kick.wav'
import snareFile from './assets/snare.wav'
import openHiHatFile from './assets/openhat.wav'
import { Slider } from './components/ui/slider';
import TimeUI from './components/timeUI/TimeUI';


function App() {
  
  const [audioContext, _] = useState(new AudioContext())
  const hiHatSound = loadAudioFile(hiHatFile)
  const kickSound = loadAudioFile(kickFile)
  const snareSound = loadAudioFile(snareFile)
  const openHiHatSound = loadAudioFile(openHiHatFile)
  const [tempo, setTempo] = useState(140)
  const secondsPerBeat = 60 / tempo
  const secondsPerQuarter = secondsPerBeat / 4
  // const secondsPerBar = secondsPerBeat * 4
  const [sequencerCollection, setSequencerCollection] = useState<Array<Array<boolean>>>(Array(4).fill(0).map(() => Array(16).fill(false)));
  const [sequencerPlayState, setSequencerPlayState] = useState(0)
  const [volumes, setVolumes] = useState<Array<number>>(new Array(4).fill(50))
  const [isPlaying, setIsPlaying] = useState(false)
  const playingSources = useRef<Array<AudioBufferSourceNode>>([])
  const tempoChanger = useRef<NodeJS.Timeout | null>(null);
  const timeUISetter = useRef<NodeJS.Timeout | null>(null);
  const playHandler = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (tempoChanger.current) {
      clearTimeout(tempoChanger.current)
    }
    tempoChanger.current = setTimeout(async () => {
      if (!isPlaying) return
      stopPlaying()
      
      startPlayingLoop()
    }, 500)
  }, [tempo])

  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  useEffect(() => {
    restartWithDelay()
  }, [sequencerCollection])

  async function restartWithDelay() {
    if (!isPlaying) return;

    stopPlaying()
    
    startPlayingLoop();
  }

  async function loadAudioFile(url: string): Promise<AudioBuffer> {
    const response = await fetch(url);
    const audioData = await response.arrayBuffer();
    return await audioContext.decodeAudioData(audioData);
  }

  function playSound(buffer: AudioBuffer, time: number,) {
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(time);
    playingSources.current.push(source)
    
  }

  async function startPlayingLoop() {
    let currentQuaver = 0
    const startTime = audioContext.currentTime
    const kickPattern = sequencerCollection[0]
    const snarePattern = sequencerCollection[1]
    const closedHatPattern = sequencerCollection[2]
    const openHatPattern = sequencerCollection[3]
    
    // setInterval to increment timeUI
    if (timeUISetter.current) {
      clearTimeout(timeUISetter.current)
    }
    timeUISetter.current = setInterval(() => {

      setSequencerPlayState((prev) => (prev + 1) % 16)

    }, secondsPerQuarter * 1000)
    setSequencerPlayState(0)

    //Main logic
    for (let j = 0; j < 20; j++) {
      const barStartTime = startTime + (j * 4 * secondsPerBeat)
      for (let i = j == 0 ? currentQuaver : 0; i < sequencerCollection[0].length; i++) {
        const time = barStartTime + (i * secondsPerQuarter);
        if (kickPattern[i]) {
          playSound(await kickSound, time);
        }
        if (snarePattern[i]) {
          playSound(await snareSound, time);
        }
        if (closedHatPattern[i]) {
          playSound(await hiHatSound, time);
        }
        if (openHatPattern[i]) {
          playSound(await openHiHatSound, time);
        }
      }
    }
    
  }

  function stopPlaying() {
    if (timeUISetter.current) {
      clearTimeout(timeUISetter.current)
    }
    playingSources.current.forEach((source) => {
      source.stop();
      source.disconnect();
    });
  }

  function togglePlay() {
    if (isPlaying) {
      stopPlaying()
    }
    else {
      if (playHandler.current) clearTimeout(playHandler.current)
      playHandler.current = setTimeout(() => {
        startPlayingLoop()
      }, 100)
    }
    setIsPlaying(!isPlaying);
  }

  function resetArray() {
    setSequencerCollection(Array(4).fill(0).map(() => Array(16).fill(false)))
    setIsPlaying(false)
    stopPlaying()
  }
  return (
    <div className='flex flex-col justify-start items-center h-screen w-screen gap-10 font-monument bg-slate-300'>
      <h1 className='text-4xl font-semibold my-10'>DRUM SEQUENCER</h1>
      <div className='w-3/4 flex flex-row justify-center gap-3'>
        <div className='flex flex-col gap-1'>
          <p>BPM</p>
          <p>{tempo}</p>
        </div>

        <Slider className='w-1/2' defaultValue={[tempo]} max={500} step={1} onValueChange={(e: Array<any>) => parseInt(e[0]) && setTempo(parseInt(e[0]))} />
      </div>
      <Sequencer sequencerCollection={sequencerCollection} setSequencerCollection={setSequencerCollection} volumes={volumes} setVolumes={setVolumes} />
      <div className='w-7/12 border-t-2 border-black'></div>
      <TimeUI sequencerPlayState={sequencerPlayState} />
      <div className='flex flex-row gap-3'>
        <a onClick={togglePlay} className={`text-4xl cursor-pointer p-5 rounded-full ${isPlaying ? "bg-red-300" : "bg-green-300"}`}>{isPlaying ? <FaStop /> : <FaPlay />}</a>
        <a onClick={resetArray} className='font-semibold text-2xl cursor-pointer p-5 rounded-full bg-slate-300'>Reset</a>
      </div>
      \
      
      <div className='w-full border-black'>

      </div>

    </div>
  )
}

export default App
