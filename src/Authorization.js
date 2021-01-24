import React ,{ useState , useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import {  auth } from "./firebase";

//style of modal
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
//styling End

//begin of Funcation component
function Authorization(){
    const classes = useStyles();
    //useStates
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] =useState(false);
    const [openSignIn, setOpenSignIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [user, setUser] = useState(null);
   console.log(user );
    //modal sign up button
    const register=(event)=>{
      event.preventDefault();
       auth
       .createUserWithEmailAndPassword(email,password)
       .then((authUser)=>{
         return authUser.user.updateProfile ({ 
           displayName: username,
         })
       })
       .catch((error)=>alert(error.message));
       setOpen(false);
      
    }

       //modal Sign In 
       const SignIn=(event )=>{
         event.preventDefault();
         auth
         .signInWithEmailAndPassword(email,password)
         .catch((error)=>alert(error.message))
         setOpenSignIn(false);
       }
      //when any user authantication done
      useEffect(() => {
        const unSubscribe= auth.onAuthStateChanged((authUser)=>{
          console.log(authUser)
            if(authUser){
                setUser(authUser)
            
            }
            else{
             setUser(null);
            }
          })
          return()=>{
            unSubscribe();
          }
      }, [user,username])

return(
    <>
        
       <div>
      
        {
         user?(
          <Button  onClick={()=>auth.signOut()}> Log Out</Button>
         )
         :(
           <div className="Authorixation__login">
           <Button onClick={()=>setOpen(true)}>Sign Up</Button> 
           <Button onClick={()=>setOpenSignIn(true)}>Sign In</Button>

          </div>
         )
       } 
      {/* Sign Up Modal */}
      <Modal
            open={open}
            onClose={()=>{setOpen(false)}}
         >
        {
          <div style={modalStyle} className={classes.paper}>
                <center>
                <img className='header__logo'
                src="https://www.vectorlogo.zone/logos/instagram/instagram-wordmark.svg"
                alt="logo"
                  />
                </center>
               <div >
                  <form className='app__SignUp'>
                  <FormControl>
                    <InputLabel >Enter a username</InputLabel>
                    <Input type='text'  value={username} onChange={(e)=>setUsername(e.target.value)} />     
                  </FormControl>
                  <FormControl>
                    <InputLabel >Enter a email</InputLabel>
                    <Input  type='email' value={email}  onChange={(e)=>setEmail(e.target.value)}/>
                  </FormControl>
                  <FormControl>
                    <InputLabel >Enter a password</InputLabel>
                    <Input  type='text' value={password} onChange={(e)=>setPassword(e.target.value)} />
                  </FormControl>
                  
                  <Button onClick={register} type="submit"  >Sign Up</Button>
                  </form>
               </div>
            </div>
        }
      </Modal>

      {/* Sign In Modal */}
     <Modal
            open={openSignIn}
            onClose={()=>{setOpenSignIn(false)}}
         >
        {
          <div style={modalStyle} className={classes.paper}>
                <center>
                <img className='header__logo'
                src="https://www.vectorlogo.zone/logos/instagram/instagram-wordmark.svg"
                alt="logo"
                  />
                </center>
               <div >
                  <form className='app__SignUp'>
              
                  <FormControl>
                    <InputLabel >Enter a email</InputLabel>
                    <Input  type='email' value={email}  onChange={(e)=>setEmail(e.target.value)}/>
                  </FormControl>
                  <FormControl>
                    <InputLabel >Enter a password</InputLabel>
                    <Input  type='text' value={password} onChange={(e)=>setPassword(e.target.value)} />
                  </FormControl>
                  
                  <Button onClick={SignIn} type="submit"  >Sign In</Button>
                  </form>
               </div>
            </div>
        }
      </Modal> 
    </div>
    </>
)
}

export {Authorization };