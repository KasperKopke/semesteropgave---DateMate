import service from "./service.js";
import { profileTmpl } from "./template.js";

const profileWindow = document.querySelector(".profile-window");
const profileBtn = document.querySelector(".user");

profileBtn.addEventListener("click", () => {
  profileWindow.classList.toggle("active");
  profileBtn.classList.toggle("active");
});

const container = document.querySelector(".profiles");

const profiles = await service.getProfiles();

profiles.forEach((profil) => {
  container.insertAdjacentHTML("beforeend", profileTmpl(profil));
});
