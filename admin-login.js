document.getElementById("adminLoginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const userId = document.getElementById("adminId").value.trim();
    const password = document.getElementById("adminPassword").value.trim();
    const errorMessage = document.getElementById("errorMessage");

    const apiURL = "https://script.google.com/macros/s/AKfycbzXcoFj3ostP-KQW6bcZQWzGZSZ0Wf-ZkM9AJADG20DhARVvy8DvMG0voe-bhtAbv/exec";

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {

            console.log("FULL DATA:", data);

            const usersArray = data.data || data.users || data;

            if (!Array.isArray(usersArray)) {
                errorMessage.textContent = "Invalid data format!";
                return;
            }

            console.log("USERS ARRAY:", usersArray);

            const adminUser = usersArray.find(user => {

                // 🔥 Make it flexible (case insensitive column match)

                const sheetUserId =
                    user.UserID ||
                    user.userID ||
                    user["User Id"] ||
                    user["UserID"];

                const sheetPassword =
                    user.Password ||
                    user.password;

                const sheetRole =
                    user.Role ||
                    user.role;

                const sheetStatus =
                    user.Status ||
                    user.status;

                return (
                    String(sheetUserId).trim() === userId &&
                    String(sheetPassword).trim() === password &&
                    String(sheetRole).toLowerCase() === "admin" &&
                    String(sheetStatus).toLowerCase() === "active"
                );
            });

            if (adminUser) {
                window.location.href = "admin-dashboard.html";
            } else {
                errorMessage.textContent = "Login Failed!";
            }
        })
        .catch(error => {
            console.error("Fetch Error:", error);
            errorMessage.textContent = "Connection Error!";
        });
});
