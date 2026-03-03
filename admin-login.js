document.getElementById("adminLoginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const userId = document.getElementById("adminId").value.trim();
    const password = document.getElementById("adminPassword").value.trim();
    const errorMessage = document.getElementById("errorMessage");

    const apiURL = "https://script.google.com/macros/s/AKfycbzXcxoFj3ostP-KQW6bcZQwzGZSZ0Vwf-ZkM9AJADG20DhARVvy8DvMG0voe-bhtAbV/exec";

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {

            // IMPORTANT: check correct array name
            const users = data.users || data.data || data;

            const adminUser = users.find(user =>
                String(user.UserID || user.userid || user.id) === userId &&
                String(user.Password || user.password) === password &&
                String(user.Role || user.role).toLowerCase() === "admin" &&
                String(user.Status || user.status).toLowerCase() === "active"
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
