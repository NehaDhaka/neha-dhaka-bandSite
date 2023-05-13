"use strict";

const bandSiteURL = "https://project-1-api.herokuapp.com/";
const apiKey = "3d8edb80-438c-476e-ab76-52098c9f9260";
const showsURL = `https://project-1-api.herokuapp.com/showdates/?api_key=${apiKey}`;

const heroSubtitle = document.querySelector(".hero__subtitle");
const heroTitle = document.querySelector(".hero__title--shows");
heroSubtitle.textContent = document.querySelector(".hero__album").textContent;
heroTitle.textContent = document.querySelector(".hero__song").textContent;
const show__concerts = document.querySelector(".shows__concerts");
const showTopper = document.querySelector(".shows__topper");

const displayConcertLabels = function () {
  const labelsContainer = document.createElement("div");
  labelsContainer.classList.add("shows__labels-unit");
  showTopper.appendChild(labelsContainer);

  const labelsContainerDate = document.createElement("p");
  labelsContainerDate.classList.add("shows__label-unit");
  labelsContainerDate.textContent = "date";
  labelsContainer.appendChild(labelsContainerDate);

  const labelsContainerVenue = document.createElement("p");
  labelsContainerVenue.classList.add("shows__label-unit");
  labelsContainerVenue.textContent = "venue";
  labelsContainer.appendChild(labelsContainerVenue);

  const labelsContainerLocation = document.createElement("p");
  labelsContainerLocation.classList.add("shows__label-unit");
  labelsContainerLocation.textContent = "location";
  labelsContainer.appendChild(labelsContainerLocation);

  const placeHolderButton = document.createElement("button");
  placeHolderButton.classList.add("shows__book-btn");
  placeHolderButton.classList.add("shows__hidden-btn");
  placeHolderButton.textContent = "BUY TICKETS";
  showTopper.appendChild(placeHolderButton);
};

displayConcertLabels();

const displayConcert = function (concertObj) {
  const concertSingle = document.createElement("div");
  concertSingle.classList.add("shows__concert");
  show__concerts.appendChild(concertSingle);

  concertSingle.addEventListener("click", () => {
    concertSingle.classList.toggle("selected");
  });

  window.addEventListener("click", (event) => {
    if (event.target !== concertSingle) {
      concertSingle.classList.remove("selected");
    }
  });

  const concertInfo = document.createElement("div");
  concertInfo.classList.add("shows__concert-info");
  concertSingle.appendChild(concertInfo);

  const concertButton = document.createElement("button");
  concertButton.classList.add("shows__book-btn");
  concertButton.textContent = "BUY TICKETS";
  concertSingle.appendChild(concertButton);

  const infoDate = document.createElement("div");
  infoDate.classList.add("shows__date-container");
  concertInfo.appendChild(infoDate);

  const infoVenue = document.createElement("div");
  infoVenue.classList.add("shows__venue-container");
  concertInfo.appendChild(infoVenue);

  const infoLocation = document.createElement("div");
  infoLocation.classList.add("shows__location-container");
  concertInfo.appendChild(infoLocation);

  const dateLabel = document.createElement("p");
  dateLabel.classList.add("shows__date-label");
  dateLabel.textContent = "date";
  infoDate.appendChild(dateLabel);

  const date = new Date(concertObj.date);
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = date
    .toLocaleDateString("en-US", options)
    .replace(",", "")
    .replace(",", "");
  const dateData = document.createElement("p");
  dateData.classList.add("shows__date-data");
  dateData.textContent = formattedDate;
  infoDate.appendChild(dateData);

  const venueLabel = document.createElement("p");
  venueLabel.classList.add("shows__venue-label");
  venueLabel.textContent = "venue";
  infoVenue.appendChild(venueLabel);

  const venueData = document.createElement("p");
  venueData.classList.add("shows__venue-data");
  venueData.textContent = concertObj.place;
  infoVenue.appendChild(venueData);

  const locationLabel = document.createElement("p");
  locationLabel.classList.add("shows__location-label");
  locationLabel.textContent = "location";
  infoLocation.appendChild(locationLabel);

  const locationData = document.createElement("p");
  locationData.classList.add("shows__location-data");
  locationData.textContent = concertObj.location;
  infoLocation.appendChild(locationData);
};

axios
  //get shows data from the api and pass it to the displayConcert() function
  .get(showsURL)
  .then((shows) => {
    shows.data.forEach((show) => {
      displayConcert(show);
    });
  })
  .catch((error) => {
    console.log(error);
  });
