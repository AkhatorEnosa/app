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
      imageUrl: ""
    }
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
    .then(
      function(res){
        console.log(res.outputs[0].data.regions[0].region_info.bounding_box)
      },
      function(err) {

      }
    )
    .catch(err => console.log(err));
  }

  render () {
    return(
      <div className="App"> 

        <Navigation/>
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
        <FaceRecognition imageUrl={this.state.imageUrl}/>

      </div>
    );
  }
}

export default App;
