const spotlightCards = document.getElementById("spotlight");
let premierMembers = [];

async function getMemberData() {
  const response = await fetch("members.json");
  const data = await response.json();
  const memberData = data.members;

  findHighRating(memberData);
    const spotlightArray = getRandomItems(premierMembers);
    displaySpoltlight(spotlightArray);
}

function findHighRating(members){
  members.forEach((member) => {
    const rating = parseInt(member.membershipLvl);
    if (Number.isNaN(rating) || rating >= 3) {
      premierMembers.push(member);
    }
  });
}

function getRandomItems(arr, count = 3){
  if (arr.length < count) {
    throw new Error("Array is too short to pick that many unique items.");
  }
  const indexes = Array.from(arr.keys());

  //Fisher-Yates algorithm
  for (let i = indexes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
  }

  const selectedIndexes = indexes.slice(0, count);
  const result = selectedIndexes.map(i => arr[i]);

  return result;
}

function displaySpoltlight(members) {
  spotlightCards.innerHTML = "";
  
  members.forEach((member) => {
    
      const spotlightCard = document.createElement("div");

      spotlightCard.classList.add("card");
      spotlightCard.innerHTML = `
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
      spotlightCards.appendChild(spotlightCard);
    
  });
}

getMemberData();
