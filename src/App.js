import { useState, useEffect } from "react"
import {FaUndoAlt} from 'react-icons/fa'
import {AiFillSetting, AiFillCaretDown, AiFillCaretUp, AiOutlineCloseCircle} from "react-icons/ai"
import {IoMdSkipForward, IoMdPlay, IoMdPause} from "react-icons/io"


function App() {
  const [show, setShow] = useState(null)
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)

  const [currentSeconds, setCurrentSeconds] = useState(seconds)
  const [currentMinutes, setCurrentMinutes] = useState(minutes)

  const [breakMinutes, setBreakMinutes] = useState(5)
  const [breakSeconds, setBreakSeconds] = useState(0)

  const [toggleTimer, setToggleTimer] = useState(false)

  const [toggleCounter, setToggleCounter] = useState(true)

  const [currentTimer, setCurrentTimer] = useState("SESSION")

  const [dropdownOption, setDropdownOption] = useState("https://res.cloudinary.com/dgiqi5urn/video/upload/v1661361450/Pomodoro%20Clock/zelda_game_start_tdjfyg.mp3")



  useEffect(()=>{
    if (toggleTimer) {
    let myInterval = setInterval(() => {
            if (currentSeconds === 0 && currentMinutes === 0 && toggleCounter) {
              setCurrentSeconds(breakSeconds);
              setCurrentMinutes(breakMinutes);
              setCurrentTimer("BREAK")
              setToggleCounter(false)
              playAlarm()
              return
            }

            if (currentSeconds === 0 && currentMinutes === 0 && !toggleCounter) {
              setCurrentSeconds(seconds);
              setCurrentMinutes(minutes);
              setCurrentTimer("SESSION")
              setToggleCounter(true)
              playAlarm()
              return
            }

            if (currentSeconds > 0) {
                setCurrentSeconds(currentSeconds - 1);
            }
            if (currentSeconds === 0) {
                if (currentMinutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setCurrentMinutes(currentMinutes - 1);
                    setCurrentSeconds(59);
                }
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
        } else {
          return
        }
    });

  function playAlarm() {
    document.getElementById('alert-audio').play();
  }

  function handlePlay() {
    setToggleTimer(true)
  }
  function handlePause() {
    setToggleTimer(false)
  }
  function handleReset() {
    setCurrentMinutes(minutes)
    setCurrentSeconds(seconds)
    setToggleCounter(true)
    setToggleTimer(false)
  }
  function handleSkip() {
    if (toggleCounter) {
      setCurrentSeconds(breakSeconds);
      setCurrentMinutes(breakMinutes);
      setCurrentTimer("BREAK")
      setToggleCounter(false)
      playAlarm()
      return
    }

    if (!toggleCounter) {
      setCurrentSeconds(seconds);
      setCurrentMinutes(minutes);
      setCurrentTimer("SESSION")
      setToggleCounter(true)
      playAlarm()
      return
    }
  }

  function handleBreakUp() {
    if (breakMinutes === 60 || toggleTimer === true) {
      return
    } 
    setBreakMinutes(breakMinutes + 1)
    if (!toggleCounter) { //Only change the current time if the current timer is break-time
      setCurrentMinutes(breakMinutes + 1)
    }
  }

  function handleBreakDown() {
    if (breakMinutes === 1 || toggleTimer === true) {
      return
    } 
    setBreakMinutes(breakMinutes - 1)
    if (!toggleCounter) {
      setCurrentMinutes(breakMinutes - 1)
    }
  }

  function handleWorkUp() {
    if (minutes === 60 || toggleTimer === true) {
      return
    } 
    setMinutes(minutes + 1)
    if (toggleCounter) {
      setCurrentMinutes(minutes + 1)
    }
    
  }

  function handleWorkDown() {
    if (minutes === 1 || toggleTimer === true) {
      return
    } 
    setMinutes(minutes - 1)
    if (toggleCounter) {
      setCurrentMinutes(minutes - 1)
    }
  }

  function handleSettings() {
    setShow(!show)
    let timeLeft = document.getElementById("time-left");
    let settingsButton = document.getElementById("settings-icon");
    if (!show){
      handlePause()
      timeLeft.classList.add("blur-timer")
      settingsButton.classList.add("blur-timer")
    } else {
      timeLeft.classList.remove("blur-timer")
      settingsButton.classList.remove("blur-timer")
    }
  }


  
  return (
    <div className="App">
      <div className="container" id="container">

       {
       show? <div className="settings">
        <button onClick={handleSettings} className="close-settings-button" style={{color: toggleCounter ? "#004EC2" : "#6FA90C"}}><AiOutlineCloseCircle /></button>
        <h2 style={{color: toggleCounter ? "#004EC2" : "#6FA90C"}}>Settings</h2>
        <hr style={{backgroundColor: toggleCounter ? "#004EC2" : "#6FA90C", borderColor: toggleCounter ? "#004EC2" : "#6FA90C"}} />
        <h3 style={{color: toggleCounter ? "#004EC2" : "#6FA90C"}}>Time (minutes)</h3>

        <div className="flexin">
      <div className="break-time">
        <p style={{color: toggleCounter ? "#004EC2" : "#6FA90C"}}>Break</p>
        <div className="break-time-controls">
      <button onClick={handleBreakUp} style={{color: toggleCounter ? "#004EC2" : "#6FA90C"}}><AiFillCaretUp /></button>
      <p style={{color: toggleCounter ? "#004EC2" : "#6FA90C"}}>{breakMinutes}</p> 
      <button onClick={handleBreakDown} style={{color: toggleCounter ? "#004EC2" : "#6FA90C"}}><AiFillCaretDown /></button>
        </div>
      </div>

      <div className="work-time">
        <p style={{color: toggleCounter ? "#004EC2" : "#6FA90C"}}>Session</p>
        <div className="session-time-controls">
      <button onClick={handleWorkUp} style={{color: toggleCounter ? "#004EC2" : "#6FA90C"}}><AiFillCaretUp /></button>
      <p style={{color: toggleCounter ? "#004EC2" : "#6FA90C"}}>{minutes}</p>
      <button onClick={handleWorkDown} style={{color: toggleCounter ? "#004EC2" : "#6FA90C"}}><AiFillCaretDown /></button>
      </div>
      </div>
      </div>
      <hr style={{backgroundColor: toggleCounter ? "#004EC2" : "#6FA90C", borderColor: toggleCounter ? "#004EC2" : "#6FA90C"}} />
      
        <h2 style={{color: toggleCounter ? "#004EC2" : "#6FA90C"}}>Sound</h2>
        <label for="alarm-sound" style={{color: toggleCounter ? "#004EC2" : "#6FA90C"}}>Alarm Sound</label>
        <select name="alarm-sound" className="alarm-sound" value={dropdownOption} onChange={(e) => setDropdownOption(e.target.value)} style={{borderColor: toggleCounter ? "#004EC2" : "#6FA90C"}}>
        <option value={"https://res.cloudinary.com/dgiqi5urn/video/upload/v1661364993/Pomodoro%20Clock/love_alarm_pk6lgm.mp3"}>Alarm</option>
          <option value={"https://res.cloudinary.com/dgiqi5urn/video/upload/v1661365210/Pomodoro%20Clock/violin_sqeymj.mp3"}>Strings</option>
          <option value={"https://res.cloudinary.com/dgiqi5urn/video/upload/v1661362884/Pomodoro%20Clock/guitar_riff_sgf657.mp3"}>Guitar 1</option>
          <option value={"https://res.cloudinary.com/dgiqi5urn/video/upload/v1661364744/Pomodoro%20Clock/guitar_blues_m1lmk4.mp3"}>Guitar 2</option>
          <option value={"https://res.cloudinary.com/dgiqi5urn/video/upload/v1661364845/Pomodoro%20Clock/guitar_riff_1_wckjqe.mp3"}>Guitar 3</option>
          <option value={"https://res.cloudinary.com/dgiqi5urn/video/upload/v1661362993/Pomodoro%20Clock/glided_piano_chord_isbqu2.mp3"}>Piano 1</option>
          <option value={"https://res.cloudinary.com/dgiqi5urn/video/upload/v1661363090/Pomodoro%20Clock/harmonose2_ksc62k.mp3"}>Piano 2</option>
          <option value={"https://res.cloudinary.com/dgiqi5urn/video/upload/v1661363326/Pomodoro%20Clock/piano_message_r9u4vh.mp3"}>Piano 3</option>
          <option value={"https://res.cloudinary.com/dgiqi5urn/video/upload/v1661361450/Pomodoro%20Clock/zelda_game_start_tdjfyg.mp3"}>Zelda</option>
          <option value={"https://res.cloudinary.com/dgiqi5urn/video/upload/v1661362074/Pomodoro%20Clock/south_park_kawxdz.mp3"}>South Park</option>
          <option value={"https://res.cloudinary.com/dgiqi5urn/video/upload/v1661362214/Pomodoro%20Clock/metal_gear_ringtone_zjw28k.mp3"}>MGS Codec Call</option>
          <option value={"https://res.cloudinary.com/dgiqi5urn/video/upload/v1661362581/Pomodoro%20Clock/undertale_save_game_iniphj.mp3"}>Undertale Save</option>
          <option value={"https://res.cloudinary.com/dgiqi5urn/video/upload/v1661363722/Pomodoro%20Clock/donkey_kong_csesty.mp3"}>Donkey Kong</option>
          <option value={"https://res.cloudinary.com/dgiqi5urn/video/upload/v1661363904/Pomodoro%20Clock/oncoming_boss_pslvpe.mp3"}>Earthbound</option>
          <option value={"https://res.cloudinary.com/dgiqi5urn/video/upload/v1661364013/Pomodoro%20Clock/razor_and_lipstick_gxa7ja.mp3"}>Mother 3</option>
          <option value={"https://res.cloudinary.com/dgiqi5urn/video/upload/v1661364197/Pomodoro%20Clock/beyond_good_and_evil_a2jof8.mp3"}>Beyond Good and Evil</option>
          <option value={"https://res.cloudinary.com/dgiqi5urn/video/upload/v1661364334/Pomodoro%20Clock/resident_evil_4_herb_zf305s.mp3"}>Resident Evil 4</option>
          <option value={"https://res.cloudinary.com/dgiqi5urn/video/upload/v1661364401/Pomodoro%20Clock/silent_hill_2_vet4at.mp3"}>Silent Hill</option>
          <option value={"https://res.cloudinary.com/dgiqi5urn/video/upload/v1661365318/Pomodoro%20Clock/dont_starve_dusk_jitjfy.mp3"}>Don't Starve</option>
        </select>
        <button className="settings-play" style={{color: toggleCounter ? "#004EC2" : "#6FA90C"}} onClick={playAlarm}><IoMdPlay /> Test Sound</button>

      </div> : null
      }
      <button className="settings-icon" style={{color: toggleCounter ? "#004EC2" : "#6FA90C"}} onClick={handleSettings} id="settings-icon" title="Settings"><AiFillSetting /></button>
      <div id="time-left">
        <audio src={dropdownOption} id="alert-audio"></audio>

      <h1 className="time-left-title" style={{color: toggleCounter ? "#004EC2" : "#6FA90C"}}>{currentTimer}</h1>
      <hr style={{color: toggleCounter ? "#004EC2" : "#6FA90C", backgroundColor: toggleCounter ? "#004EC2" : "#6FA90C"}}></hr>
      {<h1 className="time-left-timer" style={{color: toggleCounter ? "#004EC2" : "#6FA90C"}}> {currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes}:{currentSeconds < 10 ?  `0${currentSeconds}` : currentSeconds}</h1>}
      <div className="controls" style={{color: toggleCounter ? "#004EC2" : "#6FA90C"}}>
      <button onClick={handlePlay} style={{color: toggleCounter ? "#004EC2" : "#6FA90C"}} title="Play"><IoMdPlay /></button>
      <button onClick={handlePause} style={{color: toggleCounter ? "#004EC2" : "#6FA90C"}} title="Pause"><IoMdPause /></button>
      <button onClick={handleReset} style={{color: toggleCounter ? "#004EC2" : "#6FA90C"}} title="Reset"><FaUndoAlt /></button>
      <button onClick={handleSkip} style={{color: toggleCounter ? "#004EC2" : "#6FA90C"}} title="Skip" ><IoMdSkipForward /></button>
      </div>
      </div>



      </div>
      </div>

      
  );
}

export default App;
