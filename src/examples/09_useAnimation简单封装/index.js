
import React, { useEffect, useState } from 'react'

import './index.scss'

const useAnimation = (_clsName, duration = 300) => {
    const [phase, setPhase] = useState(0);
    const [className, setClassName] = useState(_clsName);
    const play = () => setPhase(1);
    useEffect(() => {
        if (phase === 1) {
            setClassName(`${_clsName} ${className}-start`);
            setTimeout(() => {
                setClassName(`${_clsName} ${className}-end`);
                setTimeout(() => {
                    setClassName(_clsName);
                    setPhase(0);
                });
            }, duration);
        }
    }, [phase]);
    return [className, play];
};

export default () => {
    const [className, playAnimation] = useAnimation('box');
    return (
        <div>
            <div className={className}/>
            <button onClick={playAnimation}>play</button>
        </div>
    );
}
