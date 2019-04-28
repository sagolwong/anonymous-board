// MessageList.js
import React, {Component} from 'react';
import Message from './Message';
import _ from 'lodash';
import axios from 'axios';

const URL = 'https://swapi.co/api/people/';

class MessageList extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      people: [] 
    };
    let app = this.props.db.database().ref('messages');
    app.on('value', snapshot => {
      this.getData(snapshot.val());
    });
  }
  
  getData(values){
    let messagesVal = values;
    let messages = _(messagesVal)
                    .keys()
                    .map(messageKey => {
                      let cloned = _.clone(messagesVal[messageKey]);
                      cloned.key = messageKey;
                      return cloned;
                    }).value();
    this.setState({
      messages: messages
    });
  }
  componentDidMount(){
    axios.get(URL)
         .then(res =>{
           this.setState({ people : res.data.results})
           console.log(res.data.results)
         })
  }

  render() {
    let name = _.map(this.state.people, people => {
      return (
        <div >
          <h2>(USER){people.name} : </h2>
        </div>
      )
    })
    let messageNodes = this.state.messages.map((message) => { 
      return (
        <div className="card">
          <div className="card-content">
          <Message 
            msgKey={message.key} 
            message = {message.message} 
            db={this.props.db}
            name={name}
            check={this.props.check}
          />
          </div>
        </div>
      )
    });

    return (
      <div>
        {messageNodes}
      </div>
    );
  }
}
export default MessageList