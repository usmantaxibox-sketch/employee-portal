const scriptURL = "YOUR_GOOGLE_SCRIPT_WEB_APP_URL"; // same URL as employee

document.getElementById("adminLoginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const id = document.getElementById("adminId").value;
    const password = document.getElementById("adminPassword").value;

    fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify({
            action: "login",
            role: "admin",
            id: id,
            password: password
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === "success") {
            localStorage.setItem("adminLoggedIn", "true");
            window.location.href = "admin-dashboard.html";
        } else {
            document.getElementById("errorMessage").innerText = "Invalid Admin Credentials";
        }
    })
    .catch(err => {
        document.getElementById("errorMessage").innerText = "Login Failed!";
        console.error(err);
    });
});
