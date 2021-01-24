import { Button } from '@material-ui/core';
import React , { useState } from 'react';
 import { db, storage } from './firebase';
 import firebase from 'firebase';

function UploadPost() {
    const [caption, setCaption] = useState('');
    const [progress, setProgress] = useState('');
    const [img, setImg] = useState('');

    //image select
   const imgSelect=(event)=>{
    if(event.target.files[0]) {
        setImg(event.target.files[0]);
    }      
   }

    //image upload
    const postUpload=()=>{  
        const uploadTask =storage.ref(`images/${img.name}`).put(img);

        uploadTask.on(
            "state_changed",
          (snapshot) =>  {    
              //progress function...
              const progress=Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes)*100
              );
              setProgress(progress);
          },
          (error)=>{
              //Error Function
              console.log(error);
              alert(error.message)        
          },
          ()=>{
              //complete Function
              storage
              .ref("images")
              .child(img.name)
              .getDownloadURL()
              .then(url=>{
                  //upload post inside the db
                  db.collection("posts").add({
                      timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                      caption: caption,
                       Imgsrc : url, 
                  });
                  setProgress(0);
                  setCaption('');
                  setImg(null);
              })

          }
        )     
    }
     
    return (
        <div>
            <input type='test' placeholder="Enter a caption..."   onChange={(e)=>setCaption(e.target.value)}/>
            <input type='file' onChange={imgSelect} />
            <Button onClick={postUpload}>Upload</Button>
        </div>
    )
}

export default UploadPost
