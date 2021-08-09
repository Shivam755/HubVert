<template>
     <h1>Register Page</h1>
 <p>Please fill this form in order to create an account.</p><br>
<br>
    <form>
    <fieldset>
    
    <label for="name"><strong>Name: </strong></label>
    <input type="text" placeholder="Enter Your Name" name="name" id="name" required v-model="name">
    
    <br>
    <br>
    
    <label for="dob"> <strong> Date of Birth: </strong></label>
    <input type="date" id="dob" name="dob" required v-model="dob">
    
    <br>
    <br>
    
    <fieldset data-role="controlgroup">
      <legend><b>Choose your gender:</b></legend>
        <label for="male">Male</label>
        <input type="radio" name="gender" id="male" value="male" v-model="gender">
        <label for="female">Female</label>
        <input type="radio" name="gender" id="female" value="female" v-model="gender">
      </fieldset>
      
     <br> 
     <br>
      
    <label for="email"><b>Email ID: </b></label>
    <input type="text" placeholder="Enter Email" name="email" id="email" required v-model="email">
    
	<br>
    <br>
    
    <label for="psw"><b>Password: </b></label>
    <input type="password" placeholder="Enter Password" name="psw" id="psw" required v-model="pass">
    
	<br>
    <br>
    
    <label for="psw-repeat"><b>Repeat Password: </b></label>
    <input type="password" placeholder="Repeat Password" name="psw-repeat" id="psw-repeat" required v-model="rPass">
    
    </fieldset>
    <br>
    
      <input type="submit" data-inline="true" value="Submit" @click.prevent="submit">


  <div class="container signin">
    <p>Already have an account? <router-link to="/">Login in </router-link>.</p>
  </div>
</form>
</template>



<script>
import { Users } from '../database';
import SHA256 from 'crypto-js/sha256';
import router from '../router/index';

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
    methods:{
      submit : function(){
        if (this.name === ''){
          alert("Please enter a name!!!")
          return;
        }
        if (this.dob === ''){
          alert("Please select a date of birth!!!")
          return;
        }
        if (this.gender === ''){
          alert("Please select a gender!!!")
          return;
        }
        if (this.email === ''){
          alert("Please enter an email!!!")
          return;
        }
        if (this.pass === ''){
          alert("Please enter a password!!!")
          return;
        }
        if (this.rPass === ''){
          alert("Please re-enter a password!!!")
          return;
        }
        
        if (this.pass === this.rPass){
          console.log(this.name, this.dob, this.gender, this.email, SHA256(this.pass));
          let res = Users.AddUser(this.name, this.dob, this.gender, this.email, SHA256(this.pass));
          if (res) 
          {
            alert('Sign-up Successful!!!');
            router.push('/');
          }else{
            alert('Email id already used by other account!!')
          }
          
        }else{
          alert("Passwords don't match!!")
          return
        }
        
      }
    }
}
</script>

<style>

</style>