import React, { Component } from 'react';
import axios from "axios";
import Followers from "./Followers"



class App extends Component {
  state = {
    account: "martinezmarina",
    user: [],
    followers: []
  };

  componentDidMount() {
    axios.get(`https://api.github.com/users/${this.state.account}`)
      
    .then(res => {
      console.log(res.data)
        this.setState({ 
          user: res.data 
        });

        axios.get(`https://api.github.com/users/${this.state.account}/followers`)
          .then(res => {
            console.log(res.data)
            this.setState({ 
              followers: res.data 
            });
          });
      })
      .catch(err => {
        console.log("Cannot Find User");
      });
  }
  // componentDidUpdate(prevProps, prevState) {
  //   if(this.state.account !=== prevState.account){
  //     axios.get()
  //   }
  
  // }
handleChanges = e => {
  this.setState({
    account: e.target.value
  })
}
getNewUser = e => {
  e.preventDefault()
  axios.get(`https://api.github.com/users/${this.state.account}`)
      
  .then(res => {
    console.log(res.data)
      this.setState({ 
        user: res.data 
      });

      axios.get(`https://api.github.com/users/${this.state.account}/followers`)
        .then(res => {
          console.log(res.data)
          this.setState({ 
            followers: res.data 
          });
        });
    })
    .catch(err => {
      console.log("Cannot Find User");
    });
}

  render() {
    return (
      <div className="App">
        <header>
        <h1>Github Users</h1>
        <div>

          <input
            placeholder="Search Username"
            name="username"
            value={this.state.username}
            type="text"
            onChange={this.handleChanges}
          />
          <button onClick={this.getNewUser}>Search</button>

      </div>
        </header>
        <div className="UserCard">
          <div className="UserTitle">
          <h2>{this.state.user.name}</h2>
          <img className="UserImage"src={this.state.user.avatar_url} alt="avatar"/>
          </div >
          <div className="UserInfo">
          <p>Username: {this.state.user.login}</p>
          <p>Location: {this.state.user.location}</p>
          <p>
              Profile:
              <a href={this.state.user.html_url}> {this.state.user.html_url}</a>
          </p>
          <p>Bio: {this.state.user.bio}</p>
          </div>
        </div>
        <h2>Followers:</h2>
        <div className="followersContainer">
        {this.state.followers.map(follower => (
        <Followers follower={follower.login} key={follower.id} followerAvatar={follower.avatar_url} />
      ))}
      </div>
      </div>
    );
  }
}

export default App;
