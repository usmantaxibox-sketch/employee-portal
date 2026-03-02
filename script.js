var API = "https://script.google.com/macros/s/AKfycbzVz_Y3PhbRI7oC87am4seZA68P210faMF4pSv46sDZMhlwLv1zfkYZr5zZL57W0wJPKw/exec";

function login() {
    var id = document.getElementById("id").value;
    var pass = document.getElementById("password").value;

    fetch(API + "?action=login&id=" + id + "&password=" + pass)
        .then(r => r.text())
        .then(d => {
            if (d == "success") {
                localStorage.setItem("empId", id);
                window.location = "employee.html";
            } else alert("Login Failed");
        });
}

function adminLogin() {
    var pass = document.getElementById("adminPass").value;

    fetch(API + "?action=adminLogin&password=" + pass)
        .then(r => r.text())
        .then(d => {
            if (d == "success") window.location = "admin.html";
            else alert("Wrong Password");
        });
}

function loadEmployee() {
    var id = localStorage.getItem("empId");

    fetch(API + "?action=getEmployee&id=" + id)
        .then(r => r.json())
        .then(data => {
            document.getElementById("name").innerText = data.name;
            document.getElementById("performance").innerText = data.performance;
            document.getElementById("record").innerText = data.record;
            document.getElementById("pdfLink").href = data.pdf;

            new Chart(document.getElementById("chart"), {
                type: "bar",
                data: {
                    labels: ["Performance"],
                    datasets: [{ data: [data.performance] }]
                }
            });
        });
}

function searchEmployee() {
    var id = document.getElementById("searchId").value;

    fetch(API + "?action=getEmployee&id=" + id)
        .then(r => r.json())
        .then(data => {
            document.getElementById("result").innerText =
                "Name: " + data.name + " | Performance: " + data.performance + " | Record: " + data.record;
        });
}

function upload() {
    var file = document.getElementById("file").files[0];
    var reader = new FileReader();
    var id = document.getElementById("empId").value;

    reader.onload = function () {
        var base64 = reader.result.split(',')[1];

        fetch(API, {
            method: "POST",
            body: new URLSearchParams({
                action: "upload",
                id: id,
                file: base64,
                fileName: file.name,
                mimeType: file.type
            })
        }).then(r => r.text())
            .then(d => alert("Uploaded"));
    };
    reader.readAsDataURL(file);
}

function logout() {
    localStorage.clear();
    window.location = "index.html";
}