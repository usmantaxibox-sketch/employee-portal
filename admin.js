const API = "https://script.google.com/macros/s/AKfycbxOZFIQZnT6UpjaHILRq96xhUKvMCsXxKoz-I0o3Ound9uLCv6x53AvNur5q9p2iwRGYQ/exec";

fetch(API)
.then(res => res.json())
.then(data => {
    renderPerformance(data.performance);
});

function renderPerformance(performance){

    let html = "<table><tr>";

    Object.keys(performance[0]).forEach(key=>{
        html += `<th>${key}</th>`;
    });

    html += "</tr>";

    performance.forEach(r=>{
        html += "<tr>";
        Object.values(r).forEach(val=>{
            html += `<td>${val}</td>`;
        });
        html += "</tr>";
    });

    html += "</table>";

    document.getElementById("performanceTable").innerHTML = html;
}
