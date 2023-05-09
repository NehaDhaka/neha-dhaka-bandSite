"use strict";

const bandSiteURL = "https://project-1-api.herokuapp.com/";
const apiKey = "3d8edb80-438c-476e-ab76-52098c9f9260";

const commentsURL = `${bandSiteURL}comments/?api_key=${apiKey}`;

// ASSIGNING HTML ELEMENTS TO JS VARIABLES
const containerOldComments = document.querySelector(".comments__old-comments");
const btnSubmitForm = document.querySelector(".comments__form-btn");
const commentForm = document.querySelector(".comments__form");

// ------------------------------------------------//
//        Creating displayComment() function
// ------------------------------------------------//

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
  topDate.textContent = new Date(commentObj.timestamp)
    .toLocaleString("en-GB")
    .split(",")[0];
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
  axios
    .get(commentsURL)
    .then((comments) => {
      for (let i = comments.data.length - 1; i >= 0; i--) {
        displayComment(comments.data[i]);
      }
      return comments.data;
    })
    .then((comments) => {
      const timeStamps = document.querySelectorAll(".comments__top-date");
      for (let i = 0; i < comments.length - 3; i++) {
        const now 
        // timeStamps[i].textContent = 300;
      }
      // const now = new Date();
      // for (let i = comments.length - 1; i > 2; i--) {
      //   const diff = Math.floor((now - comments.timestamp) / 1000);
      //   if (diff < 60) {
      //     timeStamps[i].textContent = `${diff} second${
      //       diff >= 1 ? "s" : ""
      //     } ago`;
      //   } else if (diff < 3600) {
      //     timeStamps[i].textContent = timeStamps[i].textContent = `${Math.floor(
      //       diff / 60
      //     )} minute${Math.floor(diff / 60) > 1 ? "s" : ""} ago`;
      //   } else if (diff < 86400) {
      //     timeStamps[i].textContent = `${Math.floor(diff / 3600)} hour${
      //       Math.floor(diff / 3600) > 1 ? "s" : ""
      //     } ago`;
      //   } else {
      //     timeStamps[i].textContent = `${Math.floor(diff / 86400)} day${
      //       Math.floor(diff / 86400) > 1 ? "s" : ""
      //     } ago`;
      //   }
      // }
    })
    .catch((error) => console.log(error));
};

displayAllComments();

//------------------------------------------------//
//     Creating updateCommentTime() function
//------------------------------------------------//

//------------------------------------------------//
//    Adding event listener to the comment form
//------------------------------------------------//

commentForm.addEventListener("submit", function (e) {
  //prevents the page from loading
  e.preventDefault();

  const newCommentName = document.getElementById("name");
  const newCommentText = document.getElementById("comment");

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

  axios
    .post(commentsURL, {
      name: newCommentName.value,
      comment: newCommentText.value,
    })
    .then(() => {
      displayAllComments();
    })

    .catch((error) => {
      console.log(error);
    });

  containerOldComments.innerHTML = "";

  //clears the input field after comment submission
  document.getElementById("name").value = "";
  document.getElementById("comment").value = "";
});
