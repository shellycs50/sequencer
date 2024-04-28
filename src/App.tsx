import { useState, useRef, useEffect } from 'react'
import { FaPlay, FaStop } from "react-icons/fa";
import { Progress } from "@/components/ui/progress"
import './App.css'
import Sequencer from './components/Sequencer/Sequencer';
import hiHatFile from './assets/hihat.wav'
import kickFile from './assets/kick.wav'
import snareFile from './assets/snare.wav'
import openHiHatFile from './assets/openhat.wav'
import { Slider } from './components/ui/slider';
import TimeUI from './components/timeUI/TimeUI';


function App() {
  const audioContext = new AudioContext();
  // const timeRef = useRef(0)
  const [currentTime, _] = useState(0)
  const hiHatSound = loadAudioFile(hiHatFile)
  const kickSound = loadAudioFile(kickFile)
  const snareSound = loadAudioFile(snareFile)
  const openHiHatSound = loadAudioFile(openHiHatFile)
  const [tempo, setTempo] = useState(140) 
  const secondsPerBeat = 60 / tempo
  const secondsPerQuarter = secondsPerBeat / 4
  const secondsPerBar = secondsPerBeat * 4
  const [sequencerCollection, setSequencerCollection] = useState<Array<Array<boolean>>>(Array(4).fill(0).map(() => Array(16).fill(false)));
  const sequencerPlayState = useRef(0) //which quaver we are on
  const [volumes, setVolumes] = useState<Array<number>>(new Array(4).fill(50))
  const [isPlaying, setIsPlaying] = useState(false)
  const playingSources = useRef<Array<AudioBufferSourceNode>>([])
  const tempoChanger = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (tempoChanger.current) {
      clearTimeout(tempoChanger.current)
    }
    tempoChanger.current = setTimeout(async () => {
      if (!isPlaying) return
      stopPlaying()
      await delay(100)
      startPlayingLoop()
    }, 500)
  }, [tempo])

  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  useEffect(() => {
    console.log(sequencerPlayState.current)
  }, [sequencerPlayState.current])

  // function giveTimeToState() {
  //   timePasserRef.current = setInterval(() => {
  //     if (audioContext.currentTime) {
  //       setCurrentTime(audioContext.currentTime);
  //     }
  //   }, 50);
  // }
  // function stopGivingTimeToState() {
  //   if (timePasserRef.current) {
  //     clearTimeout(timePasserRef.current)
  //   }
  // }

  // useEffect(() => {
  //   setInterval(() => {
  //     let currentQuaver = sequencerPlayState.current
  //     console.log({currentQuaver})
  //   }, 100)
  // })

  useEffect(() => {
    if (!isPlaying) return;

    stopPlaying()
    startPlayingLoop();
  }, [sequencerCollection])

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
    if (audioContext.currentTime == 100 * secondsPerBar) {
      stopPlaying()
      startPlayingLoop()
    }
  }

  async function startPlayingLoop() {
    await delay(200)
    // let currentQuaver = sequencerPlayState.current;
    let currentQuaver = 0
    const startTime = audioContext.currentTime
    const kickPattern = sequencerCollection[0]
    const snarePattern = sequencerCollection[1]
    const closedHatPattern = sequencerCollection[2]
    const openHatPattern = sequencerCollection[3]

    for (let j = 0; j < 10; j++) {
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
    // timeRef.current = audioContext.currentTime
    playingSources.current.forEach(source => source.stop())
  }

  function togglePlay() {
    // isPlaying ? stopGivingTimeToState() : giveTimeToState()
    isPlaying ? stopPlaying() : startPlayingLoop()
    setIsPlaying(!isPlaying)
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
        
        <Slider defaultValue={[tempo]} max={500} step={1} onValueChange={(e: Array<any>) => parseInt(e[0]) && setTempo(parseInt(e[0]))} />
      </div>
      <Sequencer sequencerCollection={sequencerCollection} setSequencerCollection={setSequencerCollection} volumes={volumes} setVolumes={setVolumes} />
      <div className='w-7/12 border-t-2 border-black'></div>
      <TimeUI sequencerPlayState={sequencerPlayState}/>
      <div className='flex flex-row gap-3'>
        <a onClick={togglePlay} className={`text-4xl cursor-pointer p-5 rounded-full ${isPlaying ? "bg-red-300" : "bg-green-300"}`}>{isPlaying ? <FaStop /> : <FaPlay />}</a>
        <a onClick={resetArray} className='font-semibold text-2xl cursor-pointer p-5 rounded-full bg-slate-300'>Reset</a>
      </div>
    \
      <Progress value={currentTime % secondsPerBar * 100} className='w-3/4' />
      <div className='w-full border-black'>
        
      </div>

    </div>
  )
}

export default App
