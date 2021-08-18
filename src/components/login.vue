<template>
  <Nav/>

  <div class="img-container">
    <img src="../assets/login.png" alt="Avatar" style="width: 40%; align-self:center" >
    <div class='iconinput' >
    <i class="fa fa-envelope " style= "font-size:25px"></i>
    <input type="text" placeholder="Enter Email-id" name="uname" v-model="email">
    </div>
    <div class='iconinput' >
    <i class="fa fa-key icon" style= "font-size:25px; "></i>
    <input type="password" placeholder="Enter Password" name="psw" v-model="pass">
    </div>

    <button class="button1" type="submit" @click.prevent="verify"> Login </button>

    <span style="color:black">Don't have an account? <router-link to='/Sign-up'>Sign-up</router-link></span>
  </div>

</template>

<script>
import router from '../router/index';
import SHA256 from 'crypto-js/sha256';
import Swal from 'sweetalert2';

import Nav from "./nav.vue";
import { Users } from '../database';

export default {
  name: "Login",
  data: () =>{
    return {
      email:'',
      pass:''
    }
  },
  components:{
    Nav
  },
  methods:{
    verify:function(){
      if (this.email === ''){
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Please enter your email-id!!!',
          button: "Okay"
        })
        // alert("Please enter your email-id!!!")
        return;
      }
      if(this.pass === ""){
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Please enter your password!!!',
          button: "Okay"
        });
        return;
      }
      let encPass = SHA256(this.pass).toString();
      for (let i = 0; i < Users.users.length; i++){
        if (Users.users[i].email === this.email ){
          if (Users.users[i].password === encPass){
            sessionStorage.setItem("User",JSON.stringify(SHA256(this.email).toString()))
            sessionStorage.setItem("Password",JSON.stringify(encPass.toString()));
            Swal.fire({
              title:'Good job!',
              text:'Login Successful',
              icon:'success'
            }).then(() => {
            router.push("/feed");
            })
            return;
          }
          else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Wrong Password!!!',
              button: "Okay"
            });
            return;
          }
        }
      }
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email Id is not registered!!!',
        button: "Okay"
      });
    }
  }
};
</script>

<style scoped>
body{
  margin:0;
  padding:0;
  
}

.img-container{
  font-size:20px;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background: #80e9c0; */
  width: 100%;
  background:white;
}


.iconinput{
  font-family: 'Space Mono', monospace;
  /* color: #dfe1e5; */
  width: 60%;
  align-self: center;
  padding: 0.3rem 0.3rem ;
  margin: 0.5rem 0.5rem;
  color: lightcoral;
  /* border: 0.1rem solid #dfe1e5 ; */
  border:  0.3rem solid #e95bb2;
  border-radius: 0.3rem;
  outline: none;
  background-color: white;
  /* box-sizing: border-box; */
}

/* .iconinput:focus{
  border:  0.3rem solid #e95bb2;
  color: lightcoral;

} */

/* Full-width inputs */

/* Set a style for all buttons */
.button1{
  font-family: baskerville old face ; 
  font-size: 100%;
  background-color: #f3a736;
  color: white;
  padding: 0.5rem 0.5rem;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  height: 50%;
  width: 50%;
}


.frost {
  margin-top: 35px;
  padding: 50px 15px;
  background: linear-gradient(
    114deg,
    rgba(255, 255, 255, 0.48) 1.41%,
    rgba(255, 255, 255, 0.34) 99.96%
  );
  backdrop-filter: blur(8px);
  border-radius: 32px;
  border: 1px solid rgba(255, 255, 255, 0.24);
  box-sizing: border-box;
  background-repeat: no-repeat;
  max-width: 100%;
  max-height: 500px;
}
/* Add a hover effect for buttons */
.button1:hover {
  opacity: 0.9;
}

.button1:active {
  border: 3px solid #888888;
}



/* Center the avatar image inside this container */
/* .imgcontainer {
  text-align: center;
} */

/* Avatar image */
/* img.avatar { */
  /* width: 50%; */
  /* border-radius: 5%; */
  /* padding:20%; */
  /* background: #ff0000 }*/

/* Add padding to containers */
/* .container {
  padding: 16px;
} */



/* The "Forgot password" text */
/* span.psw {
  float: right;
  padding-top: 16px;
} */

/* Change styles for span and cancel button on extra small screens */
/* @media screen and (max-width: 300px) {
  span.psw {
    display: block;
    float: none;
  }
  .cancelbtn {
    width: 100%;
  }
} */

</style>

<style>

/* body{
  margin:0;
  padding:0
} */

input[type=password],
input[type="text"]{
  border:none;
  outline:none;
  padding-left: 1rem;
  font-size: 1rem;
  width: 60%;
}
input :active
{
  box-shadow:1rem 1rem #888888;
}

</style>