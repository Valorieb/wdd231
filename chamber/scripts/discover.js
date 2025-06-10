const destinationCards = document.getElementById("destinations");
let destinationData = [];


async function getDestinationData(){
    const response = await fetch("data/discover.json");
    const data = await response.json();
    destinationData = data.destinations;
    displayDestinations(destinationData);
}

function displayDestinations(destinations){
    destinationCards.innerHTML = "";

    destinations.forEach((destination)=>{
        const destinationCard = document.createElement("div");
        // destinationCard.classList.add("discover-card");
        destinationCard.classList.add("card");

        destinationCard.innerHTML = `
        <ul class="card-ul">
            <li class="name">
                <h2>${destination.name}</h2>
            </li>
            <li class="photo">
                <figure>
                    <img src="${destination.imgURL}" alt="${destination.name} loading="lazy">
                </figure>
            </li>
            
            <li class="location">
                <address>
                    ${destination.address}
                </address>
            </li>
            <li class="description">
                <p>${destination.description}</p>
            </li>
            <li class="button">
                <button type="button">Learn more</button>
            </li>
        </ul>`;
        destinationCards.appendChild(destinationCard);

    });
}
getDestinationData();

// ------------------Date Code------------------

const visits = document.getElementById("visits");
const message = document.createElement("p");
visits.appendChild(message);

const storedString = localStorage.getItem("lastVisit");
const lastVisit = new Date();
const lastVisitDate = new Date(storedString);

const thisDay = new Date();
console.log(`today: ${thisDay}`);

const msPerDay = 1000 * 60 * 60 * 24;

const daysPassed = Math.floor((thisDay - lastVisitDate) / msPerDay);

if(storedString == null){
    const firstVisit = new Date();
    localStorage.setItem("lastVisit", lastVisit.toISOString());
    message.innerHTML ="Welcome! Let us know if you have any questions.";
    
}else if(daysPassed < 1){
    
    console.log(`Days since last visit: ${daysPassed}`);
    message.innerHTML = "Back so soon! Awesome!";

}else{
    message.innerHTML = `You last visited ${daysPassed} days ago`;
}

console.log(`last visit: ${storedString}`);


