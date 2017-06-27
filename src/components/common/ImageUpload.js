import React from 'react'
import request from 'superagent'
import Dropzone from 'react-dropzone'

import {
  CLOUDINARY_UPLOAD_URL,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_UPLOAD_PRESET
} from '../../constants/imageUploads'

class HandleImage extends React.Component {
  constructor(){
    super()
    this.state = {
      image: ''
    }

    this.onImageDrop = files => {
      alert('After you dropped an image, image conversion will be in full swing. Please wait until your image is shown.')

      let upload = request.post(CLOUDINARY_UPLOAD_URL)
                          .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                          .field('file', files[0])
      upload.end((err, response) => {
        // console.log('error', err, 'response', response)
        if(err){
          console.error(err)
          alert(err)
        }

        if(response.body.secure_url !== ''){
          this.setState({ image: response.body.secure_url })
          this.props.changeImage(response.body.secure_url)
        }
      })
    }
  }

  render(){
    // Original part
    // Upload part
    if(this.state.image){
      return (
        <div className='row'>
          <div className='offset-lg-3 col-lg-6 offset-md-1 col-md-10 col-xs-12'>
            <img className='img-fluid' src={this.state.image} alt='Preview uploads failed.' />
          </div>
        </div>
      )
    }else{
      return (
        <div>
          {
            this.props.image ?
            <div className='row'>
              <div className='offset-lg-3 col-lg-6 offset-md-2 col-md-8 col-xs-12'>
                <img className='img-fluid' src={this.props.image} alt='Preview uploads failed.' />
              </div>
            </div>
            :
            null
          }
          <br />
          <Dropzone
            className='card text-xs-center article-preview'
            multiple={false}
            accept='image/*'
            onDrop={this.onImageDrop}>
            <div>Drop an image or click to select a file to upload.</div>
          </Dropzone>
        </div>
      )
    }
  }
}

export default HandleImage
