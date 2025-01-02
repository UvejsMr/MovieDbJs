let movies = JSON.parse(localStorage.getItem("movies")) || [];

const logout = () => {
  localStorage.removeItem("loggedInUser");
  alert("You have been logged out.");
  window.location.href = "index.html";
};

const displayAdminMovies = () => {
  const adminMovieList = document.getElementById("adminMovieList");
  adminMovieList.innerHTML = "";

  if (movies.length === 0) {
    adminMovieList.innerHTML = "<p>No movies available.</p>";
    return;
  }

  movies.forEach((movie) => {
    adminMovieList.innerHTML += `
      <tr>
        <td>${movie.title}</td>
        <td>${movie.genre}</td>
        <td>${movie.rating}</td>
        <td><img src="${movie.poster}" alt="${movie.title}" style="height: 50px;"></td>
        <td>
          <button class="btn btn-primary btn-sm" onclick="editMovie(${movie.id})">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteMovie(${movie.id})">Delete</button>
        </td>
      </tr>
    `;
  });
};

const saveMovie = (event) => {
  event.preventDefault();

  const id = parseInt(document.getElementById("movieId").value);
  const title = document.getElementById("title").value.trim();
  const genre = document.getElementById("genre").value.trim();
  const rating = parseFloat(document.getElementById("rating").value);
  const poster = document.getElementById("poster").value.trim();

  if (!title || !genre || isNaN(rating) || !poster) {
    alert("Please fill out all fields correctly.");
    return;
  }

  if (id) {
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    movies[movieIndex] = { id, title, genre, rating, poster };
  } else {
    const newMovie = {
      id: movies.length > 0 ? movies[movies.length - 1].id + 1 : 1,
      title,
      genre,
      rating,
      poster,
    };
    movies.push(newMovie);
  }

  localStorage.setItem("movies", JSON.stringify(movies));
  alert("Movie saved!");
  document.getElementById("movieForm").reset();
  displayAdminMovies();
};

const editMovie = (id) => {
  const movie = movies.find((movie) => movie.id === id);
  if (movie) {
    document.getElementById("movieId").value = movie.id;
    document.getElementById("title").value = movie.title;
    document.getElementById("genre").value = movie.genre;
    document.getElementById("rating").value = movie.rating;
    document.getElementById("poster").value = movie.poster;
  }
};

const deleteMovie = (id) => {
  if (confirm("Are you sure you want to delete this movie?")) {
    movies = movies.filter((movie) => movie.id !== id);
    localStorage.setItem("movies", JSON.stringify(movies));
    alert("Movie deleted!");
    displayAdminMovies();
  }
};

window.onload = () => {
  displayAdminMovies();
};

document.getElementById("movieForm").addEventListener("submit", saveMovie);
