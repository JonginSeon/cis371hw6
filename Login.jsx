import React, {Component} from "react";
import { AppAUTH } from './db-init.js'
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import './Login.css';
class Login extends Component {
   constructor(props){
       super(props);
       this.state = {
           userEmail: "",
           userPassword: ""
       }
   }
   render(){
       return(
  

           <div>
               
               <h2 class="header">Login Page</h2>
           <div class="LoginBlock">
               <label class="email">Email</label>
               <input class="emailInput" type="text" name="userEmail" value={ this.state.userEmail } onChange={(e) => this.updateFormData(e)}/>
               <br></br><br></br>
               <label class="pass">Password</label>
               <input class="passInput"type="password" name="userPassword" value={ this.state.userPassword } onChange={(e) => this.updateFormData(e)}/>
                <br></br><br></br>
               <div class="Buttons">
                   
                   <button class="primary" onClick={() => this.doSignUp()}>Sign Up</button>
                   
                   <button class="primary" onClick={() => this.doSignIn()}>Sign In</button>
               </div>
           </div>
           </div>
       )
   }
   updateFormData(ev){
       this.setState({[ev.target.name]: ev.target.value});
   }
   doSignUp(){
       AppAUTH.createUserWithEmailAndPassword(this.state.userEmail, this.state.userPassword)
           .then((u) => {
               alert("User created with UID " + u.user.uid);
           })
           .catch((err) => {
               alert("Error " + err);
           });
   }
   doSignIn(){
       AppAUTH.signInWithEmailAndPassword(this.state.userEmail, this.state.userPassword)
           .then((u) => {
               alert("You logged in as " + u.user.email);
               this.isLoggedIn = true;
               // this is how to route in vue -> this.$router.push({ path: "/budget" });
               this.props.history.push("/budget");
           })
           .catch((err) => {
               alert("Error " + err);
           });
   }
}
export default Login;