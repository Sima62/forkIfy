import View from "./View";
import PreviewView from "./previewView";

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmark Yet!";

  addHandlerRenderer(handler){
    window.addEventListener('load',handler)
  }

  _generateMarkup() {
    const items = this._data;
    return items.map(bookmark=>PreviewView.render(bookmark,false)).join("");
  }

}

export default new BookmarksView();
 