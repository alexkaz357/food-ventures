import React, { Component } from 'react';
import { connect } from 'react-redux'
import { eventBus } from '../services/event-bus-service';
import socketService from '../services/socketService';

class _Chat extends Component {

  state = {
    msg: { from: this.props.user.userName, txt: '', isChef: '', sendTime: '' },
    msgs: [],
    userTyping: ''
  };

  elInput = React.createRef()

  timeout

  componentDidMount() {
    socketService.setup();
    socketService.emit('chat topic', this.props.chef._id);
    socketService.on('chat addMsg', this.addMsg);
    socketService.on('user typing', this.addUserTyping);
    socketService.on('reset', this.resetUserTyping);
    socketService.emit('get msgs');
    socketService.on('send msgs', msgs => {
      this.setState({ msgs })
    });
    this.addMsg(this.state.msgs)
    this.elInput.current.focus()
    document.body.style.overflow = "hidden"
  }

  componentWillUnmount() {
    // socketService.off('chat addMsg', this.addMsg);
    socketService.terminate();
    this.setState({ userTyping: '' })
    document.body.style.overflow = "auto"
  }

  addMsg = newMsg => {
    this.setState({ msgs: newMsg });
  };

  sendMsg = ev => {
    ev.preventDefault();
    socketService.emit('chat newMsg', this.state.msg);
    this.setState({ msg: { from: this.props.user.userName, txt: '' } });
    socketService.emit('notification');
  };

  msgHandleChange = ev => {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => socketService.emit('reset typing', ''), 500);
    socketService.emit('typing', this.props.user.userName)
    const { name, value } = ev.target;
    let isChef;
    if (!this.props.user.chef) isChef = false;
    else if (Object.keys(this.props.user.chef).length !== 0) isChef = true;
    this.setState(prevState => {
      return {
        msg: { ...prevState.msg, [name]: value, sendTime: this.time(), isChef }
      };
    });
  };

  addUserTyping = user => {
    this.setState({ userTyping: user })
  }

  resetUserTyping = reset => {
    this.setState({ userTyping: reset })
  }

  getTime(time) {
    var options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    };
    return new Intl.DateTimeFormat('us', options).format(time);
  }

  formatDate = (time) => {
    var options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    };
    return new Intl.DateTimeFormat('us', options).format(time);
  }

  time = () => {
    let now = Date.now()
    return this.getTime(now)
  }

  toggleChat = () => {
    eventBus.emit('toggle-chat')
  }

  render() {

    const { fullName } = this.props.chef

    return (
      <div className="chat">

        <div className="chat-container">

          <div className="chat-header">
            <h3>{this.props.user.chef ? 'Welcome' : 'Contact'} {fullName}</h3>
            <span className="close-chat-btn" onClick={this.toggleChat}>&times;</span>
          </div>

          <div className="msgs">
            <p className="timestamp">{this.formatDate(Date.now())}</p>
            {this.state.msgs.map((msg, idx) => (
              <div key={idx}>
                <p className={msg.isChef ? 'chef' : 'user'}><span>{msg.from}</span> : {msg.txt}</p>
                <p className={`time ${msg.isChef ? 'chef' : 'user'}`}>{msg.sendTime}</p>
              </div>
            ))}
          </div>

          <div className="chat-footer">
            <form onSubmit={this.sendMsg}>
              <input type="text" value={this.state.msg.txt} onChange={this.msgHandleChange} name="txt" autoComplete="off" ref={this.elInput} />
              <button>Send</button>
              {this.state.userTyping && <p className="typing">{this.state.userTyping} is typing</p>}
            </form>
          </div>

        </div>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.loggedInUser
  }
}

export const Chat = connect(mapStateToProps)(_Chat)