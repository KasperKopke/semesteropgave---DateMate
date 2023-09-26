const profileWindow = document.querySelector(".profile-window");
const profileBtn = document.querySelector(".user");

profileBtn.addEventListener("click", () => {
  profileWindow.classList.toggle("active");
  profileBtn.classList.toggle("active");
});
