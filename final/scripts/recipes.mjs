const recipeCards = document.getElementById("recipes");
const modal = document.createElement("dialog");
const modalCards = document.createElement("div");

document.body.appendChild(modal);
modal.appendChild(modalCards);

let recipeData =[];
let recIndex;

function setIndex(id){
    recIndex = id -1;
    return recIndex;
}

async function getRecipeData() {
    const response = await fetch("data/recipes.json");
    const data = await response.json();
    recipeData = data.recipes;
    displayRecipes(recipeData)
}

function displayRecipes(recipes){
    recipeCards.innerHTML = "";

    recipes.forEach((recipe) => {
        const recipeCard = document.createElement("div");
        recipeCard.classList = "card";

        recipeCard.innerHTML = `
        <h3>${recipe.title}</h3>
        <img src="${recipe.imgURL}" alt="${recipe.title}">
            <p><strong>Description</strong><br>
            ${recipe.description}</p>`;
            const button = document.createElement("button");
            button.classList.add("view-bttn");
            button.textContent = "View Recipe";
            recipeCard.appendChild(button);
            button.addEventListener("click",()=>{
                setIndex(recipe.id);
                displayModal(recipe);
                modal.showModal();
            });
        recipeCards.appendChild(recipeCard);
        
    });
}

function displayModal(recipe){
    modalCards.innerHTML = "";
    const modalCard = document.createElement("div");
    modalCard.classList = "modal-card";

    modalCard.innerHTML = `
        <h2>${recipe.title}</h2>
        <img src="${recipe.imgURL}" alt="${recipe.title}">
        <p><strong>Description</strong><br>
        ${recipe.description}</p>
        <p><strong>Ingredients</strong><br>`;

        const closeBtn = document.createElement("button");
        closeBtn.textContent = "x";
        closeBtn.classList.add("modal-close-btn");
        closeBtn.addEventListener("click", () => modal.close());
        modalCard.insertBefore(closeBtn, modalCard.firstChild);
        

        const ul = document.createElement("ul");
        recipe.ingredients.forEach(ing =>{
            const li = document.createElement("li");
            li.textContent = `${ing.amount} ${ing.name}`;
            ul.appendChild(li);
        });
        
        modalCard.appendChild(ul);

        const instructions = document.createElement("div");
        instructions.innerHTML = `<p><strong>Instructions:</strong></p>`
        const ol = document.createElement("ol");
        recipe.instructions.forEach(step => {
            const li = document.createElement("li");
            li.textContent = step;
            ol.appendChild(li);
        });
        instructions.appendChild(ol);
        modalCard.appendChild(instructions);
        modalCards.appendChild(modalCard);
}

getRecipeData();