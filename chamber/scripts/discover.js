const destinationCards = document.getElementById("destinations");
let destinationData = [];


async function getDestinationData(){
    console.log("getting destination data");
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
                    <img src="${destination.imgURL}" alt="${destination.name}">
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
getDestinationData(destinations);