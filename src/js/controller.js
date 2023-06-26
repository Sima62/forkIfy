import * as modal from "./modal.js";
import recipeView from "./view/recipeView.js";
import searchView from "./view/searchView.js";
import ResultsView from "./view/ResultsView.js";
import paginationView from "./view/paginationView.js";
import BookmarksView from './view/bookmarkView.js'
import addRecipeView from "./view/addRecipeView.js";


if (module.hot) {
  module.hot.accept();
}

// fetching recipe

const showRecipe = async () => {
  try {
    const id = window.location.hash.slice(1);

    if (!id) retrun;
    recipeView.renderSpinner();
    //update search result view

    ResultsView.update(modal.getSearchResultPerPage());
    BookmarksView.update(modal.state.bookmarks);

    //loading the recipie

    await modal.loadRecipe(id);

    // rendering the recipie
    recipeView.render(modal.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const searchRecipe = async () => {
  try {
    // console.log(ResultsView.render)
    ResultsView.renderSpinner();

    const query = searchView.getQuery();
    if (!query) return;

    await modal.loadSearchResults(query);

    // console.log("Hye",modal.getSearchResultPerPage(1));

    ResultsView.render(modal.getSearchResultPerPage());

    paginationView.render(modal.state.search);
  } catch (error) {
    console.log(error);
  }
};

const controlPagination = (goToPage) => {
  //render new results
  ResultsView.render(modal.getSearchResultPerPage(goToPage));
  //render new pagination buttons
  paginationView.render(modal.state.search);
};

const controlServing = (newServings) => {
  //update the recipe servig (in state )

  modal.updateServings(newServings);

  // update the view

  // recipeView.render(modal.state.recipe);
  recipeView.update(modal.state.recipe);
};

const controlAddBookmark = () => {
  // add or remove bookmark
  if (!modal.state.recipe.bookmarked) {
    modal.addBookmark(modal.state.recipe);
  } else {
    modal.deleteBookmark(modal.state.recipe.id);
  }

  // update recipe view
  recipeView.update(modal.state.recipe);
  // render bookmark
  BookmarksView.render(modal.state.bookmarks);

  
};

const controlBookmarks=()=>{
  BookmarksView.render(modal.state.bookmarks);
}

const controlAddRecipe=async (newRecipe)=>{
  // console.log(newRecipe)

  //upload recipe
  try{
   await modal.uploadRecipe(newRecipe);
  }
  catch(error){
addRecipeView.renderError(error.message)
  }
  

}

const init = () => {
  BookmarksView.addHandlerRenderer(controlBookmarks);
  recipeView.addHandlerRender(showRecipe);
  recipeView.addHandlerUpdateServings(controlServing);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(searchRecipe);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
