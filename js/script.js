$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
    });
});

function getMovies(searchText){
console.log(searchText);
axios.get('https://www.omdbapi.com/?s='+searchText+'&page=1&apikey=d62e2d9d')
.then( (response) => {
console.log(response);
let movies = response.data.Search;
let output = "";
$.each(movies, (index, movie) => {

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
<img src="${movie.Poster}" class="thumbnail";">
</div>
<div class="col-md-8">
<h2>${movie.Title} +(${movie.Year})</h2>
<ul class="list">
    <li class="list"><strong>Release Year:</strong>${movie.Released}</li>
    <li class="list"><strong>Runtime:</strong>${movie.Runtime}</li>
    <li class="list"><strong>Genre:</strong>${movie.Genre}</li>
    <li class="list"><strong>Actors:</strong>${movie.Actors}</li>
    <li class="list"><strong>Rated:</strong>${movie.Rated}</li>
    <li class="list"><strong>Language:</strong>${movie.Language}</li>
    <li class="list"><strong>imdbRating:</strong>${movie.imdbRating}</li>
    <li class="list"><strong>Writer:</strong>${movie.Writer}</li>
</ul>
</div>
</div>
<div class="row">
<div class="well">
<h3>Plot</h3>
${movie.Plot}
<hr>
<a href="http://imdb.com/title/${movie.imdbID}" target="blank" class= "btn btn-primary">Imdb Page</a>

</div>

`
$('#movie').html(output);
})
.catch( (err) => {
console.log(err);

});
}