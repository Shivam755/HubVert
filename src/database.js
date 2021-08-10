//Pre-requisite variables
const moodTypes = [
    {id: 1, mood:"Happy"},
    {id: 2, mood:"Sad"},
    {id: 3, mood:"Angry"},
    {id: 4, mood:"Nervous"}
]

let avatars = {'male':[],'female':[]};
for (let i = 1; i<=10; i++){
    avatars['male'].push("avatarM"+i+".png");
    avatars['female'].push("avatarF"+i+".png");
}

// const interests = [
    
// ]
//User table
class User{
    constructor(){
        let temp = JSON.parse(localStorage.getItem("count"))
        this.id = temp ? temp :1;
        temp = JSON.parse(localStorage.getItem("Users"));
        this.users = temp ? temp: [];
        //Saving the changes
        localStorage.setItem('Users',JSON.stringify(this.users));
        localStorage.setItem('count',JSON.stringify(this.id));
    }
    AddUser(name,dob, gender, email, password){
        this.userId = 'AnonymousUser'+"0".repeat(5-this.id.toString().length)+this.id;
        for (let i = 0; i < this.users.length; i++){
            if (this.users[i].email === email){
                return false;
            }
        }
        this.avat = (gender == 'male'? 'avatarM' : 'avatarF') + (Math.floor(Math.random() * 10) + 1)+".png";
        console.log(this.avat);
        this.id++;
        this.users.push({
            id:this.userId,
            name:name,
            gender:gender,
            dob:dob,
            email:email,
            password:password,
            avatar: this.avat
        });
        //Saving the changes
        localStorage.setItem('Users',JSON.stringify(this.users));
        localStorage.setItem('count',JSON.stringify(this.id));
        //Success
        return true;
    }
    DeleteUser(id="",email=""){
        let success = false;
        if (id){
            for (let i = 0; i < this.users.length; i++){
                if (this.users[i].id == id){
                    this.users.splice(i,1);
                    success = true;
                }
            }
        }else if(email){
            for (let i = 0; i < this.users.length; i++){
                if (this.users[i].email == email){
                    this.users.splice(i,1);
                    success = true;
                }
            }
        }
        return success ? ()=>{
            //Saving the changes
            localStorage.setItem('Users',JSON.stringify(this.users));
            return success;
        } : success;
    }

    UpdatePassword(user, pass){
        let success = false;
        for (let cur in this.users){
            if (cur === user){
                cur.password = pass;
                success = true;
            }
        }
        return success ? ()=>{
            //Saving the changes
            localStorage.setItem('Users',JSON.stringify(this.users));
            return success;
        } : success;
    }

    UpdateName(user, name){
        let success = false;
        for (let cur in this.users){
            if (cur === user){
                cur.name = name;
                success = true;
            }
        }
        return success ? ()=>{
            //Saving the changes
            localStorage.setItem('Users',JSON.stringify(this.users));
            return success;
        } : success;
    }
}

//dailyMood table
class DailyMood{
    constructor(){
        let temp = JSON.parse(localStorage.getItem("DailyMood"));
        this.dailyMood = temp ? temp: [];
        //Saving the changes
        localStorage.setItem('DailyMood',JSON.stringify(this.dailyMood)); 
    }
    addMood(userId, date, moodId){
        this.dailyMood.push({userId, date, moodId});
        //Saving the changes
        localStorage.setItem('DailyMood',JSON.stringify(this.dailyMood)); 
    }
    UpdateMood(userId, date, moodId){
        for (let mood in this.dailyMood){
            if (mood.userId === userId && mood.date === date){
                mood.moodId = moodId;
            }
        }
        //Saving the changes
        localStorage.setItem('DailyMood',JSON.stringify(this.dailyMood)); 
    }
}

//diary table
class Diary{
    constructor(){
        let temp = JSON.parse(localStorage.getItem("Diary"));
        this.diary = temp ? temp: [];
        //Saving the changes
        localStorage.setItem('Diary',JSON.stringify(this.diary)); 
    }
    addEntry(userId, date, entry){
        this.diary.push({userId:userId, date:date, entry:entry});
        //Saving the changes
        localStorage.setItem('Diary',JSON.stringify(this.diary)); 
    }
    UpdateEntry(userId, date, entry){
        for (let i = 0; i<this.diary.length; i++){
            if (this.diary[i].userId === userId && this.diary[i].date === date){
                this.diary[i].entry = entry;
            }
        }
    }
}

//Interest table
class Interest{
    constructor(){
        let temp = JSON.parse(localStorage.getItem("Interest"));
        this.interest = temp ? temp: [];
        //Saving the changes
        localStorage.setItem('Interest',JSON.stringify(this.interest)); 
    }
    AddInterest(interestId, userId, topics){
        this.interest.push({interestId:interestId, userId:userId, topics:topics});
        //Saving the changes
        localStorage.setItem('Interest',JSON.stringify(this.interest));
    }
    UpdateInterest(userId, topics){
        for(let i in this.interest){
            if (i.userId === userId){
                i.topics = topics;
            }
        }
        //Saving the changes
        localStorage.setItem('Interest',JSON.stringify(this.interest));
    }
}

//Creating objects of the above table
let Users = new User();
let DailyMoods = new DailyMood();
let Diarys = new Diary();
let Interests = new Interest();

export {Users,moodTypes,DailyMoods, Diarys, Interests, avatars};