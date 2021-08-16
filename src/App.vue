<template>
  <router-view/>
  <button @click="topFunction()" id="myBtn" title="Go to top">Top</button>
  <p class="credits">
    <center>
    This website is developed and managed by Quality Debuggers. 
    All rights reserved. 
    <br>
    &copy; 2020-21 Quality Debuggers
    </center>
  </p>
  
</template>

<script>
export default{
  name:'App',
  methods:{
    scrollLoad:function(){
      let mybutton = document.getElementById("myBtn");
      if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    },
    topFunction:function () {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
  },
  created:function(){
    window.onscroll=this.scrollLoad;
  }
}

</script>

<style scoped>
#myBtn {
  display: none; /* Hidden by default */
  position: fixed; /* Fixed/sticky position */
  bottom: 20px; /* Place the button at the bottom of the page */
  right: 30px; /* Place the button 30px from the right */
  z-index: 99; /* Make sure it does not overlap */
  border: none; /* Remove borders */
  outline: none; /* Remove outline */
  background-color: red; /* Set a background color */
  color: white; /* Text color */
  cursor: pointer; /* Add a mouse pointer on hover */
  padding: 15px; /* Some padding */
  border-radius: 10px; /* Rounded corners */
  font-size: 18px; /* Increase font size */
}

#myBtn:hover {
  background-color: #555; /* Add a dark-grey background on hover */
}
.credits{
  display:flex;
  justify-content:center;
  flex-direction:column;
  align-self:flex-end;
  /* padding: 3rem; */
  
}
</style>
