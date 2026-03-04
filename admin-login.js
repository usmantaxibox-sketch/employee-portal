document.getElementById("adminLoginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const userId = document.getElementById("adminId").value.trim();
    const password = document.getElementById("adminPassword").value.trim();
    const errorMessage = document.getElementById("errorMessage");

    const apiURL = "https://script.google.com/macros/s/AKfycbzXcxoFj3ostP-KQW6bcZQwzGZSZ0Vwf-ZkM9AJADG20DhARVvy8DvMG0voe-bhtAbV/exec";

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {

            console.log("Sheet Data:", data);

            // 🔥 IMPORTANT FIX HERE
            const usersArray = data.data || data.users || data;

            if (!Array.isArray(usersArray)) {
                errorMessage.textContent = "Invalid data format!";
                return;
            }

            const adminUser = usersArray.find(user =>
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
            console.error("Fetch Error:", error);
            errorMessage.textContent = "Connection Error!";
        });
});
