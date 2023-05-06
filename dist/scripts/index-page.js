"use strict";

// ASSIGNING HTML ELEMENTS TO JS VARIABLES
const containerOldComments = document.querySelector(".comments__old-comments");
const btnSubmitForm = document.querySelector(".comments__form-btn");
const commentForm = document.querySelector(".comments__form");

const oldCommentsDate = new Date();
//  COMMENTS DATA
const commentsData = [
  {
    name: "Connor Walton",
    // time: "02/17/2021",
    time: new Date(),
    comment:
      "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
  },
  {
    name: "Emilie Beach",
    // time: "01/09/2021",
    time: new Date(),
    comment:
      "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
  },
  {
    name: "Miles Acosta",
    // time: "12/20/2020",
    time: new Date(),
    comment:
      "I can't stop listening. Every time I hear one of their songs the vocals it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can t get enough.",
  },
];

//------------------------------------------------//
//        Creating displayComment() function
//------------------------------------------------//

const displayComment = function (commentObj) {
  const oldCommentSingle = document.createElement("div");
  oldCommentSingle.classList.add("comments__old-comment");
  containerOldComments.appendChild(oldCommentSingle);

  const oldCommentImageContainer = document.createElement("div");
  oldCommentSingle.appendChild(oldCommentImageContainer);

  const oldCommentImage = document.createElement("div");
  oldCommentImage.classList.add("comments__old-img");
  oldCommentImageContainer.appendChild(oldCommentImage);

  const oldCommentInformation = document.createElement("div");
  oldCommentInformation.classList.add("comments__old-info");
  oldCommentSingle.appendChild(oldCommentInformation);

  const informationTop = document.createElement("div");
  informationTop.classList.add("comments__old-info-top");
  oldCommentInformation.appendChild(informationTop);

  const topName = document.createElement("p");
  topName.classList.add("comments__top-name");
  topName.textContent = commentObj.name;
  informationTop.appendChild(topName);

  const topDate = document.createElement("p");
  topDate.classList.add("comments__top-date");
  topDate.textContent = oldCommentsDate.toLocaleString("en-GB").split(",")[0];
  informationTop.appendChild(topDate);

  const informationBottom = document.createElement("p");
  informationBottom.classList.add("information__bottom");
  informationBottom.textContent = commentObj.comment;
  oldCommentInformation.appendChild(informationBottom);
};

//------------------------------------------------//
// Creating displayAllComments() function using forEach()
//------------------------------------------------//

const displayAllComments = () => {
  commentsData.forEach((comment) => {
    displayComment(comment);
  });
};

displayAllComments();

//------------------------------------------------//
// Creating updateCommentTime() function
//------------------------------------------------//
function updateCommentTime() {
  // clears all the comments from the page
  containerOldComments.innerHTML = "";

  //re-renders all the comments on the page
  displayAllComments();

  // Updates the timestamp for the existing comments as soon as a new comment get posted
  const now = new Date();
  let timeStamps = document.querySelectorAll(".comments__top-date");

  for (let i = 0; i < commentsData.length - 3; i++) {
    const diff = Math.floor((now - commentsData[i].time) / 1000);

    if (diff < 60) {
      timeStamps[i].textContent = `${diff} second${diff >= 1 ? "s" : ""} ago`;
    } else if (diff < 3600) {
      timeStamps[i].textContent = `${Math.floor(diff / 60)} minute${
        Math.floor(diff / 60) > 1 ? "s" : ""
      } ago`;
    } else if (diff < 86400) {
      timeStamps[i].textContent = `${Math.floor(diff / 3600)} hour${
        Math.floor(diff / 3600) > 1 ? "s" : ""
      } ago`;
    } else {
      timeStamps[i].textContent = `${Math.floor(diff / 86400)} day${
        Math.floor(diff / 86400) > 1 ? "s" : ""
      } ago`;
    }
  }
}

//------------------------------------------------//
//    Adding event listener to the comment form
//------------------------------------------------//

commentForm.addEventListener("submit", function (e) {
  //prevents the page from loading
  e.preventDefault();

  const newCommentName = document.getElementById("name");
  const newCommentText = document.getElementById("comment");
  const currentDateObj = new Date();

  // converts the date object into a string then use split() to convert it into an array and access the first array element (DD/MM/YYYY)
  const formattedString = currentDateObj.toLocaleString("en-GB").split(",")[0];

  // checks for empty form fields
  if (newCommentName.value === "" || newCommentText.value === "") {
    newCommentName.classList.add("error-state");
    newCommentText.classList.add("error-state");
    return;
  }

  // removes error states when form fields are not empty
  if (newCommentName.classList.contains("error-state")) {
    newCommentName.classList.remove("error-state");
    newCommentText.classList.remove("error-state");
  }

  //adds the new comment object to the comment array
  commentsData.unshift({
    name: newCommentName.value,
    time: currentDateObj,
    comment: newCommentText.value,
  });

  updateCommentTime();

  //clears the input field after comment submission
  document.getElementById("name").value = "";
  document.getElementById("comment").value = "";
});
