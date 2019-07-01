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
output += `
<div class="col-md-3">
<div class="well text-center">
<h5>${movie.Title}</h5>
</div>
</div>
`;
});
})
.catch( (err) => {
console.log(err);
});

}