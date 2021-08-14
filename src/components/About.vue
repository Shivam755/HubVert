<template>
  <Nav/>
  <div class="heading1 about-section">
    <h1>About Us</h1>
  </div>
    
  
<div class="background1">
    <h5>We are Quality Debuggers.</h5>
    <h2>Meet the squad:</h2>

	<div class="container">
    <!-- <div class="shadow"> -->
    <div class="imagecont">
      <div class="circle">
        <img src="../assets/img_avatar.png" alt="Avatar" >
      </div>
      <center>Shivam Gupta</center>
    </div>
    <div class="carddet ">
      <div class='quote'>
        I like PC.
      </div>
      <div class='link'>
        <i class="fa fa-linkedin" style="font-size:40px;color:red"></i>
        <i class="fa fa-google" style="font-size:40px;color:red"></i>
        <i class="fa fa-facebook" style="font-size:40px;color:red"></i>
        <i class="fa fa-instagram" style="font-size:40px;color:red"></i>
        <i class="fa fa-github" style="font-size:40px;color:red"></i>
        <i class="fa fa-twitter" style="font-size:40px;color:red"></i>
      </div>
    </div>
  </div>

  <div class="container">
    <!-- <div class="shadow"> -->
    <div class="carddet ">
      <div class='quote'>
        The best is yet to come!

      </div>
      
      <div class='link'>
        <i class="fa fa-linkedin" style="font-size:40px;color:red"></i>
        <i class="fa fa-google" style="font-size:40px;color:red"></i>
        <i class="fa fa-facebook" style="font-size:40px;color:red"></i>
        <i class="fa fa-instagram" style="font-size:40px;color:red"></i>
        <i class="fa fa-github" style="font-size:40px;color:red"></i>
        <i class="fa fa-twitter" style="font-size:40px;color:red"></i>
      </div>
    </div>
    <div class="imagecont">
      <div class="circle">
        <img src="../assets/img_avatar2.png" alt="Avatar" >
      </div>
      <center>Jyoti Ghosh</center>
    </div>
  </div>

	<div class="container">
    <!-- <div class="shadow"> -->
    <div class="imagecont">
      <div class="circle">
        <img src="../assets/img_avatar.png" alt="Avatar">
      </div>
      <center>Tejas Pophale</center>
    </div>
    <div class="carddet ">
      <div class='quote'>
        I am iron man
      </div>
      <div class='link'>
        <i class="fa fa-linkedin" style="font-size:40px;color:red"></i>
        <i class="fa fa-google" style="font-size:40px;color:red"></i>
        <i class="fa fa-facebook" style="font-size:40px;color:red"></i>
        <i class="fa fa-instagram" style="font-size:40px;color:red"></i>
        <i class="fa fa-github" style="font-size:40px;color:red"></i>
        <i class="fa fa-twitter" style="font-size:40px;color:red"></i>
      </div>
    </div>
  </div>

  <div class="container">
    <!-- <div class="shadow"> -->
    <div class="carddet ">
      <div class='quote'>
        I like to code.
      </div>
      
      <div class='link'>
        <i class="fa fa-linkedin" style="font-size:40px;color:red"></i>
        <i class="fa fa-google" style="font-size:40px;color:red"></i>
        <i class="fa fa-facebook" style="font-size:40px;color:red"></i>
        <i class="fa fa-instagram" style="font-size:40px;color:red"></i>
        <i class="fa fa-github" style="font-size:40px;color:red"></i>
        <i class="fa fa-twitter" style="font-size:40px;color:red"></i>
      </div>
    </div>
    <div class="imagecont">
      <div class="circle">
        <img src="../assets/img_avatar2.png" alt="Avatar" >
      </div>
      <center>Shrutika Gholap</center>
    </div>
  </div>

	<div class="container">
    <!-- <div class="shadow"> -->
    <div class="imagecont">
      <div class="circle">
        <img src="../assets/img_avatar.png" alt="Avatar">
      </div>
      <center>Harshal Gondkar</center>
    </div>
    <div class="carddet ">
      <div class='quote'>
        I love anime.
      </div>
      <div class='link'>
        <i class="fa fa-linkedin" style="font-size:40px;color:red"></i>
        <i class="fa fa-google" style="font-size:40px;color:red"></i>
        <i class="fa fa-facebook" style="font-size:40px;color:red"></i>
        <i class="fa fa-instagram" style="font-size:40px;color:red"></i>
        <i class="fa fa-github" style="font-size:40px;color:red"></i>
        <i class="fa fa-twitter" style="font-size:40px;color:red"></i>
      </div>
    </div>
  </div>
  </div>

</template>

<script>
import Nav from "./nav.vue";
export default {
  name:"About",
  components:{
    Nav
  }
}
</script>

<style scoped >

.background1{
  background:linear-gradient(to right, rgb(198, 255, 221), 
  rgb(251, 215, 134), rgb(247, 121, 125));
}

.heading1{
  /* background: #f1efb9; */
  font-family: 'Lobster', cursive;
  display: flex;
  align-items:center;
  justify-content:center;
  text-shadow:#ffffff;
  font-size: 40px;
  margin:none;
  padding-top:3rem;
  
}

/* #fbfae1 */

.container {
  display:flex;
  flex-direction:row;
  background: inherit;
  align-items:center;
  justify-content:center;
  padding:0.5rem;
}

.imgcont{
  flex:30vw;
  margin:0;
  display:flex;
  flex-direction:column;
  align-content:center;
  padding: 0.7rem;
}

.circle{
  margin:0;
  border-radius:50%;
  width:25vw;
  height:auto;
  padding:5px;
  background-color:white;
  justify-content:center;
  align-items:center;
}

img {
  border-radius: 50% ;
  width:25vw;
  height:auto;
}
.carddet {
  flex:70vw;
  display: flex;
  flex-direction:column;
  justify-content:center;
  align-content: center;
  font-size:1rem;
  background:inherit;
  padding: 0.5rem;

  /* background:#f4fa9c; */
}

.quote{
  display:flex;
  justify-content:center;
}

.link{
  display: flex;
  justify-content:center;
  align-content: center;
  font-size:1rem;
  background:inherit;
}
i{
  padding:0.3rem;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

/* .shadow .box{
  position: relative;
  display:flex;
  content: '';
  /* position:absolute; */
  /* bottom: -50px;
  left: 5%; */

  /* box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); */
  /* box-shadow: rgba(0,0,0,0.3);
  z-index: -1;
  filter: blur(10px) */

  /* transition: 0.3s; }*/



@media screen and (max-width: 650px) {

  img {
    width: 100%;
  }
}
</style>
