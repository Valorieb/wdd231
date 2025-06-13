export {
  getRecipeData,
  fetchRecipeData,
  displayRecipes,
  getFavorites,
  toggleFavorite,
};

const recipeCards = document.getElementById("recipes");
const modal = document.createElement("dialog");
const modalCards = document.createElement("div");

const originalSetItem = localStorage.setItem;
localStorage.setItem = function (key, value) {
  originalSetItem.call(this, key, value);
};

document.body.appendChild(modal);
modal.appendChild(modalCards);

let recipeData = [];
let recIndex;

function setIndex(id) {
  recIndex = id - 1;
  return recIndex;
}

async function getRecipeData() {
  try {
    const response = await fetch("data/recipes.json");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    recipeData = data.recipes;
    if (recipeCards) {
      displayRecipes(recipeData, recipeCards);
    }
  } catch (error) {
    console.error("Failed to load recipe data in getRecipeData:", error);
  }
}

async function fetchRecipeData() {
  try {
    const response = await fetch("data/recipes.json");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.recipes;
  } catch (error) {
    console.error("Failed to load recipe data in fetchRecipeData:", error);
    return [];
  }
}

function getFavorites() {
  const stored = JSON.parse(localStorage.getItem("favoriteRecipes")) || [];
  return stored.map(Number); // ensures IDs are numbers
}

function saveFavorites(favorites) {
  localStorage.setItem("favoriteRecipes", JSON.stringify(favorites));
}

function toggleFavorite(id) {
  let favorites = getFavorites();

  if (favorites.includes(id)) {
    favorites = favorites.filter((favId) => favId !== id); // Remove
  } else {
    favorites.push(id); // Add
  }

  saveFavorites(favorites);
}

function displayRecipes(recipes, container) {
  container.innerHTML = "";

  recipes.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList = "card";

    recipeCard.innerHTML = `
        
        <img src="${recipe.imgURL}" alt="${recipe.title}" width="150" height="150" loading="lazy">
            <p><strong>Description</strong><br>
            ${recipe.description}</p>
            <p>🌱 <strong>Garden grown:</strong> ${recipe.gardenGrown}</p>`;
    const headerWrapper = document.createElement("div");
    headerWrapper.classList.add("header-wrapper");

    const recipeTitle = document.createElement("h3");
    headerWrapper.appendChild(recipeTitle);
    recipeTitle.innerHTML = `${recipe.title} `;

    const favHeart = document.createElement("button");
    favHeart.classList.add("favorite-icon");
    headerWrapper.appendChild(favHeart);
    recipeCard.insertBefore(headerWrapper, recipeCard.firstChild);

    const favorites = getFavorites();
    const isFavorited = favorites.includes(recipe.id);
    favHeart.innerHTML = isFavorited ? "💚" : "🩶";

    favHeart.addEventListener("click", () => {
      toggleFavorite(recipe.id);
      favHeart.innerHTML = favHeart.innerHTML === "🩶" ? "💚" : "🩶";
    });

    const button = document.createElement("button");
    button.classList.add("view-bttn");
    button.textContent = "View Recipe";
    recipeCard.appendChild(button);
    button.addEventListener("click", () => {
      setIndex(recipe.id);
      displayModal(recipe);
      modal.showModal();
    });
    container.appendChild(recipeCard);
  });
}

function displayModal(recipe) {
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
  recipe.ingredients.forEach((ing) => {
    const li = document.createElement("li");
    li.textContent = `${ing.amount} ${ing.name}`;
    ul.appendChild(li);
  });

  modalCard.appendChild(ul);

  const instructions = document.createElement("div");
  instructions.innerHTML = `<p><strong>Instructions:</strong></p>`;
  const ol = document.createElement("ol");
  recipe.instructions.forEach((step) => {
    const li = document.createElement("li");
    li.textContent = step;
    ol.appendChild(li);
  });
  instructions.appendChild(ol);
  modalCard.appendChild(instructions);
  modalCards.appendChild(modalCard);
}

getRecipeData();
