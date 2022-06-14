import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
// import Particles from 'react-particles-js';
import './App.css';

const app = new Clarifai.App({
  apiKey: 'f7a7eaa7139c41edae3fbfaddd32739a'
 });

class App extends Component {
  constructor () {
    super();

    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      message: ""
    }
  }

  calculateFaceLocation = (data) => {
    const region = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: region.left_col * width,
      topRow: region.top_row * height,
      rightCol: width - (region.right_col * width),
      bottomRow: height - (region.bottom_row * height)
    }
  }

  displayRegion = (box) => {
    this.setState({
      box: box
    });

    console.log(box);
  }

  onInputChange = (e) => {
    this.state.input = e.target.value
    console.log(this.state.input);
  }

  onSubmit = () =>{
    this.setState({
      imageUrl: this.state.input
    })

    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
    .then(res => { 
       this.displayRegion(this.calculateFaceLocation(res));
       this.setState({
         message: "Face found!"
       })
    })
    .catch(err => {
      console.log("ERROR: ", err);
      this.setState({
        message: "No face recognised!"
      })
    });
  }

  render () {
    return(
      <div className="App"> 

        <Navigation/>
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
        <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box} message={this.state.message}/>

      </div>
    );
  }
}

export default App;
