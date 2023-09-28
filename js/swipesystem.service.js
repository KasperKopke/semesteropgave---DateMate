import service from "./service.js";
import { likedViewTmpl, profileTmpl } from "./template.js";

const swipesystem = {};

swipesystem.init = async () => {
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
    likedView();
  };

  // Funktion til at håndtere at vise profiloplysninger
  const showinfo = () => {
    const profileBtn = document.querySelector(".user");
    const profileWindow = document.querySelector(".profile-window");
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

  const likedViewWrapper = document.querySelector(".liked-wrapper");
  const likedViewProfile = document.querySelector(".liked-profiles");
  const likesBtn = document.querySelector(".fa-heart");

  likesBtn.addEventListener("click", () => {
    likedViewProfile.classList.toggle("active");
  });

  const likedView = (profiles = likedProfiles) => {
    likedViewWrapper.innerHTML = "";
    profiles.forEach((element) => {
      likedViewWrapper.innerHTML += likedViewTmpl(element);
    });
  };

  const filterMaleBtn = document.querySelector("#filter-male");
  const filterFemaleBtn = document.querySelector("#filter-female");
  const filterAllBtn = document.querySelector("#filter-all");

  const filterProfilesByGender = (gender) => {
    if (gender === "All") {
      likedView();
    } else {
      const filteredProfiles = likedProfiles.filter(
        (profile) => profile.gender === gender
      );
      likedView(filteredProfiles);
    }
  };

  filterMaleBtn.addEventListener("click", () => filterProfilesByGender("male"));
  filterFemaleBtn.addEventListener("click", () =>
    filterProfilesByGender("female")
  );
  filterAllBtn.addEventListener("click", () => filterProfilesByGender("All"));

  showProfile();
};

export const likedProfiles = [];
export const dislikedProfiles = [];
export default swipesystem;
