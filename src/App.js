import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
// import Particles from 'react-particles-js';
import './App.css'; 

 

//  (function () {
//     fetch("http://localhost:3001").then(res => res.json()). then(console.log);
//   })();
const initialState = {
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
        entries: 0
      }
    }
class App extends Component {
  constructor () {
    super();

    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries
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
    if(route === 'signout') {
      this.setState(initialState )
      console.log(initialState.isSignedIn)
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

    fetch("https://git.heroku.com/pure-basin-46445.git/imageUrl", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            input: this.state.input
          })
        })
      .then(res => res.json())
    .then(res => { 
      if(res) {
        fetch("https://git.heroku.com/pure-basin-46445.git/image", {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => [
          this.setState(Object.assign(this.state.user, {
            entries: count
          }))
        ])
      }
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
        {
          route === "home" ?
            <React.Fragment>
              <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
              <div>
                <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
                <FaceRecognition imageUrl={imageUrl} box={box} message={message}/>
              </div>
            </React.Fragment> :
            route === "signin" ?
              <React.Fragment>
                <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
                <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              </React.Fragment>
              : 
                <React.Fragment>
                  <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
                  <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                </React.Fragment>
        }
      </div>
    );
  }
}

export default App;
