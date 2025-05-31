document.addEventListener("DOMContentLoaded", () => {
    const fname = localStorage.getItem("submittedFname") || "N/A";
    const lname = localStorage.getItem("submittedLname") || "N/A";
    const role = localStorage.getItem("submittedRole") || "N/A";
    const email = localStorage.getItem("submittedEmail") || "N/A";
    const cell = localStorage.getItem("submittedCell") || "N/A";
    const org = localStorage.getItem("submittedOrg") || "N/A";


    document.getElementById("displayFname").textContent = fname
    document.getElementById("displayLname").textContent = lname;
    document.getElementById("displayRole").textContent = role;
    document.getElementById("displayEmail").textContent = email;
    document.getElementById("displayCell").textContent = cell;
    document.getElementById("displayOrg").textContent = org;

    localStorage.removeItem("submittedFname");
    localStorage.removeItem("submittedLname");
    localStorage.removeItem("submittedRole");
    localStorage.removeItem("submittedEmail");
    localStorage.removeItem("submittedCell");
    localStorage.removeItem("submittedOrg");
});