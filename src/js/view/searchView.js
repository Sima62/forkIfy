import View from "./View";
class SearchView extends View{
 _parentElement=document.querySelector('.search');
//  #searchBox=document.querySelector('.search__field');

 getQuery(){
    const query= this._parentElement.querySelector('.search__field').value;
    this._clearSearch();
    return query;
 }
 _clearSearch(){
    this._parentElement.querySelector('.search__field').value='';
 }
 addHandlerSearch(handler){
  this._parentElement.addEventListener('submit',(e)=>{
    e.preventDefault();
    handler();
  })
 }
}

export default new SearchView();