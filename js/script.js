$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
    });
});

function getMovies(searchText){
console.log(searchText);
axios.get('https://www.omdbapi.com/?s='+searchText+'&apikey=d62e2d9d')
.then( (response) => {
console.log(response);
let movies = response.data.Search;
let output = "";
$.each(movies, (index, movie) => {
// var iets (if 1=1) ? true :false;
output += `
<div class="col-md-3">
<div class="well text-center">
<img src="${movie.Poster}">
<h5>${movie.Title}</h5>
<a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
</div>
</div>
`;
});

$('#movies').html(output);
})
.catch( (err) => {
console.log(err);
});

}

function movieSelected(id){
sessionStorage.setItem('movieId', id);
window.location = 'movie.html';
return false;
}

function getMovie(){
let movieId = sessionStorage.getItem('movieId');

axios.get('https://www.omdbapi.com/?i='+movieId+'&apikey=d62e2d9d')
.then( (response) => {
console.log(response);
let movie = response.data;

let output =`
<div class="row">
<div class="col-md-4">

<div>
<div class="col-md-8">
</div>


`

})
.catch( (err) => {
console.log(err);
});
}