
//These will be the users registered as admins in our "fake login" system
const admins = [
     {
          username: "erik",
          password: "hejsan"
     },
     {
          username: "danne",
          password: "ciao"
     },
     {
          username: "adde",
          password: "fritös"
     },
]

document.addEventListener("DOMContentLoaded", () => {
     
     //redirect logged in users to the admin page
     if (localStorage.getItem("is_logged_in")){
          window.location.replace("../pages/admin.html");
      }

     let button = document.getElementById("button");
     
     //function checkUser() validates login entries
     button.addEventListener("click", (e) => {
          e.preventDefault();
          checkUser();          
     })

     function checkUser() {
          let input_username = document.getElementById("username").value;
          let input_password = document.getElementById("password").value;        

          for(let i = 0; i < admins.length; i++) {
               if(input_username == admins[i].username && input_password == admins[i].password) {
                    localStorage.setItem("is_logged_in", "true")//Setup local storage login item if login was a success
                    window.location.href="../pages/admin.html?username="+input_username; //Redirect user to admin page
                    return;                    
               }                             
          }
          button.classList.add("login-button"); //This class has a pseudo element (::before) which prints a message in case
                                                //the login fails      
     }
     
})