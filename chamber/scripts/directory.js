const memberCards = document.getElementById("members");
const toggle = document.getElementById("toggle");


let listView = false;
let memberData = [];

async function getMemberData() {
  console.log("getting member data");
  const response = await fetch("members.json");
  const data = await response.json();
  memberData = data.members;
  displayMembers(data.members);

}
toggle.addEventListener("change", () => {
  listView = toggle.checked;
  memberCards.classList.toggle("listView", listView);
  document.body.classList.toggle("listView", listView);
  getMemberData();
});



function displayMembers (members){
  memberCards.innerHTML = "";

  members.forEach((member) => {
    const memberCard = document.createElement("div");
    memberCard.classList = "card";

    // const curseLevelSpan = `<span class="${
    //   member.name === "Night Vale Dog Park Association" ? "redacted" : ""
    // }">${member.curseLevel}</span>`;

    

    if (listView) {
      memberCard.innerHTML = `<ul><strong>${member.name}</strong>
      <li><strong>Address: </strong><br>${member.address}</li>
      <li><strong>Phone: </strong><br>${member.phone}</li>
      <li><strong>Website:</strong><br>${member.websiteUrl}</li>
      <li><strong>Membership Level: </strong><br>${member.membershipLvl}</li>
      <li><strong>Government Monitoring: </strong><br>${member.governmentMonitoringLevel}</li>
      <li><strong>Curse Level: </strong><br>${member.curseLevel}</li>
      </ul`;
    } else if(!listView) {
      
      memberCard.innerHTML = `
    <h2>${member.name}</h2>
    <img src="${member.imageUrl}" alt="${member.name} logo" width="150" height="150">
<br>
    <p><strong>Address: </strong><br>${member.address} <br>
    <p><strong>Phone: </strong><br>${member.phone}<br>
    <p><strong>Website:</strong><br>${member.websiteUrl}<br>
    
    <p><strong>Membership Level: </strong><br>${member.membershipLvl}<br>
    
    <p><strong>Government Monitoring: </strong><br>${member.governmentMonitoringLevel}<br>
    <p><strong>Curse Level: </strong><br>${member.curseLevel}<br>
    
    `;
    }
    memberCards.appendChild(memberCard);
  });
};

getMemberData();
