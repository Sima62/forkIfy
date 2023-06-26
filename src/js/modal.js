import { API_URL, RES_PER_PAGE } from "./config";
import { getJSON, sendJSON } from "./helper";
export const state = {
  newRecipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

export const loadRecipe = async (id) => {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    const { newRecipe } = data.data;
    state.newRecipe = {
      id: newRecipe.id,
      title: newRecipe.title,
      image: newRecipe.image_url,
      publisher: newRecipe.publisher,
      sourceUrl: newRecipe.source_url,
      servings: newRecipe.servings,
      cookingTime: newRecipe.cooking_time,
      ingredients: newRecipe.ingredients,
    };

    if (state.bookmarks.some((bookmark) => bookmark.id === id)) {
      state.newRecipe.bookmarked = true;
    } else {
      state.newRecipe.bookmarked = false;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// search

export const loadSearchResults = async (query) => {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map((newRecipe) => {
      return {
        id: newRecipe.id,
        image: newRecipe.image_url,
        publisher: newRecipe.publisher,
        title: newRecipe.title,
      };
    });
    state.search.page = 1;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSearchResultPerPage = (page = state.search.page) => {
  state.search.page = page;
  const start = (page - 1) * state.search.resultPerPage;
  const end = page * state.search.resultPerPage;
  return state.search.results.slice(start, end);
};

export const updateServings = (newServings) => {
  state.newRecipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * newServings) / state.newRecipe.servings;
  });
  state.newRecipe.servings = newServings;
};

const persistBookmark = () => {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const addBookmark = (newRecipe) => {
  // add a bookmark
  state.bookmarks.push(newRecipe);

  //mark current newRecipe as bookmark
  if (newRecipe.id === state.newRecipe.id) {
    state.newRecipe.bookmarked = true;
  }
  //add bookmark to local storage
  persistBookmark();
};

export const deleteBookmark = (id) => {
  //delete bookmark
  const index = state.bookmarks.findIndex((el) => el.id === id);
  state.bookmarks.splice(index, 1);

  //remove bookmark from current newRecipe

  if (id === state.newRecipe.id) state.newRecipe.bookmarked = false;
  //add bookmark to local storage
  persistBookmark();
};

const init = () => {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

export const uploadRecipe = async function (newRecipe) {
  const ingredients = Object.entries(newRecipe)
    .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
    .map((ing) => {
      const ingArr = ing[1].replaceAll(" ", "").split(",");
      if (ingArr.length != 3)
        throw new Error(
          "Wrong ingredient format please use the correct format :)"
        );
      const [quantity, unit, description] = ingArr;
      return { quantity: quantity ? +quantity : null, unit, description };
    });
  const recipe = {
    title: newRecipe.title,
    image: newRecipe.image_url,
    publisher: newRecipe.publisher,
    sourceUrl: newRecipe.source_url,
    servings: +newRecipe.servings,
    cookingTime: +newRecipe.cooking_time,
    ingredients,
  };
  console.log(recipe);
  sendJSON();
};

//api key
//406073a3-530a-4f08-b883-9f4616ebbb62
