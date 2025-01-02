// Get movie ID from URL query parameters
const getMovieIdFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return parseInt(urlParams.get("id"));
};

// Display movie details
const displayMovieDetails = () => {
  const movieId = getMovieIdFromUrl();
  const movies = JSON.parse(localStorage.getItem("movies")) || [];
  const movie = movies.find((m) => m.id === movieId);

  const movieDetailsContainer = document.getElementById("movieDetails");

  if (!movie) {
    movieDetailsContainer.innerHTML = "<p>Movie not found.</p>";
    return;
  }

  movieDetailsContainer.innerHTML = `
        <div class="card">
            <img src="${movie.poster}" class="card-img-top" alt="${movie.title}">
            <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text"><strong>Genre:</strong> ${movie.genre}</p>
                <p class="card-text"><strong>Rating:</strong> ${movie.rating}</p>
                <a href="index.html" class="btn btn-secondary">Back to Movies</a>
            </div>
        </div>
    `;
};

window.onload = displayMovieDetails;
