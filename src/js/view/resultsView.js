import View from "./View";
import PreviewView from "./previewView";


class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "No recipe is found for your query! please try again!";

  _generateMarkup() {
    const items = this._data;
    return items.map(result=>PreviewView.render(result,false)).join("");
  }
}

export default new ResultsView();
