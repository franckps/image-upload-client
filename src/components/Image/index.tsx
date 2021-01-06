import React from 'react'
import './styles.css'
import filesize from 'filesize'

import { FiDownload, FiX } from 'react-icons/fi'

import Load from '../Load'

interface IImage {
    file: File,
    id: number,
    url: string,
    name: string,
    title: string,
    size: number,
    inUpload?: boolean,
    uploadProgress?: number
}

interface IProps {
    image: IImage,
    deleteImage(name: string): void
}

const Image: React.FC<IProps> = function(props) {
    return (
        <>
            <div className="image-item">
                <div className="image-item-container">
                    {(!props.image.inUpload) ?
                        (<a href={props.image.url} target="_blank"  rel="noopener noreferrer">
                            <div className="image" style={{backgroundImage: `url(${props.image.url})`}}></div>
                        </a>)
                        :
                        <div className="image" style={{backgroundImage: `url(${props.image.url})`}}></div>
                    }
                    
                    <div className="data">
                    <span className="name">{props.image.title}</span>
                    <span className="size">{filesize(props.image.size)}</span>
                    </div>
                    <div className="buttons">
                    {(!props.image.inUpload) ?
                        (
                            <>
                            <a href={props.image.url + '?download=true'}>
                                <div className="button">
                                    <FiDownload size="25" />
                                </div>
                            </a>
                            <button 
                                type="button" 
                                className="button"
                                onClick={() => props.deleteImage(props.image.name)}
                            >
                                <FiX size="25" color="#F00"/>
                            </button>
                            </>
                        )
                        :
                        (<></>)
                    }
                    {props.image.uploadProgress ?
                            <Load progress={props.image.uploadProgress} size={35} />
                    :
                        <></>
                    }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Image

