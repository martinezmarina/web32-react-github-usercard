import React from 'react';

function Followers(props) {
    console.log(props)
    return(
  <div className="followersCard">
          <h3>{props.follower}</h3>
      <img className="followerImage"src={props.followerAvatar} alt="avatar"/>
  </div>
    )
};
export default Followers