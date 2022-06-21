import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
// import Particles from 'react-particles-js';
import './App.css';

const app = new Clarifai.App({
  apiKey: 'f7a7eaa7139c41edae3fbfaddd32739a'
 });

 

//  (function () {
//     fetch("http://localhost:3001").then(res => res.json()). then(console.log);
//   })();

class App extends Component {
  constructor () {
    super();

    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      message: "",
      route: "signin",
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        entries: ""
      }
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email
      }
    })
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

  onRouteChange = (route) => {
    if(route === 'signin') {
      this.setState({
        isSignedIn: false
      })
    } else if(route === 'home') {
      this.setState({
        isSignedIn: true
      })
    }
    this.setState({
      route: route
    })
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
    const { isSignedIn, box, route,imageUrl, message } = this.state;

    return(
      <div className="App"> 

        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        { route === "signin"
          ?<SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          : route === "register"
          ?<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          :<div>
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
            <FaceRecognition imageUrl={imageUrl} box={box} message={message}/>
          </div>
        }
      </div>
    );
  }
}

export default App;
