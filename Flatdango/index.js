const BASE_URL = ` http://localhost:3000`;

//asyncchronus call to fetch the fisrt movie

async function fetchFirstMovie() {
  let response = await fetch(`${BASE_URL}/films`);
  let movie = await response.json();
  //we return the renderd movie
  let list = movie.map((element) => displayMovieList(element));
  return list;
}

function displayMovieList(movie) {
  let container = document.querySelector("#list-movie");
  const list = document.createElement("li");
  list.textContent = `${movie.title}`;

  const button = document.createElement("button");
  button.textContent = "show details";

  button.addEventListener("click", () => {
    displayMovieDetails(movie);
  });
  container.appendChild(list);
  container.appendChild(button);
}

// we use DOM manipulation methods to create a card
function displayMovieDetails(movie) {
  // calculate the remaining tickets
  const movieDetailsContainer = document.querySelector("#movie-card");
  movieDetailsContainer.innerHTML = " ";

  let Tickets = movie.capacity - movie.tickets_sold;
  const header = document.createElement("h1");
  header.textContent = `${movie.title}`;

  const image = document.createElement("img");
  image.src = movie.poster;

  const title = document.createElement("p");
  title.textContent = `Title: ${movie.title}`;

  const runtime = document.createElement("p");
  runtime.textContent = `Runtime: ${movie.runtime} minutes`;

  const showtime = document.createElement("p");
  showtime.textContent = `Showtime: ${movie.showtime}`;

  let availableTicketsElement = document.createElement("p");
  availableTicketsElement.textContent = `Available Tickets: ${Tickets}`;

  const movieDetailsItemContainer = document.createElement("div");

  movieDetailsItemContainer.appendChild(header);
  movieDetailsItemContainer.classList.add("movie-details-card");

  const button = document.createElement("button");
  button.textContent = "buy tickets";
  button.addEventListener("click", () => {
    if (Tickets < 1) {
      availableTicketsElement.textContent = "sold out";
    } else {
      Tickets -= 1;
      availableTicketsElement.textContent = `Available Tickets: ${Tickets}`;
    }
  });

  movieDetailsItemContainer.append(
    image,
    title,
    runtime,
    showtime,
    availableTicketsElement
  );
  movieDetailsContainer.append(movieDetailsItemContainer, button);
  movieDetailsContainer.appendChild();
}

// after dom content has loaded we displsy the movie
document.addEventListener("DOMContentLoaded", function () {
  fetchFirstMovie();
});
