const API = "https://script.google.com/macros/s/AKfycbzXcxoFj3ostP-KQW6bcZQwzGZSZ0Vwf-ZkM9AJADG20DhARVvy8DvMG0voe-bhtAbV/exec";

function login(){

  const id = document.getElementById("userID").value;
  const pass = document.getElementById("password").value;

  fetch(API)
  .then(res => res.json())
  .then(data => {

     const user = data.users.find(u => 
        u.UserID == id && u.Password == pass
     );

     if(!user){
        alert("Invalid Login");
        return;
     }

     sessionStorage.setItem("userID", user.UserID);
     sessionStorage.setItem("role", user.Role);

     if(user.Role === "admin"){
        window.location.href = "admin-dashboard.html";
     } else {
        window.location.href = "rider-dashboard.html";
     }

  });
}
