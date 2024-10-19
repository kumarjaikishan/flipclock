import React, { useEffect, useState } from 'react';
import { TweenMax, Quart } from 'gsap';
import './countdown.css';
import { useLocation } from 'react-router-dom';

const FlipCountdown = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const hours = parseInt(queryParams.get('hh'));
    const minutes = parseInt(queryParams.get('mm'));
    const seconds = parseInt(queryParams.get('ss'));

    useEffect(() => {
        if (isNaN(hours)) return alert('Hours is not valid Number')
        if (isNaN(minutes)) return alert('Minutes is not valid Number')
        if (isNaN(seconds)) return alert('Second is not valid Number')

        if (minutes >= 60 || seconds >= 60) {
            alert("Minutes or seconds can't exceed 59.");
        }
    }, [])

    const [time, setTime] = useState({
        hours: isNaN(hours) || hours < 0 ? 0 : hours,
        minutes: isNaN(minutes) || minutes < 0 || minutes >= 60 ? 0 : minutes,
        seconds: isNaN(seconds) || seconds < 0 || seconds >= 60 ? 0 : seconds
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setTime((prevTime) => {
                let { hours, minutes, seconds } = prevTime;

                if (seconds > 0) {
                    seconds--;
                } else if (minutes > 0) {
                    seconds = 59;
                    minutes--;
                } else if (hours > 0) {
                    seconds = 59;
                    minutes = 59;
                    hours--;
                } else {
                    clearInterval(interval);
                }

                return { hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

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

    }, [time]);
    const [color,setcolor]= useState('black')
    const handlecolor=(e)=>{
        console.log(e.target.value)
        setcolor(e.target.value)
    }

    return (
        <div className="wrap">
            <h1><strong>Countdown</strong></h1>
            <input type="color" name="" id="" onChange={handlecolor} />
            <div className="countdown" style={{color:color}}>
                <div className="bloc-time hours" data-init-value={hours}>
                    <span className="count-title">Hours</span>
                    <div className="figure hours hours-1" >
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

                {/* First colon between hours and minutes */}
                <div className="colon">:</div>

                <div className="bloc-time min" data-init-value={minutes}>
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

                {/* Second colon between minutes and seconds */}
                <div className="colon">:</div>

                <div className="bloc-time sec" data-init-value={seconds}>
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
        </div>
    );
};

export default FlipCountdown;
