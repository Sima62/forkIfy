import View from "./View";
import icon from "../../img/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currPage = this._data.page;
    const totalNumberOfpages = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );
    // page 1 and other pages
    if (currPage === 1 && totalNumberOfpages > 1) {
      return `
      
      <button data-goto='${
        currPage + 1
      }' class="btn--inline pagination__btn--next">
        <span>Page ${currPage + 1}</span>
        <svg class="search__icon">
          <use href="${icon}#icon-arrow-right"></use>
        </svg>
      </button>
      `;
    }
    // last page
    else if (currPage === totalNumberOfpages && totalNumberOfpages > 1) {
      return `
      <button data-goto='${
        currPage - 1
      }' class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icon}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currPage - 1}</span>
      </button>
      `;
    }

    //other pages
    else if (currPage < totalNumberOfpages) {
      return `
      <button data-goto='${
        currPage - 1
      }' class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icon}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currPage - 1}</span>
      </button>
      <button data-goto='${
        currPage + 1
      }' class="btn--inline pagination__btn--next">
          <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-right"></use>
            </svg>
          </button>

      `;
    }
    // page 1, and no other pages
    else {
      return ``;
    }
  }
}

export default new PaginationView();
