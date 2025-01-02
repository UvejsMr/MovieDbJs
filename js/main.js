let searchQuery = "";
let selectedGenre = "";
let sortOption = "";

const loadMoviesWithPagination = (page = 1) => {
  const movies = JSON.parse(localStorage.getItem("movies")) || [];
  const moviesPerPage = 9;

  let filteredMovies = movies
    .filter((movie) => {
      const matchesSearch = movie.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesGenre = !selectedGenre || movie.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    })
    .sort((a, b) => {
      if (sortOption === "rating") {
        return b.rating - a.rating;
      }
      return 0;
    });

  const startIndex = (page - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;

  const moviesToDisplay = filteredMovies.slice(startIndex, endIndex);
  const movieGrid = document.getElementById("movieGrid");
  const paginationControls = document.getElementById("paginationControls");

  movieGrid.innerHTML = "";

  if (moviesToDisplay.length === 0) {
    movieGrid.innerHTML = "<p>No movies available.</p>";
    paginationControls.innerHTML = "";
    return;
  }

  moviesToDisplay.forEach((movie) => {
    const movieCard = `
      <div class="col-md-4 mb-4">
        <div class="card h-100">
          <img src="${movie.poster}" class="card-img-top" alt="${movie.title}">
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">Genre: ${movie.genre}</p>
            <p class="card-text">Rating: ${movie.rating}</p>
            <a href="movie.html?id=${movie.id}" class="btn btn-primary">View Details</a>
          </div>
        </div>
      </div>
    `;
    movieGrid.innerHTML += movieCard;
  });

  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
  paginationControls.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const activeClass = i === page ? "active" : "";
    const pageButton = `<li class="page-item ${activeClass}">
      <a class="page-link" href="#" onclick="loadMoviesWithPagination(${i})">${i}</a>
    </li>`;
    paginationControls.innerHTML += pageButton;
  }
};

const initializeMovies = () => {
  const moviesFromLocalStorage = localStorage.getItem("movies");
  if (moviesFromLocalStorage) {
    loadMoviesWithPagination();
  } else {
    fetch("data/movies.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch movies.");
        }
        return response.json();
      })
      .then((movies) => {
        localStorage.setItem("movies", JSON.stringify(movies));
        loadMoviesWithPagination();
      })
      .catch((error) => {
        console.error("Error loading movies from JSON:", error);
        setTimeout(initializeMovies, 2000);
      });
  }
};

document.getElementById("searchInput").addEventListener("input", (e) => {
  searchQuery = e.target.value;
  loadMoviesWithPagination();
});

document.getElementById("filterSelect").addEventListener("change", (e) => {
  selectedGenre = e.target.value;
  loadMoviesWithPagination();
});

document.getElementById("sortSelect").addEventListener("change", (e) => {
  sortOption = e.target.value;
  loadMoviesWithPagination();
});

window.onload = () => {
  initializeMovies();
};
