import React from 'react';
import './styles.css';
import axios, { AxiosResponse } from 'axios'
import Dropzone from 'react-dropzone'
import Image from '../../components/Image'
import { uniqueId } from '../../utils'

import DarkModeButton from '../DarkModeButton'

const serverIP = (process.env.REACT_APP_API_URL)? String(process.env.REACT_APP_API_URL) : 'http://10.0.2.241:3333';

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

interface MyProps {}

interface MyState {
  images: IImage[]
}

class ImageUploader extends React.Component<MyProps, MyState> {

  constructor(props: MyProps) {
    super(props);

    this.state = {
      images: [] as IImage[]
    };

    this.deleteImage = this.deleteImage.bind(this)
    this.handleUploadComplete = this.handleUploadComplete.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
    this.getImages = this.getImages.bind(this)
    this.setImages = this.setImages.bind(this)
  }

  setImages(images: IImage[]) {
    this.setState({ ...this.state, images });
  }

  async getImages() {
      let resultado: {data: IImage[]} = await axios.get(`${serverIP}/`) as {data: IImage[]};
      this.setImages(resultado.data);
  }

  async deleteImage(name: string) {
      await axios.delete(`${serverIP}/${name}`);
      let filteredImages: IImage[] = this.state.images.filter((image:IImage) => image.name !== name);
      this.setImages(filteredImages)
  }

  handleUpload(fileToUpload: IImage) {
    this.setImages([...this.state.images,
      fileToUpload
    ]);
    const formData = new FormData();
    formData.append('avatar', fileToUpload.file);
    axios.post(`${serverIP}/`, formData, {
      onUploadProgress: (prograssEvent: ProgressEvent) => {
        const { loaded, total } = prograssEvent;
        let percentual = (Number(loaded) * 100) / Number(total);
        this.setImages(this.state.images.map(element => {
          if(element.id === fileToUpload.id) {
            return {...element, uploadProgress: percentual}
          }else{
            return element
          }
        }))
      }
    }).then(this.handleUploadComplete(fileToUpload.id))
  }

  handleUploadComplete(id: number) {
    return (data: AxiosResponse) => {
      let imageData:IImage = data.data.image;
      this.setImages([
        ...this.state.images.filter(element => element.id !== id), 
        imageData
      ]);
      console.log('Data: ',data)
    }
  }

  componentDidMount() {
    this.getImages();
  }

  render(){
    const onDrop = (acceptedFiles: any) => {
      acceptedFiles.forEach((file: File) => {
        let id = uniqueId()
        this.handleUpload({
            file,
            id: id,
            url: URL.createObjectURL(file),
            name: file.name.replace(/\.[0-9a-zA-Z]{3}$/g,''),
            title: file.name.replace(/\.[0-9a-zA-Z]{3}$/g,''),
            size: file.size,
            uploadProgress: 0,
            inUpload: true
        } as IImage );
      })
    }

    return (
        <div className="container">
          <DarkModeButton htmlFor="darkMode" />

          <Dropzone accept="image/*" onDropAccepted={onDrop}>
              { ({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
                <div className="image-item upload-button" {...getRootProps()}>
                  <input {...getInputProps()} />
                    {
                      isDragActive ?
                        isDragReject ?
                          <p className="upload-reject">Tipo de arquivo não permitido ...</p> :
                          <p className="upload-accepted">Pode soltar o(s) arquivo(s) aqui ...</p> :
                        <p style={{cursor: 'pointer'}}>Arraste os arquivos para cá, ou clique aqui para realizar upload</p>
                    }
                </div>
              )}
          </Dropzone>

          { this.state.images.map((image:IImage) => 
            (
              <Image image={image} deleteImage={(name: string) => {this.deleteImage(name)}} key={image.id} />
            )
          )}

        </div>
    );
  }
}

export default ImageUploader;
