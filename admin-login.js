document.getElementById("adminLoginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const userId = document.getElementById("adminId").value.trim();
    const password = document.getElementById("adminPassword").value.trim();
    const errorMessage = document.getElementById("errorMessage");

    const apiURL = "https://script.google.com/macros/s/AKfycbzXcxoFj3ostP-KQW6bcZQwzGZSZ0Vwf-ZkM9AJADG20DhARVvy8DvMG0voe-bhtAbV/exec";  // paste same working URL

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {

            console.log("sheet DATA:", data);

            const usersArray = data.users;  // ✅ THIS IS THE CORRECT ONE

            if (!Array.isArray(usersArray)) {
                errorMessage.textContent = "Invalid data format!";
                return;
            }
            const adminUser = usersArray.find(user => {

    console.log("Checking user:", user);

    console.log(
        "Sheet ID:", user.UserID,
        "Entered ID:", userId
    );

    console.log(
        "Sheet Pass:", user.Password,
        "Entered Pass:", password
    );

    return (
        String(user.UserID).trim() === userId &&
        String(user.Password).trim() === password &&
        String(user.Role).toLowerCase() === "admin" &&
        String(user.Status).toLowerCase() === "active"
    );
});

            if (adminUser) {
                console.log("LOGIN SUCCESS");
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
