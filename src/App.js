// App.js
import React, { Component } from 'react';
import './App.css';
import Header from '../src/components/Header';
import MessageList from './components/MessageList';
import MessageBox from './components/MessageBox';
import firebase from 'firebase';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';


const URL = 'https://swapi.co/api/people/';

class App extends Component {
  constructor(props){
  super(props);
  var config = {
    apiKey: "AIzaSyBV192Df9q_x2POf70aNheD2Kg4VMjKeZ0",
    authDomain: "react-encrypt-board.firebaseapp.com",
    databaseURL: "https://react-encrypt-board.firebaseio.com",
    projectId: "react-encrypt-board",
    storageBucket: "react-encrypt-board.appspot.com",
    messagingSenderId: "421884945197"
  };
  firebase.initializeApp(config);
}
// The component's Local state.
state = {
  isSignedIn: false // Local signed-in state.
};
// Configure FirebaseUI.
uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google , Facebook , Etc as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccess: () => false
  }
};
componentDidMount() {
  this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => this.setState({isSignedIn: !!user})
  );
}

// Make sure we un-register Firebase observers when the component unmounts.
componentWillUnmount() {
  this.unregisterAuthObserver();
}




render() {
  if (!this.state.isSignedIn) {
    return (
      <div className="container">
      <Header title="Encrypt Board" />
      <div>
        <br></br>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
        <br></br>
      </div>
      <div className="columns">
        <div className="column is-3"></div>
        <div className="column is-6">
        </div>
      </div>
      <div className="columns">
        <div className="column is-3"></div>
        <div className="column is-6">
          <MessageList db={firebase}
                       check={this.state.isSignedIn}
          />
        
        </div>
      </div>
    </div>
    );
  }
  return (
    <div className="container">
      <Header title="Encrypt Board" />
      
      <div>
        <br></br>
        <h>Welcome ...</h>
        <br></br>
        <h>{firebase.auth().currentUser.displayName}!</h>
        <br></br>
        <img id="photo" className="pic" src={firebase.auth().currentUser.photoURL}/>
        <br></br>
        <button onClick={() => firebase.auth().signOut()}>Sign-out</button>
      </div>
      <br></br>
      
      <div className="columns">
        <div className="column is-3"></div>
        <div className="column is-6">
          <MessageBox db={firebase}
                      name={firebase.auth().currentUser.displayName}
          />
        </div>
      </div>
      <div className="columns">
        <div className="column is-3"></div>
        <div className="column is-6">
          <MessageList db={firebase}
                       check={this.state.isSignedIn}
          />
        </div>
      </div>
      </div>
      
      
  );
 }
}
export default App;