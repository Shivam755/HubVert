<template>
  <h1>Register Page</h1>
  <p>Please fill in this form in order to create an account.</p><br>
  <br>
  <form>
    <fieldset>
    
    <label for="name"><strong>Name: </strong></label>
    <input type="text" placeholder="Enter Your Name" name="name" id="name" required>
    
    <br>
    <br>
    
    <label for="dob"> <strong> Date of Birth: </strong></label>
    <input type="date" id="dob" name="dob" required>
    
    <br>
    <br>
    
    <fieldset data-role="controlgroup">
      <legend><b>Choose your gender:</b></legend>
        <label for="male">Male</label>
        <input type="radio" name="gender" id="male" value="male" checked>
        <label for="female">Female</label>
        <input type="radio" name="gender" id="female" value="female">
    </fieldset>
    
    <br> 
    <br>
    
    <label for="email"><b>Email ID: </b></label>
    <input type="text" placeholder="Enter Email" name="email" id="email" required>
  
    <br>
    <br>
  
    <label for="psw"><b>Password: </b></label>
    <input type="password" placeholder="Enter Password" name="psw" id="psw" required>
  
    <br>
    <br>
  
    <label for="psw-repeat"><b>Repeat Password: </b></label>
    <input type="password" placeholder="Repeat Password" name="psw-repeat" id="psw-repeat" required>
  
    </fieldset>
    <br>
  
    <input type="submit" data-inline="true" value="Submit">

    <div class="container signin">
      <p>Already have an account? <a href="#">Sign in </a>.</p>
    </div>
  </form>
</template>

<script>
export default {
    name: "Register"
}
</script>

<style>

</style>