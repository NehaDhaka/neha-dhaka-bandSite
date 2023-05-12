"use strict";

const bandSiteURL = "https://project-1-api.herokuapp.com/";
const apiKey = "3d8edb80-438c-476e-ab76-52098c9f9260";
const commentsURL = `${bandSiteURL}comments/?api_key=${apiKey}`;

const containerOldComments = document.querySelector(".comments__old-comments");
const btnSubmitForm = document.querySelector(".comments__form-btn");
const commentForm = document.querySelector(".comments__form");

const displayComment = (commentObj) => {
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

  const extrasContainer = document.createElement("div");
  extrasContainer.classList.add("comments__extras");
  oldCommentInformation.appendChild(extrasContainer);

  const likeIconContainter = document.createElement("div");
  likeIconContainter.classList.add("comments__likes");
  extrasContainer.appendChild(likeIconContainter);

  const likeNums = document.createElement("span");
  likeNums.textContent = ` ${commentObj.likes}`;

  const likeIcon = document.createElement("ion-icon");
  likeIcon.classList.add("comments__like");
  likeIcon.setAttribute("name", "heart");
  likeIconContainter.appendChild(likeIcon);
  likeIcon.addEventListener("click", () => {
    axios
      .put(`${bandSiteURL}comments/${commentObj.id}/like/?api_key=${apiKey}`)
      .then((response) => {
        likeNums.textContent = ` ${response.data.likes}`;
      });
  });

  likeIconContainter.appendChild(likeNums);

  const bin = document.createElement("ion-icon");
  bin.setAttribute("name", "trash-bin");
  bin.classList.add("comments__bin");
  extrasContainer.appendChild(bin);
  bin.addEventListener("click", () => {
    axios
      .delete(`${bandSiteURL}comments/${commentObj.id}/?api_key=${apiKey}`)
      .then(() => {
        containerOldComments.innerHTML = "";
        displayAllComments();
      });
  });
};

const updateTime = (comments) => {
  const timeStamps = document.querySelectorAll(".comments__top-date");
  const now = new Date();

  //compares the timestamp of the comment to the current time
  for (let i = 0; i < comments.length; i++) {
    const diff = Math.floor((now.getTime() - comments[i].timestamp) / 1000);
    if (diff < 60) {
      timeStamps[i].textContent = `${diff} second${diff > 1 ? "s" : ""} ago`;
    } else if (diff < 3600) {
      timeStamps[i].textContent = timeStamps[i].textContent = `${Math.floor(
        diff / 60
      )} minute${Math.floor(diff / 60) > 1 ? "s" : ""} ago`;
    } else if (diff < 86400) {
      timeStamps[i].textContent = `${Math.floor(diff / 3600)} hour${
        Math.floor(diff / 3600) > 1 ? "s" : ""
      } ago`;
    } else if (diff < 86400 * 30) {
      timeStamps[i].textContent = `${Math.floor(diff / 86400)} month${
        Math.floor(diff / 86400) > 1 ? "s" : ""
      } ago`;
    } else {
      timeStamps[i].textContent = `${Math.floor(
        diff / (86400 * 30 * 12)
      )} year${Math.floor(diff / 86400) > 1 ? "s" : ""} ago`;
    }
  }
};

const displayAllComments = () => {
  //get comments data from the api and pass it to the displayComment() function
  axios
    .get(commentsURL)
    .then((comments) => {
      comments.data.sort((a, b) => b.timestamp - a.timestamp);
      comments.data.forEach((comment) => {
        displayComment(comment);
      });
      return comments.data;
    })
    .then(updateTime)
    .catch((error) => console.log(error));
};

displayAllComments();

commentForm.addEventListener("submit", (e) => {
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
