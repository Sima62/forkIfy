import icon from "../../img/icons.svg";


export default class View {
  _data;

  render(data,render=true) {
    //doubt
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();

    if(!render)return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  _clear() {
    this._parentElement.innerHTML = "";
  }

  //update

  update(data) {
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError();
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const currEle = Array.from(this._parentElement.querySelectorAll("*"));
    const newEle = Array.from(newDom.querySelectorAll("*"));

    newEle.forEach((newElement, i) => {
      const currElement = currEle[i];
      if (
        !newElement.isEqualNode(currElement) &&
        newElement.firstChild?.nodeValue.trim() !== ""
      ) {
        currElement.textContent = newElement.textContent;
      }

      if (!newElement.isEqualNode(currElement)) {
        Array.from(newElement.attributes).forEach(attr =>
            currElement.setAttribute(attr.name, attr.value)
          )
        
      }
    });
  }

  //render spinner
  renderSpinner() {
    const markup = `<div class="spinner">
    <svg>
      <use href="${icon}" #icon-loader"></use>
    </svg>
  </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
    <div>
      <svg>
        <use href="${icon}"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div> `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
