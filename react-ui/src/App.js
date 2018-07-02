import React, { Component } from 'react';
import './App.css';
import MiniDrawer from "./components/AppBar";
import LoginPage from './components/LoginPage';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Dashboard from './components/dashboard/src/views/Dashboard/Dashboard.jsx';
 

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      fetching: true
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
      <Dashboard />
        {/* <MiniDrawer /> */}
        {/* <LoginPage /> */}
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
        <Router>
    <div>
      {/* <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/topics">Topics</Link>
        </li>
      </ul>

      <hr /> */}

      {/* <Route exact path="/" component={LoginPage} /> */}
      {/* <Route path="/about" component={About} />
      <Route path="/topics" component={Topics} /> */}
    </div>
  </Router>
        <div>
   
  </div>      
    
      </div>
    );
  }
}

export default App;
