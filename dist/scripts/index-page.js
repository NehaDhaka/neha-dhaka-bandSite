"use strict";

// ASSIGNING HTML ELEMENTS TO JS VARIABLES
const containerOldComments = document.querySelector(".comments__old-comments");
const btnSubmitForm = document.querySelector(".form__btn");
const commentForm = document.querySelector(".new-comment__form");

//  COMMENTS DATA
const commentsData = [
  {
    name: "Connor Walton",
    time: "02/17/2021",
    comment:
      "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
  },
  {
    name: "Emilie Beach",
    time: "01/09/2021",
    comment:
      "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
  },
  {
    name: "Miles Acosta",
    time: "12/20/2020",
    comment:
      "I can't stop listening. Every time I hear one of their songs the vocals it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can t get enough.",
  },
];

//------------------------------------------------//
//        Creating displayComment() function
//------------------------------------------------//

const displayComment = function (commentObj) {
  const oldCommentsContainer = document.querySelector(
    ".comments__old-comments"
  );

  const oldCommentSingle = document.createElement("div");
  oldCommentSingle.classList.add("old-comments__old-comment");
  oldCommentsContainer.appendChild(oldCommentSingle);

  const oldCommentImageContainer = document.createElement("div");
  oldCommentSingle.appendChild(oldCommentImageContainer);

  const oldCommentImage = document.createElement("div");
  oldCommentImage.classList.add("old-comment__img");
  oldCommentImageContainer.appendChild(oldCommentImage);

  const oldCommentInformation = document.createElement("div");
  oldCommentInformation.classList.add("old-comment__information");
  oldCommentSingle.appendChild(oldCommentInformation);

  const informationTop = document.createElement("div");
  informationTop.classList.add("information__top");
  oldCommentInformation.appendChild(informationTop);

  const topName = document.createElement("p");
  topName.classList.add("top__name");
  topName.textContent = commentObj.name;
  informationTop.appendChild(topName);

  const topDate = document.createElement("p");
  topDate.classList.add("top__date");
  topDate.textContent = commentObj.time;
  informationTop.appendChild(topDate);

  const informationBottom = document.createElement("p");
  informationBottom.classList.add("information__bottom");
  informationBottom.textContent = commentObj.comment;
  oldCommentInformation.appendChild(informationBottom);
};

//------------------------------------------------//
// Calling displayComment() function using forEach()
//------------------------------------------------//

commentsData.forEach((comment) => {
  displayComment(comment);
});
