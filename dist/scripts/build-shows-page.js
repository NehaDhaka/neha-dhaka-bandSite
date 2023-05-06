"use strict";

//HERO SECTION(SHOWS) TITLE AND SUBTITLE ASSIGNMENT
const heroSubtitle = document.querySelector(".hero__subtitle");
const heroTitle = document.querySelector(".hero__title--shows");
heroSubtitle.textContent = document.querySelector(".hero__album").textContent;
heroTitle.textContent = document.querySelector(".hero__song").textContent;

//CONCERTS
const concertsData = [
  {
    date: "Mon Sept 06 2021",
    venue: "Ronald Lane",
    location: "San Francisco, CA",
  },
  {
    date: "Tue Sept 21 2021",
    venue: "Pier 3 East",
    location: "San Francisco, CA",
  },
  {
    date: "Fri Oct 15 2021",
    venue: "Ronald Lane",
    location: "San Francisco, CA",
  },
  {
    date: "Mon Sept 06 2021",
    venue: "View Lounge",
    location: "San Francisco, CA",
  },
  {
    date: "Sat Nov 06 2021 ",
    venue: "Hyatt Agency",
    location: "San Francisco, CA",
  },
  {
    date: "Fri Nov 26 2021",
    venue: "Moscow Center",
    location: "San Francisco, CA",
  },
  {
    date: "Wed Dec 15 2021  ",
    venue: "Hyatt Agency",
    location: "San Francisco, CA",
  },
];

const show__concerts = document.querySelector(".shows__concerts");

const displayConcertLabels = function () {
  const labelsContainer = document.createElement("div");
  labelsContainer.classList.add("shows__labels-unit");
  show__concerts.appendChild(labelsContainer);

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
};

displayConcertLabels();

//------------------------------------------------//
//        Creating displayConcerts() function
//------------------------------------------------//

const displayConcerts = function (concertObj) {
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

  const dateData = document.createElement("p");
  dateData.classList.add("shows__date-data");
  dateData.textContent = concertObj.date;
  infoDate.appendChild(dateData);

  const venueLabel = document.createElement("p");
  venueLabel.classList.add("shows__venue-label");
  venueLabel.textContent = "venue";
  infoVenue.appendChild(venueLabel);

  const venueData = document.createElement("p");
  venueData.classList.add("shows__venue-data");
  venueData.textContent = concertObj.venue;
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

//------------------------------------------------//
// Calling displayConcerts() function using forEach()
//------------------------------------------------//

concertsData.forEach((concert) => {
  displayConcerts(concert);
});
