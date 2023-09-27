import service from "./service.js";
import { profileTmpl } from "./template.js";

const container = document.querySelector(".profiles");
const likeBtn = document.querySelector(".likebtn");
const nomore = document.querySelector(".no-profiles");

let profileArray = [];
let currentProfile = 0;

const showProfile = async () => {
  const profiles = await service.getProfiles();
  profileArray = profiles;
  console.log("profile array", profileArray);

  if (profileArray.length > 0) {
    container.innerHTML = "";
    container.insertAdjacentHTML(
      "beforeend",
      profileTmpl(profileArray[currentProfile])
    );

    showinfo();
  } else {
    console.log("There are no profiles in your array");
  }
};

const likedProfiles = [];

showProfile();

const likeProfile = () => {
  likeBtn.addEventListener("click", (e) => {
    if (profileArray.length > 0) {
      profileArray.splice(currentProfile, 1);

      currentProfile = (currentProfile + 1) % profileArray.length;
      container.innerHTML = "";
      container.insertAdjacentHTML(
        "beforeend",
        profileTmpl(profileArray[currentProfile])
      );
      showinfo();
    } else {
      nomore.classList.add("active");
      console.log("There are no profiles to like.");
      console.log("profilearray", profileArray);
    }
  });
};

likeProfile();

const showinfo = () => {
  const profileWindow = document.querySelector(".profile-window");
  const profileBtn = document.querySelector(".user");

  profileBtn.addEventListener("click", () => {
    profileWindow.classList.toggle("active");
    profileBtn.classList.toggle("active");

    console.log(profileWindow);
  });
};
