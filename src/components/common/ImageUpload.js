import React from 'react'
import request from 'superagent'
import Dropzone from 'react-dropzone'

const CLOUDINARY_UPLOAD_PRESET = 'unimemo-dfd94'
const CLOUDINARY_UPLOAD_URL = 'https://res.cloudinary.com/unimemo-dfd94/image/upload'

class ImageUpload extends React.Component {
  constructor(){
    super()

    this.state = {
      uploadedFileCloudinaryUrl: ''
    }

    this.handleImageUpload = file => {
      let upload = request.post(CLOUDINARY_UPLOAD_URL)
                          .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                          .field('file', file)
      upload.end((err, response) => {
        if(err){
          console.error(err)
          alert(err)
        }
        if(response){
          console.log(response)
        }
        // if(response.body.secure_url !== ''){
        //   this.setState({
        //     uploadedFileCloudinaryUrl: response.body.secure_url
        //   })
        //
        //   this.props.changeImage(response.body.secure_url)
        // }
      })
    }

    this.onImageDrop = files => {
      this.setState({ uploadedFile: files[0] })
      this.handleImageUpload(files[0])
    }
  }

  render(){
    return (
      <div>
        <Dropzone
          multiple={false}
          accept='image/*'
          onDrop={this.onImageDrop} />

      {
        this.state.uploadedFileCloudinaryUrl ?
        <div>
          <image src={this.state.uploadedFileCloudinaryUrl} />
          <p>{this.state.uploadedFile.name}</p>
        </div>
        : null
      }
      </div>
    )
  }
}

export default ImageUpload
