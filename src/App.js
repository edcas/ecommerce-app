import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile/Profile";
import { ProfileForm } from "./components/Profile/ProfileForm";
import Cart from "./components/Cart/Cart";
import ProductList from "./components/Product/ProductList";
import Header from "./components/Header";
import Container from "react-bootstrap/Container";
import Auth from "./components/Auth/Auth";
import Callback from "./components/Auth/Callback";
import Public from "./Public";
import Private from "./Private";
import Courses from "./Courses";

class App extends Component {
  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history);
  }

  render() {
    return (
      <>
        <Header auth={this.auth} />
        <Container fluid="true">
          <Route
            path="/"
            exact
            render={props => <Home auth={this.auth} {...props} />}
          />
          <Route
            path="/callback"
            render={props => <Callback auth={this.auth} {...props} />}
          />
          <Route
            path="/profile"
            exact
            render={props =>
              this.auth.isAuthenticated() ? (
                <Profile auth={this.auth} {...props} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/profile/edit"
            render={props =>
              this.auth.isAuthenticated() ? (
                <ProfileForm auth={this.auth} {...props} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route path="/products" component={ProductList} />
          <Route path="/cart" component={Cart} />
          <Route path="/public" component={Public} />
          <Route
            path="/private"
            render={props =>
              this.auth.isAuthenticated() ? (
                <Private auth={this.auth} {...props} />
              ) : (
                this.auth.login()
              )
            }
          />
          <Route
            path="/courses"
            render={props =>
              this.auth.isAuthenticated() &&
              this.auth.userHasScopes(["read:courses"]) ? (
                <Courses auth={this.auth} {...props} />
              ) : (
                this.auth.login()
              )
            }
          />
        </Container>
      </>
    );
  }
}

export default App;
