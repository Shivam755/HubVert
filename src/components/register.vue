<template>
  
  <Nav />
  <div class='form1'>
    <img src="../assets/register.png" alt="" style="width: 23%; align-self:center">
    <div class='inputicon1' >
      <i class="fa fa-user" style= "font-size:25px"></i>
      <input type="text" placeholder="Enter Your Name" name="name" id="name" required v-model="name" style="border:none">
    </div>
    
    
    <div class='inputicon1'>
      <i class="fa fa-birthday-cake" style= "font-size:25px" ></i>
      <input type="date" id="dob" name="dob" required v-model="dob" >
    </div>


    <div class='inputicon1'>
    <fieldset data-role="controlgroup" style="border:none">
      <legend><b>Choose your gender:</b></legend>
        <label for="male" >Male</label>
        <i class="fa fa-mars" style= "padding:0% 0% 0% 3%; font-size:25px" ></i>
        <input type="radio" name="gender" id="male" value="male" v-model="gender">
        
        
        <label for="female" style= "padding:0% 0% 0% 5%">Female</label>
        <i class="fa fa-venus" style= "padding:0% 0% 0% 3%; font-size:25px" ></i>
        <input type="radio" name="gender" id="female" value="female" v-model="gender">
    </fieldset>
    </div> 

    <div class='inputicon1'>
    <i class="fa fa-envelope" style="font-size:25px" ></i>
    <input type="text" placeholder="Enter Email" name="email" id="email" required v-model="email">
    </div>

    
    <div class='inputicon1'>  
    <i class="fa fa-key " style="font-size:25px" ></i>
    <input type="password" placeholder="Enter Password" name="psw" id="psw" required v-model="pass">
    </div>

    
    <div class='inputicon1'>  
    <i class="fa fa-key " style="font-size:25px" ></i>
    <!-- <label for="psw-repeat"><b>Repeat Password: </b></label> -->
    <input type="password" placeholder="Repeat Password" name="psw-repeat" id="psw-repeat" required v-model="rPass">
    </div>
    
  <div class="buttonholder">
    <input class='button1' type="submit" data-inline="true" value="Submit" @click.prevent="submit">
  </div>
  <!-- <div class="container signin"> -->
    <p style="display:flex;justify-content:center">
      Already have an account? <router-link to="/">Login in 
      </router-link>.</p>
  </div>
  
  
  <!-- </div> -->
  <!-- </div> -->
  
  
</template>



<script scoped>
import Nav from "./nav.vue";
import { Users } from '../database';

import SHA256 from 'crypto-js/sha256';
import router from '../router/index';
import Swal from 'sweetalert2';  

export default {
    name: "Register",
    data: () =>{
      return {
        name : '',
        dob : '',
        gender: '',
        email :'',
        pass : '',
        rPass : ''
      }
    },
  components:{
    Nav
  },
    methods:{
      submit : function(){
        const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (this.name === ''){
          Swal.fire({
            icon:'warning',
            title:'Oops...',
            text:"Please enter a name!!!"
          });
          return;
        }
        if (this.dob === ''){
          Swal.fire({
            icon:'warning',
            title:'Oops...',
            text:"Please select a date of birth!!!"
          });
          return;
        }
        if (this.gender === ''){
          Swal.fire({
            icon:'warning',
            title:'Oops...',
            text:"Please select a gender!!!"
          });
          return;
        }
        if (this.email === ''){
          Swal.fire({
            icon:'warning',
            title:'Oops...',
            text:"Please enter an email!!!"
          });
          return;
        }else if (! this.email.match(mailformat)){
     
          Swal.fire({
            icon:'error',
            title:'Oops...',
            text:"Invalid Email!!"
          });
          //  alert("Invalid Email!!");
          return;
        }
        if (this.pass === ''){
          Swal.fire({
            icon:'warning',
            title:'Oops...',
            text:"Please enter a password!!!"
          });
          return;
        }
        if (this.rPass === ''){
          Swal.fire({
            icon:'warning',
            title:'Oops...',
            text:"Please enter repeat password!!!"
          });
          return;
        }
        
        if (this.pass === this.rPass){
          let res = Users.AddUser(this.name, this.dob, this.gender, this.email, SHA256(this.pass).toString());
          if (res) 
          {
            Swal.fire({
              icon:'success',
              title:'Great Job',
              text:"Sign-up Successful!!!",
            }).then(()=>{
            router.push('/');
            });
          }else{
            Swal.fire({
              icon:'error',
              title:'Oops...',
              text:"Email id already used by other account!!",
            });
          }
          
        }else{
          Swal.fire({
            icon:'error',
            title:'Oops...',
            text:"Passwords don't match!!"
          });
          return;
        }
        
      }
    }
}
</script>

<style scoped>
/* .frost {
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
} */
.form1{
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'times new roman';
  background-color:white;
  padding: 3rem 0rem ;
  width:100%;
  margin:auto;
  color:black;
}

fieldset{
  width:60%;
  border:none;
}

.inputicon1{
  display:flex;
  font-family: 'Space Mono', monospace;
  color: #f469a9;
  border: 0.3rem solid #f469a9;
  border-radius: 0.3rem;
  outline: none;
  background-color: white;
  width:80vw;
  margin:0.7vw 0vw;
  padding: 0.4vw 0.8vw;
}

input[type=date]{
  border:none;
  outline:none;
  padding-left: 1rem;
  font-size: 1rem;
  width: 20%;
}


.button1{
  /* display:flex;
  justify-self:center; */
  font-family: Merriweather ; 
  font-size: 2rem;
  text-align:center;
  /* align-self: center; */
  background-color: #ba53de;
  color: black;
  /* padding: 0.5rem 0.5rem; */
  /* margin-left: 10rem; */
  /* margin-right: 10rem; */
  border:  0.3rem solid #ba53de;
  border-radius: 0.3rem;
  
  cursor: pointer;
  height: 3rem;
  width: 20rem;
}

/* Add a hover effect for buttons */
.button1:hover {
  opacity: 4;
  border:  0.3rem solid #f4fa9c;

}

.button1:active {
  border: 3px solid #a810df;
}

.buttonholder{
  display:flex;
  align-self: center;
  /* align-items:center; */
  justify-content:center;

}

 

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 1245px) {
  input[type=date]{
    width:90%
  }
}
</style>