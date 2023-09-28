import service from "./service.js";
import { profileTmpl } from "./template.js";

// Elementer fra DOM
const container = document.querySelector(".profiles");
const likeBtn = document.querySelector(".likebtn");
const nomore = document.querySelector(".no-profiles");
const dislikeBtn = document.querySelector(".fa-xmark");

// Data og indeks
let profileArray = [];
let currentProfile = 0;
const likedProfiles = [];
const dislikedProfiles = [];

// Funktion til at vise en profil
const showProfile = async () => {
  const profiles = await service.getProfiles();
  profileArray = profiles;

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

// Funktion til at håndtere at lide en profil
const likeProfile = () => {
  if (profileArray.length > 0) {
    likedProfiles.push(profileArray[currentProfile]);
    profileArray.splice(currentProfile, 1);

    if (profileArray.length > 0) {
      currentProfile = (currentProfile + 1) % profileArray.length;
      container.innerHTML = "";
      container.insertAdjacentHTML(
        "beforeend",
        profileTmpl(profileArray[currentProfile])
      );
      showinfo();
    } else {
      // Håndter tilfælde, når der ikke er flere profiler tilbage
      nomore.classList.add("active");
      console.log("There are no profiles to like.");
      console.log("liked profile array", likedProfiles);

      // Ryd HTML og fjern klikbegivenhedslytteren
      container.innerHTML = "";
      likeBtn.removeEventListener("click", likeProfile);
    }

    console.log("liked profiles", likedProfiles);
    console.log("diliked profiles", dislikedProfiles);
  } else {
    nomore.classList.add("active");
  }
};

// Funktion til at håndtere at vise profiloplysninger
const showinfo = () => {
  const profileWindow = document.querySelector(".profile-window");
  const profileBtn = document.querySelector(".user");

  profileBtn.addEventListener("click", () => {
    // Toggles "active" klassen på profileWindow
    profileWindow.classList.toggle("active");
  });
};

// Kald showinfo() for at tilføje eventlytteren
showinfo();

// Funktion til at håndtere at mislike en profil
const dislikeProfile = () => {
  if (profileArray.length > 0) {
    dislikedProfiles.push(profileArray[currentProfile]);
    profileArray.splice(currentProfile, 1);

    if (profileArray.length > 0) {
      currentProfile = (currentProfile + 1) % profileArray.length;
      container.innerHTML = "";
      container.insertAdjacentHTML(
        "beforeend",
        profileTmpl(profileArray[currentProfile])
      );
      showinfo();
    } else {
      container.innerHTML = "";
      // Håndter dette, hvis der ikke er flere profiler tilbage
      nomore.classList.add("active");
      console.log("There are no profiles to dislike.");
      console.log("disliked profile array", dislikedProfiles);

      // Fjern EventListeneren
      dislikeBtn.removeEventListener("click", dislikeProfile);
    }

    console.log("liked profiles", likedProfiles);
    console.log("diliked profiles", dislikedProfiles);
  } else {
    nomore.classList.add("active");
  }
};

likeBtn.addEventListener("click", likeProfile);
dislikeBtn.addEventListener("click", dislikeProfile);

showProfile();
