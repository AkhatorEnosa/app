import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
// import Particles from 'react-particles-js';
import './App.css';

class App extends Component {
  constructor () {
    super();

    this.state = {
      input: ""
    }
  }

  onInputChange = (e) => {
    console.log(e.target.value);
  }

  onSubmit = () =>{
    console.log("Clicked");
  }

  render () {
    return(
      <div className="App"> 
      {/* <Particles 
        params={{
            polygon: {
                enable: true,
                type: 'inside',
                move: {
                    radius: 10
                },
                url: 'path/to/svg.svg'
            }
        }} /> */}

        <Navigation/>
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
        {/* <FaceRecognition /> */}
      </div>
    );
  }
}

export default App;
