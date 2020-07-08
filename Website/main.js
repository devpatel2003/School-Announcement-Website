/* exported check */

//all variables that aren't saved over session...will refresh each time page reloads
var sGender; 
var sGrade;
var sClub;
var tUsername;
var init;
var noAnnouncement; //this is used if there are no announcements to show



init = localStorage.getItem("init"); //retives value for init from local storage
                                     //if the code hasn't been intialized init will equal null

if(init === "1"){ //if init has a value it will retrive all prevously local stored data
    tGender = JSON.parse(localStorage.getItem("storageGenderT"));
    tGrade = JSON.parse(localStorage.getItem("storageGradeT"));
    tClub = JSON.parse(localStorage.getItem("storageClubT"));
    tMsg = JSON.parse(localStorage.getItem("storageMsg"));
    
    datePosted = JSON.parse(localStorage.getItem("storageDate"));
    postUsername = JSON.parse(localStorage.getItem("storageUsername"));
    
    i = parseInt(localStorage.getItem("i")); //retrives value of i from local storage
  
}
else{ //will ONLY run when the website is run for the first time
    
    var tGender = [];    //these variables should only be declared once to avoid reseting them
    var tGrade = [];
    var tClub = [];
    var tMsg = [];
    var datePosted = [];
    var postUsername =[];
    var i = 0;

}



/////////////////////////////////////////////////////////////////////////////////////////////////





function check() { //function to check password
    
    var pass = document.getElementById("passid").value;
    var user = document.getElementById("userid").value;
  
    //the following code checkes if password are matching
    if (pass == "northP123") {
        
        localStorage.setItem("activeTeacher", user) //saves active username
        window.location.href = 'TeacherView.html';  //opens teacherview page if info matches
      
    }
    
    else
    {
        alert("Incorrect Password")//displays error message
    }
}

function saveAnnouncement(){ //function to save TEACHER announcement data
    
    
    //Takes the value of each HTML element and sets them to a JS variable 
    tGender[i] = document.getElementById("HTMLgender").value;
    tGrade[i] = document.getElementById("HTMLgrade").value;
    tClub[i] = document.getElementById("HTMLclub").value;
    tMsg[i] = document.getElementById("inputBox").value;
    
    //gets active teachers name
    tUsername = localStorage.getItem("activeTeacher");

    
    //Collects current date and time as of posting
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() ;
    var dateTime = date+'  '+time;
    
    //adds date and teacher name to an array
    datePosted[i] = dateTime;
    postUsername[i] = tUsername;
    
    //Takes JS values and puts in in local storage
    localStorage.setItem("storageGenderT", JSON.stringify(tGender));
    localStorage.setItem("storageGradeT", JSON.stringify(tGrade));
    localStorage.setItem("storageClubT", JSON.stringify(tClub));
    localStorage.setItem("storageMsg", JSON.stringify(tMsg));
    localStorage.setItem("storageDate", JSON.stringify(datePosted));
    localStorage.setItem("storageUsername", JSON.stringify(postUsername));
    
    
    alert("GENDER: "+tGender[i]+ "\nGRADE: "+ tGrade[i]+ "\nCLUB: "+tClub[i]+ "\nMESSAGE: "+tMsg[i])
  
    i++
    localStorage.setItem("i",JSON.stringify(i)); //changes local storage value for i
    
    init = "1";  //chages init to 1 meaning that data has been entered in local storage
    localStorage.setItem("init", init) //stores init value


}





function getData(){
    
    
    //Gets STUDENT filter options
    sGender = document.getElementById("studentGender").value;
    sGrade = document.getElementById("studentGrade").value;
    sClub = document.getElementById("studentClub").value;
    
    //Puts student options in local storage
    localStorage.setItem("storageGenderS", sGender);
    localStorage.setItem("storageGradeS", sGrade);
    localStorage.setItem("storageClubS", sClub);
    
    
    
    
}


function display(){
    
    noAnnouncement = true;

    
    //gets local storage data for student
    sGender = localStorage.getItem("storageGenderS");
    sGrade = localStorage.getItem("storageGradeS");
    sClub = localStorage.getItem("storageClubS");
    
    //gets local storage data for teacher
    tGender = JSON.parse(localStorage.getItem("storageGenderT"));
    tGrade = JSON.parse(localStorage.getItem("storageGradeT"));
    tClub = JSON.parse(localStorage.getItem("storageClubT"));
    tMsg = JSON.parse(localStorage.getItem("storageMsg"));
    
    //gets date and username of teacher
    datePosted = JSON.parse(localStorage.getItem("storageDate"));
    postUsername = JSON.parse(localStorage.getItem("storageUsername"));
    
    //loop runs for each item in an array
    for(i = 0; i < tGender.length; i++){
    
        //compares if student selection equals to teacher selection
        if((tGender[i] == sGender || tGender[i] == "All")&& (tGrade[i] == sGrade || tGrade[i] == "All") && (tClub[i] == sClub || tClub[i] == "All")){
            
            //creats new elements each time a match is found
            var div = document.createElement("div")  //this parent div element houses the msg, teacher name and time
            var name = document.createElement("B")
            var msg = document.createElement("P")
            var time = document.createElement("P")
            
            //this div already exists in the student html and each new div will be added in here
            var items = document.getElementById("msgBox")  
            
            //creats a class name for msg and time...used for css styling
            div.className ="msg";
            time.className ="time"
            
            //puts the current username inside of the div element
            name.innerHTML = postUsername[i];
            div.appendChild(name)
            
            //puts the current mesaage inside of the div element
            msg.innerHTML = tMsg[i]; 
            div.appendChild(msg)
               
            //puts the current time inside of the div element
            time.innerHTML = datePosted[i];
            div.appendChild(time);
            
            //appends div to parent div "msgBox"
            items.insertBefore(div, items.childNodes[0]);
            
            noAnnouncement = false;
               
        }
        
     }
    
   if (noAnnouncement == true){
        var div = document.createElement("div")
        var msg = document.createElement("P")
        var items = document.getElementById("msgBox") 
        
        div.className ="msg";
       
        msg.innerHTML = "Sorry No Announcements"; 
        div.appendChild(msg);
       
        items.insertBefore(div, items.childNodes[0]);
           
   }
    

    
}

