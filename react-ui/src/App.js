import React, { Component } from 'react';
import './App.css';
import MiniDrawer from "./components/AppBar";
import LoginPage from './components/LoginPage';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AppBar from './components/AppBar';
import ContentContainer from './containers/ContentContainer';
import axios from "axios";

 

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      fetching: true,
      // Set to false when AUTH is hookedup lol
      auth: true,
      loggedIn: false
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
      // axios.get("/auth/user").then(response => {
      //   console.log(response.data);
      //   if (!!response.data.user) {
      //     console.log("THERE IS A USER");
      //     this.setState({
      //       loggedIn: true,
      //       user: response.data.user
      //     });
      //   } else {
      //     this.setState({
      //       loggedIn: false,
      //       user: null
      //     });
      //   }
      // });
    
  
  }

  render() {
    return (
      <div className="App">
          
      
        <Router >
          <div>
            {/* loggedIn={this.state.loggedIn}  */}
        
          <Route path="/" component={AppBar} />
        </div>
       </Router>
     
       
       
  
       {/* <Router >
       <div><Route exact path="/login" component={LoginPage}/> </div>   
       </Router> */}
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
