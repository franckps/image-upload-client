import React from 'react'
import './styles.css'

const Load: React.FunctionComponent<{progress: number, size?: number}> = function(props) {
    return (
        <div className="load-container" style={{width: `${props.size? props.size : 25 }px`, height: `${props.size? props.size : 25 }px`}}>
            <span className="load-progress" style={{left: `${100 - Number(props.progress)}%`}} ></span>
            <span className="load-wraper"></span>
        </div>
    );
}

export default Load