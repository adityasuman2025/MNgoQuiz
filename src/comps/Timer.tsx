import { useState, useRef, useEffect } from 'react';
import { secondsToMMSS } from '../utils';
import TimerIcon from '../imgs/timer.svg';

export default function Timer() {
    const timerRef = useRef<any>(null);

    const [timer, setTimer] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    useEffect(() => {
        return () => clearInterval(timerRef.current);
    }, []);

    function handleTimerClick() {
        if (isTimerRunning) clearInterval(timerRef.current); // pause timer
        else { // start timer            
            timerRef.current = setInterval(() => {
                setTimer(prev => prev + 1)
            }, 1000);
        }

        setIsTimerRunning(prev => !prev);
    }

    return (
        <div className='mngo-flex mngo-items-center mngo-justify-end'>
            <button className='mngo-cursor-pointer mngo-bg-white mngo-px-4 mngo-py-2 mngo-rounded-lg' onClick={handleTimerClick}>
                {isTimerRunning ? "Pause" : "Start"}
            </button>

            <div
                className='mngo-ml-6 mngo-flex mngo-items-center mngo-px-5 mngo-py-1.5 mngo-shadow-lg mngo-rounded-2xl'
                style={{ background: "var(--burning_sky_dark)" }}
            >
                <img src={TimerIcon} className='mngo-quiz-icon' alt="timer icon" width={30} height={30} />

                <div className='mngo-ml-1.5 mngo-text-white mngo-text-2xl mngo-font-bold'>
                    {secondsToMMSS(timer)}
                </div>
            </div>
        </div>
    )
}