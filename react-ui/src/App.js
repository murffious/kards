import React, { Component } from 'react';
import './App.css';
import MiniDrawer from "./components/AppBar";
import LoginPage from './components/LoginPage';

 

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      fetching: true,
      // Set to false when AUTH is hookedup lol
      auth: true
    };
  }

  componentDidMount() {
    fetch('/api')
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        this.setState({
          message: json.message,
          fetching: false
        });
      }).catch(e => {
        this.setState({
          message: `API call failed: ${e}`,
          fetching: false
        });
      })
  }

  render() {
    return (
      <div className="App">
      
        {this.state.auth? <MiniDrawer />: <LoginPage />}
        {/* add login redirect */}
        <p className="App-intro">
          {'This is '}
          <a href="https://github.com/mars/heroku-cra-node">
            {'create-react-app with a custom Node/Express server'}
          </a><br/>
        </p>
        <p className="App-intro">
          {this.state.fetching
            ? 'Fetching message from API'
            : this.state.message}
        </p>
     
    
      </div>
    );
  }
}

export default App;
