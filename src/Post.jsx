import React from 'react';
import { Avatar } from '@material-ui/core';
import './Post.css';
const Post=({username,Imgsrc,caption})=> {
    return (
        <div className='post'  >
            <div className='post__header'>
             <Avatar className='post__avatar' alt={username} src="/static/images/avatar/1.jpg" />
             <h4 style={{paddingLeft: "3px"}} className='post__username'><strong>{username}</strong></h4>
            </div>
            <div >
               <img className='post__img'
                   src={Imgsrc}
                   alt="Img"
               />
            </div>
            <div className="post__caption">
              <h4><strong>{username}</strong> {caption}</h4>
            </div>
        </div>
    )
}

export default Post
