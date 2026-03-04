document.getElementById("adminLoginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const userId = document.getElementById("adminId").value.trim();
    const password = document.getElementById("adminPassword").value.trim();
    const errorMessage = document.getElementById("errorMessage");

    // 🔴 PUT YOUR GOOGLE SCRIPT WEB APP URL HERE
    const apiURL = "PASTE_YOUR_WEB_APP_URL_HERE";

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
