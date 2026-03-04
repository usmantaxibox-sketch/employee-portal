document.getElementById("adminLoginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const userId = document.getElementById("adminId").value.trim();
    const password = document.getElementById("adminPassword").value.trim();
    const errorMessage = document.getElementById("errorMessage");

    // 🔴 PUT YOUR GOOGLE SCRIPT WEB APP URL HERE
    const apiURL = "https://script.google.com/macros/s/AKfycbzXcxoFj3ostP-KQW6bcZQwzGZSZ0Vwf-ZkM9AJADG20DhARVvy8DvMG0voe-bhtAbV/exec";

    fetch(apiURL)
        .then(response => response.json())
        .then(users => {

            console.log("Sheet Data:", users);

            const adminUser = users.find(user =>
                String(user.UserID) === userId &&
                String(user.Password) === password &&
                String(user.Role).toLowerCase() === "admin" &&
                String(user.Status).toLowerCase() === "active"
            );

            if (adminUser) {
                window.location.href = "admin-dashboard.html";
            } else {
                errorMessage.textContent = "Login Failed!";
            }
        })
        .catch(error => {
            console.error("Error:", error);
            errorMessage.textContent = "Connection Error!";
        });
});
