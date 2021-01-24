import React from "react";
import Post from "./Post";
import { useState , useEffect } from 'react';
import {Authorization} from './Authorization';
import {db} from './firebase';
import UploadPost from './UploadPost';
const App=()=>{
  const [posts, setPost] = useState([])
  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot=>{
      setPost(snapshot.docs.map(doc=>({id:doc.id, post:doc.data()})));
   
    })
   }, [])
    return(
        <>   
        <div className="app">
        <UploadPost/>
          <div className='header'>
            <img className='header__logo'
                src="https://www.vectorlogo.zone/logos/instagram/instagram-wordmark.svg"
                alt="logo"
          />
          <div className="App__register">
                 <Authorization/>
          </div>
          </div>
          {
                       posts.map( ({id,post})=>{
                        return(
                             <Post
                              key={id}
                               username={post.username}
                                Imgsrc={post.Imgsrc}
                                caption={post.caption}
                             />)
                        })
                  }
 
        </div>
        </>
    )
}

export default App;
