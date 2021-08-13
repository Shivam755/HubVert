<template>
    <h1>Change Password</h1>
    <form action="">
        <label for="old"></label>
        <input type="password" name="old" id="old" placeholder="Current Password" v-model="old">

        <label for="new"></label>
        <input type="password" name="new" id="new" placeholder="New Password" v-model="newPass">

        <label for="repeat"></label>
        <input type="password" name="repeat" id="repeat" placeholder="Repeat New Password" v-model="repeat">
        
        <input @click="changePassword()" type="button" value="Confirm">
    </form>
</template>

<script>
import { Users } from '../database';
import SHA256 from 'crypto-js/sha256';
import router from '../router/index';
export default {
    name:'ChangePassword',
    data:()=>{
        return {
            old: '',
            newPass: '',
            repeat: '',
            pass: '',
            email: ''
        }
    },
    mounted:function(){
        this.email = JSON.parse(sessionStorage.getItem("User"));
        this.pass = JSON.parse(sessionStorage.getItem("Password"));
    }
    ,
    methods:{
        changePassword:function(){
            if (!this.old){
                alert("Please enter a current password");
                return;
            }else if (!this.newPass){
                alert("Please enter a new password");
                return;
            }else if(!this.repeat){
                alert("Please enter repeat new password");
                return;
            }
            if (SHA256(this.old).toString() === this.pass.toString()){
                if (this.newPass === this.repeat){
                    for(let i=0; i<Users.users.length; i++) {
                        if (SHA256(Users.users[i].email).toString() === this.email.toString()) {
                            if (Users.UpdatePassword(Users.users[i].id,SHA256(this.newPass).toString())){
                                alert("Password changed successfully!");
                                sessionStorage.setItem('Password',JSON.stringify(SHA256(this.newPass).toString()));
                                router.push('/profile')
                            }else{
                                alert("Couldn't find your account!!");
                                return;
                            }
            
                        }
                    }
                }else{
                    alert("New and repeat password does not match.");
                }
            }else{
                alert("Current password is wrong");
                return;
            }
            
        }
    }
}
</script>

<style>

</style>