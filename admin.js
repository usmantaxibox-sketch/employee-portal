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
function createSalary(){

  const riderID = document.getElementById("salaryRiderID").value;

  fetch(API)
  .then(res => res.json())
  .then(data => {

    const rider = data.salary.find(r => r.RiderID == riderID);

    if(!rider){
      alert("Rider Not Found");
      return;
    }

    calculateAndShow(rider);

  });
}
function calculateAndShow(rider){

  const earnings =
    Number(rider.PickupAmount) +
    Number(rider.DropoffAmount) +
    Number(rider.ExtraKMPay) +
    Number(rider.BatchIncentive) +
    Number(rider.SpecialVehiclePay) +
    Number(rider.OrderIncentive);

  const deductions =
    Number(rider.Salaf) +
    Number(rider.MinusSalary) +
    Number(rider.HealthInsurance) +
    Number(rider.TalabatClosing) +
    Number(rider.BikeInstallment) +
    Number(rider.CompanyBikeRent) +
    Number(rider.TrafficFine) +
    Number(rider.PendingDues) +
    Number(rider.BrandingBox) +
    Number(rider.EquipmentDeduction) +
    Number(rider.Medical);

  const total = earnings - deductions;

  const html = `
    <div id="salaryCard" style="
        background:white;
        padding:30px;
        width:400px;
        border-radius:15px;
        box-shadow:0 10px 25px rgba(0,0,0,0.2);
    ">

      <h2>Salary Slip</h2>
      <p><b>Rider ID:</b> ${rider.RiderID}</p>
      <p><b>Worked Hours:</b> ${rider.WorkedHours}</p>

      <hr>

      <p><b>Total Earnings:</b> ${earnings}</p>
      <p><b>Total Deductions:</b> ${deductions}</p>

      <h3>Net Salary: ${total}</h3>

      <button onclick="downloadPDF()">Download PDF</button>

    </div>
  `;

  document.getElementById("salaryContainer").innerHTML = html;
}
function downloadPDF(){
  const element = document.getElementById("salaryCard");
  html2pdf().from(element).save("SalarySlip.pdf");
}
