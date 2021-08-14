<template>
    <div v-if="id === null">
        <Forbidden />
    </div>
   <div v-else>
       <Nav/>
        <img :src="avatar" id='profilePic' alt="avatar" width="300" height="320">
        <router-link to="/changeProfilePic"><button>✏️</button></router-link>
        <fieldset>
        <label for="userid"><b>User ID: {{userId}} </b></label>
        <br>
        <br>
        <label for="name"><strong> Name: {{name}} </strong></label>
        <br>
        <br>
        <label for="dob"> <strong> Date of Birth: {{dob}}</strong></label>
        <br>
        <br>
        <label for="gender"><b> Gender: {{gender}} </b></label>
        <br>	
        <br>
        <label for="email"><b>Email ID: {{email}} </b></label>
        <br>
        <br>
        <label for="interest"><b>Interests: <span v-for ="interest in userInterests" :key="interest.id">{{interest.topic}}, </span> </b> <button @click="askInterest()">Edit Interest</button> </label>
        </fieldset>
        <br>
        <br>
        <router-link to='/changePassword'><button >Change Password</button></router-link>
        <button @click.prevent = "logout()">Log-out</button>
    </div>
</template>

<script>
import SHA256 from 'crypto-js/sha256';
import Swal from 'sweetalert2';
import router from '../router/index';

import {Users,interests} from "../database";
import Nav from "./nav.vue";
import Forbidden from './forbidden.vue';

export default {
    data: ()=> {
        return{
            avatar:'',
            name:'',
            gender:'',
            dob:'',
            email:'',
            userId:'',
            userInterests:[],
            id:''
        }
    },
    components:{
        Forbidden,
        Nav
    },
    methods:{
        logout:function(){
            Swal.fire({
            title: 'Do you really want to log out?',
            icon:'question',
            showDenyButton: true,
            confirmButtonText: `Yes`,
            denyButtonText: `No`,
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire('Thanks for visiting.See you soon!','','success').then(()=>{
                        sessionStorage.clear();
                        router.push('/');
                    });
                    
                } else if (result.isDenied) {
                    Swal.fire("We're glad you decided to stay!", "", "info")
                }
            })
        },
        askInterest:function(){
            let interestHtml = `<form name="InterestForm">`;
            for (let i = 0; i < interests.length; i++){
                let checked = false;
                for (let j = 0; j < this.userInterests.length; j++){
                    if (this.userInterests[j].id === interests[i].id){
                        checked = true;
                        break;
                    }
                }
                interestHtml += `<input type="checkbox" name="interest" id=${interests[i].topic} ${checked?"checked":""}  /> <label for=${interests[i].topic}>${interests[i].topic}</label> `;
            }
            interestHtml += `</form>`
            this.userInterests = [];
            Swal.fire({
                icon: 'info',
                title: 'Please select some of the interests',
                html: interestHtml,
                confirmButtonText: 'Done'
            }).then(()=>{
                for(let i=0; i<document.InterestForm.length;i++){
                    if (document.InterestForm.elements[i].type == 'checkbox' && document.InterestForm.elements[i].checked){
                        for(let j=0; j<interests.length; j++){
                            console.log(interests[j].topic,document.InterestForm.elements[i].id);
                            
                            if(interests[j].topic === document.InterestForm.elements[i].id){
                                this.userInterests.push(interests[j]);
                                console.log(interests[j]);
                                break;
                            }
                        }
                    }
                }
                if(Users.UpdateInterest(this.userId, this.userInterests)){
                    Swal.fire({
                        icon:"success",
                        title:"Interests added successfully!!"
                    });
                }else{
                    Swal.fire({
                        icon:"error",
                        title:"Couldn't find your account!!"
                    })
                }
            })
        }
    },
    mounted: function () {
        this.id= JSON.parse(sessionStorage.getItem("User"));
        if (this.id){
            for(let i=0; i<Users.users.length; i++) {
                if (SHA256(Users.users[i].email).toString() === this.id.toString()) {
                    this.userId=Users.users[i].id
                    this.name= Users.users[i].name;
                    this.gender=Users.users[i].gender;
                    this.dob=Users.users[i].dob;
                    this.email=Users.users[i].email;
                    this.avatar=require("../assets/"+Users.users[i].avatar);
                    this.userInterests=Users.users[i].interest;
                }
            }
        }
        return;
    }
}
</script>


<style>
  #profilePic
  {
  border-radius: 50%;
  }
</style>