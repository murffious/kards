import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import LockOutline from "@material-ui/icons/LockOutline";
import People from "@material-ui/icons/People";
// core components
import Header from "./login/components/Header/Header.jsx";
import HeaderLinks from "./login/components/Header/HeaderLinks.jsx";
import Footer from "./login/components/Footer/Footer.jsx";
import GridContainer from "./login/components/Grid/GridContainer.jsx";
import GridItem from "./login/components/Grid/GridItem.jsx";
import Button from "./login/components/CustomButtons/Button.jsx";
import Card from "./login/components/Card/Card.jsx";
import CardBody from "./login/components/Card/CardBody.jsx";
import CardHeader from "./login/components/Card/CardHeader.jsx";
import CardFooter from "./login/components/Card/CardFooter.jsx";
import CustomInput from "./login/components/CustomInput/CustomInput.jsx";

import loginPageStyle from "./login/loginPage.jsx";

import image from "./login/assets/bg7.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  fab,
  faTwitter,
  faFacebookSquare,
  faGooglePlusG
} from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
// import { Route, Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

library.add(fab, faTwitter, faFacebookSquare, faGooglePlusG);
class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      user: null,
      // we use this to make the card to appear after the page has been rendered
      cardAnimaton: "cardHidden",
      username: "",
      password: "",
      redirectTo: null
    };
    this._logout = this._logout.bind(this);
    this._login = this._login.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
    // auth
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

  _login(username, password) {
    axios
      .post("/auth/login", {
        username,
        password
      })
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          // update the state
          this.setState({
            loggedIn: true,
            user: response.data.user
          });
        }
      });
  }
  _logout(event) {
    event.preventDefault();
    console.log("logging out");
    axios.post("/auth/logout").then(response => {
      console.log(response.data);
      if (response.status === 200) {
        this.setState({
          loggedIn: false,
          user: null
        });
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("handleSubmit");
    this._login(this.state.username, this.state.password);
    this.setState({
      redirectTo: "/"
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const { classes, ...rest } = this.props;
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <div>
          <Header
            absolute
            color="transparent"
            brand="Material Kit React"
            rightLinks={<HeaderLinks />}
            {...rest}
          />
          <div
            className={classes.pageHeader}
            style={{
              backgroundImage: "url(" + image + ")",
              backgroundSize: "cover",
              backgroundPosition: "top center"
            }}
          >
            <div className={classes.container}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={4}>
                  <Card className={classes[this.state.cardAnimaton]}>
                    <form className={classes.form}>
                      <CardHeader
                        color="primary"
                        className={classes.cardHeader}
                      >
                        <h4>Login</h4>
                        <div className={classes.socialLine}>
                          <Button
                            justIcon
                            href="#pablo"
                            target="_blank"
                            color="transparent"
                            onClick={e => e.preventDefault()}
                          >
                            <FontAwesomeIcon
                              size="sm"
                              icon={["fab", "twitter"]}
                            />
                          </Button>
                          <Button
                            justIcon
                            href="#pablo"
                            target="_blank"
                            color="transparent"
                            onClick={e => e.preventDefault()}
                          >
                            {/* <i className={"fab fa-facebook"} /> */}
                            <FontAwesomeIcon
                              size="sm"
                              icon={["fab", "facebook-square"]}
                            />
                          </Button>
                          <Button
                            justIcon
                            href="#pablo"
                            target="_blank"
                            color="transparent"
                            onClick={e => e.preventDefault()}
                          >
                            <FontAwesomeIcon
                              size="sm"
                              icon={["fab", "google-plus-g"]}
                            />
                            {/* <i className={"fab fa-google-plus-g"} /> */}
                          </Button>
                        </div>
                      </CardHeader>
                      <p className={classes.divider}>Or Be Classical</p>
                      <CardBody>
                        <CustomInput
                          labelText="User Name..."
                          id="first"
                          name="username"
                          value={this.state.username}
                          onChange={this.handleChange}
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: "text",
                            endAdornment: (
                              <InputAdornment position="end">
                                <People className={classes.inputIconsColor} />
                              </InputAdornment>
                            )
                          }}
                        />
                        {/* <CustomInput
                          labelText="Email..."
                          id="email"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: "email",
                            endAdornment: (
                              <InputAdornment position="end">
                                <Email className={classes.inputIconsColor} />
                              </InputAdornment>
                            )
                          }}
                        /> */}
                        <CustomInput
                          labelText="Password"
                          id="pass"
                          name="password"
                          value={this.state.password}
                          onChange={this.handleChange}
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: "password",
                            endAdornment: (
                              <InputAdornment position="end">
                                <LockOutline
                                  className={classes.inputIconsColor}
                                />
                              </InputAdornment>
                            )
                          }}
                        />
                      </CardBody>
                      <CardFooter className={classes.cardFooter}>
                        <Button
                          onClick={this.handleSubmit}
                          simple
                          color="primary"
                          size="lg"
                        >
                          Get started
                        </Button>
                      </CardFooter>
                    </form>
                  </Card>
                </GridItem>
              </GridContainer>
            </div>
            <Footer whiteFont />
          </div>
        </div>
      );
    }
  }
}

export default withStyles(loginPageStyle)(LoginPage);
