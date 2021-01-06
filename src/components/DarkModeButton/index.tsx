import React from 'react'
import './styles.css'

const Load: React.FunctionComponent<{htmlFor: string}> = function(props) {
    return (
        <div className="dark-mode-button-container">
            <label htmlFor={props.htmlFor} style={{ color: 'var(--secundary02)' }} >Dark mode</label>
            <label htmlFor={props.htmlFor} className="dark-mode-button">
                <span className="dark-mode-button-decoration"/>
            </label>
        </div>
    );
}

export default Load