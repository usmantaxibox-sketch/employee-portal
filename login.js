const API_URL = "https://script.google.com/macros/s/AKfycbzXcxoFj3ostP-KQW6bcZQwzGZSZ0Vwf-ZkM9AJADG20DhARVvy8DvMG0voe-bhtAbV/exec";

function login() {

    const id = document.getElementById("userID").value.trim();
    const pass = document.getElementById("password").value.trim();

    if (!id || !pass) {
        alert("Please enter User ID and Password");
        return;
    }

    fetch(API_URL)
        .then(res => res.json())
        .then(data => {

            const users = data.users;

            const user = users.find(u => 
                u.UserID == id && 
                u.Password == pass &&
                u.Status.toLowerCase() === "active"
            );

            if (!user) {
                alert("Invalid ID or Password");
                return;
            }

            // Save session
            sessionStorage.setItem("userID", user.UserID);
            sessionStorage.setItem("role", user.Role);
            sessionStorage.setItem("name", user.Name);

            // Redirect by role
            if (user.Role.toLowerCase() === "admin") {
                window.location.href = "admin-dashboard.html";
            } else {
                window.location.href = "rider-dashboard.html";
            }

        })
        .catch(error => {
            alert("Server Error. Check Script URL.");
            console.error(error);
        });
}
