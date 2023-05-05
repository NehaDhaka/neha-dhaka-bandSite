"use strict";

//HERO SECTION(SHOWS) TITLE AND SUBTITLE ASSIGNMENT
const heroSubtitle = document.querySelector(".hero__subtitle");
const heroTitle = document.querySelector(".hero__title--shows");
heroSubtitle.textContent = document.querySelector(
  ".information__album"
).textContent;
heroTitle.textContent = document.querySelector(
  ".information__song-name"
).textContent;

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
  labelsContainer.classList.add("concerts__labels");
  show__concerts.appendChild(labelsContainer);

  const labelsContainerDate = document.createElement("p");
  labelsContainerDate.classList.add("labels__label");
  labelsContainerDate.textContent = "date";
  labelsContainer.appendChild(labelsContainerDate);

  const labelsContainerVenue = document.createElement("p");
  labelsContainerVenue.classList.add("labels__label");
  labelsContainerVenue.textContent = "venue";
  labelsContainer.appendChild(labelsContainerVenue);

  const labelsContainerLocation = document.createElement("p");
  labelsContainerLocation.classList.add("labels__label");
  labelsContainerLocation.textContent = "location";
  labelsContainer.appendChild(labelsContainerLocation);
};

displayConcertLabels();

//------------------------------------------------//
//        Creating displayConcerts() function
//------------------------------------------------//

const displayConcerts = function (concertObj) {
  const concertSingle = document.createElement("div");
  concertSingle.classList.add("concerts__concert");
  show__concerts.appendChild(concertSingle);

  concertSingle.addEventListener("click", () => {
    concertSingle.classList.toggle("selected");
  });

  window.addEventListener("click", (event) => {
    if (event.target !== concertSingle) {
      concertSingle.classList.remove("selected");
    }
  });

  concertSingle.addEventListener("mouseover", () => {
    concertSingle.classList.add("hover");
  });

  concertSingle.addEventListener("mouseleave", () => {
    concertSingle.classList.remove("hover");
  });

  const concertInfo = document.createElement("div");
  concertInfo.classList.add("concert__info");
  concertSingle.appendChild(concertInfo);

  const concertButton = document.createElement("button");
  concertButton.classList.add("concert__btn");
  concertButton.textContent = "BUY TICKETS";
  concertSingle.appendChild(concertButton);

  const infoDate = document.createElement("div");
  infoDate.classList.add("info__date");
  concertInfo.appendChild(infoDate);

  const infoVenue = document.createElement("div");
  infoVenue.classList.add("info__venue");
  concertInfo.appendChild(infoVenue);

  const infoLocation = document.createElement("div");
  infoLocation.classList.add("info__location");
  concertInfo.appendChild(infoLocation);

  const dateLabel = document.createElement("p");
  dateLabel.classList.add("date__label");
  dateLabel.textContent = "date";
  infoDate.appendChild(dateLabel);

  const dateData = document.createElement("p");
  dateData.classList.add("date__data");
  dateData.textContent = concertObj.date;
  infoDate.appendChild(dateData);

  const venueLabel = document.createElement("p");
  venueLabel.classList.add("venue__label");
  venueLabel.textContent = "venue";
  infoVenue.appendChild(venueLabel);

  const venueData = document.createElement("p");
  venueData.classList.add("venue__data");
  venueData.textContent = concertObj.venue;
  infoVenue.appendChild(venueData);

  const locationLabel = document.createElement("p");
  locationLabel.classList.add("location__label");
  locationLabel.textContent = "location";
  infoLocation.appendChild(locationLabel);

  const locationData = document.createElement("p");
  locationData.classList.add("location__data");
  locationData.textContent = concertObj.location;
  infoLocation.appendChild(locationData);
};

//------------------------------------------------//
// Calling displayConcerts() function using forEach()
//------------------------------------------------//

concertsData.forEach((concert) => {
  displayConcerts(concert);
});
