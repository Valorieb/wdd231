import {
    fetchRecipeData,
    displayRecipes,
    getFavorites
} from "./recipes.mjs"

const favoriteCards = document.getElementById("favorite-recipes");

fetchRecipeData().then((allRecipes) => {
    const favIds = getFavorites();
    const favRecipes = allRecipes.filter(r => favIds.includes(r.id));

    if (favRecipes.length === 0){
        favoriteCards.innerHTML ="<p>You haven't favorited any recipes yet.";
    }else{
        displayRecipes(favRecipes, favoriteCards);
    }
});

