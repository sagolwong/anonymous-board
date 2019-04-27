// App.js
import React, { Component } from 'react';
import Header from '../src/components/Header';
import MessageList from './components/MessageList';
import MessageBox from './components/MessageBox';
import firebase from 'firebase';
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
render() {
  return (
    <div className="container">
      <Header title="Encrypt Board" />
      <div className="columns">
        <div className="column is-3"></div>
        <div className="column is-6">
          <MessageBox db={firebase} />
        </div>
      </div>
      <div className="columns">
        <div className="column is-3"></div>
        <div className="column is-6">
          <MessageList db={firebase} />
        </div>
      </div>
    </div>
  );
 }
}
export default App;