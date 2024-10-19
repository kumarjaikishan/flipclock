import React, { useEffect, useState } from 'react';
import { TweenMax, Quart } from 'gsap';
import './countdown.css';
import './timer.css';

const Timer = () => {
    const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTime(prevTime => {
                    let { hours, minutes, seconds, milliseconds } = prevTime;
                    milliseconds += 10; // Increment milliseconds by 10
                    if (milliseconds >= 1000) {
                        milliseconds = 0; // Reset milliseconds
                        seconds++; // Increment seconds
                    }
                    if (seconds >= 60) {
                        seconds = 0; // Reset seconds
                        minutes++; // Increment minutes
                    }
                    if (minutes >= 60) {
                        minutes = 0; // Reset minutes
                        hours++; // Increment hours
                    }
                    return { hours, minutes, seconds, milliseconds };
                });
            }, 10);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    useEffect(() => {
        const $hours = document.querySelectorAll('.bloc-time.hours .figure');
        const $minutes = document.querySelectorAll('.bloc-time.min .figure');
        const $seconds = document.querySelectorAll('.bloc-time.sec .figure');

        const checkTime = (value, $el_1, $el_2) => {
            const valStr = value.toString().padStart(2, '0');
            const val_1 = valStr.charAt(0);
            const val_2 = valStr.charAt(1);
            const fig_1_value = $el_1.querySelector('.top').textContent;
            const fig_2_value = $el_2.querySelector('.top').textContent;
            if (fig_1_value !== val_1) animateFigure($el_1, val_1);
            if (fig_2_value !== val_2) animateFigure($el_2, val_2);
        };

        const animateFigure = ($el, value) => {
            const $top = $el.querySelector('.top');
            const $bottom = $el.querySelector('.bottom');
            const $back_top = $el.querySelector('.top-back');
            const $back_bottom = $el.querySelector('.bottom-back');
            $back_top.querySelector('span').textContent = value;
            $back_bottom.querySelector('span').textContent = value;
            TweenMax.to($top, 0.8, {
                rotationX: '-180deg',
                transformPerspective: 300,
                ease: Quart.easeOut,
                onComplete: function () {
                    $top.textContent = value;
                    $bottom.textContent = value;
                    TweenMax.set($top, { rotationX: 0 });
                }
            });
            TweenMax.to($back_top, 0.8, {
                rotationX: 0,
                transformPerspective: 300,
                ease: Quart.easeOut,
                clearProps: 'all'
            });
        };

        checkTime(time.hours, $hours[0], $hours[1]);
        checkTime(time.minutes, $minutes[0], $minutes[1]);
        checkTime(time.seconds, $seconds[0], $seconds[1]);
    }, [time.hours, time.minutes, time.seconds]);

    const handleStartStop = () => {
        setIsRunning(prevState => !prevState);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTime({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
    };

    return (
        <div className="wrap timer">
            <div className="btn">
                <button onClick={handleStartStop}>{isRunning ? 'Stop' : 'Start'}</button>
                <button onClick={handleReset}>Reset</button>
            </div>
            <h1><strong>Timer</strong></h1>
            <div className="countdown">
                <div className="bloc-time hours">
                    <span className="count-title">Hours</span>
                    <div className="figure hours hours-1">
                        <span className="top">0</span>
                        <span className="top-back"><span>0</span></span>
                        <span className="bottom">0</span>
                        <span className="bottom-back"><span>0</span></span>
                    </div>
                    <div className="figure hours hours-2">
                        <span className="top">0</span>
                        <span className="top-back"><span>0</span></span>
                        <span className="bottom">0</span>
                        <span className="bottom-back"><span>0</span></span>
                    </div>
                </div>
                <div className="colon">:</div>
                <div className="bloc-time min">
                    <span className="count-title">Minutes</span>
                    <div className="figure min min-1">
                        <span className="top">0</span>
                        <span className="top-back"><span>0</span></span>
                        <span className="bottom">0</span>
                        <span className="bottom-back"><span>0</span></span>
                    </div>
                    <div className="figure min min-2">
                        <span className="top">0</span>
                        <span className="top-back"><span>0</span></span>
                        <span className="bottom">0</span>
                        <span className="bottom-back"><span>0</span></span>
                    </div>
                </div>
                <div className="colon">:</div>
                <div className="bloc-time sec">
                    <span className="count-title">Seconds</span>
                    <div className="figure sec sec-1">
                        <span className="top">0</span>
                        <span className="top-back"><span>0</span></span>
                        <span className="bottom">0</span>
                        <span className="bottom-back"><span>0</span></span>
                    </div>
                    <div className="figure sec sec-2">
                        <span className="top">0</span>
                        <span className="top-back"><span>0</span></span>
                        <span className="bottom">0</span>
                        <span className="bottom-back"><span>0</span></span>
                    </div>
                </div>
            </div>
            <div className="milliseconds">
                <span className="count-title">Milliseconds</span>
                <br />
                <span className='mscount'>{time.milliseconds.toString().padStart(3, '0')}</span>
            </div>
        </div>
    );
};

export default Timer;
