import React, { useEffect, useState } from 'react';
import { TweenMax, Quart,Elastic  } from 'gsap';
import './clock.css';
import './flipTimer.css';

const FlipClock = () => {
    const [time, setTime] = useState({
        hours: new Date().getHours() % 12 || 12,
        minutes: new Date().getMinutes(),
        seconds: new Date().getSeconds(),
        period: new Date().getHours() >= 12 ? 'PM' : 'AM'
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const hours = now.getHours();
            const period = hours >= 12 ? 'PM' : 'AM';
            const adjustedHours = hours % 12 || 12;  // Converts 0 to 12 for 12 AM, 13 to 1 for PM, etc.

            setTime({
                hours: adjustedHours,
                minutes: now.getMinutes(),
                seconds: now.getSeconds(),
                period
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

            // Update back top and bottom values
            $back_top.querySelector('span').textContent = value;
            $back_bottom.querySelector('span').textContent = value;

            // Animate top flip
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

            // Animate back top flip
            TweenMax.to($back_top, 0.8, {
                rotationX: 0,
                transformPerspective: 300,
                // ease: Quart.easeOut,
                ease: Elastic.easeOut.config(0.5, 0.3),
                clearProps: 'all'
            });
        };

        checkTime(time.hours, $hours[0], $hours[1]);
        checkTime(time.minutes, $minutes[0], $minutes[1]);
        checkTime(time.seconds, $seconds[0], $seconds[1]);

    }, [time]);

    return (
        <div className="wrap clock">
            <h1>Live <strong>Clock</strong></h1>
            <div className="countdown">
                <div className="bloc-time hours" data-init-value={time.hours}>
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

                <div className="bloc-time min" data-init-value={time.minutes}>
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

                <div className="bloc-time sec" data-init-value={time.seconds}>
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
                <div className="am-pm-indicator">
                    <span>{time.period}</span>
                </div>
            </div>
        </div>
    );
};

export default FlipClock;
