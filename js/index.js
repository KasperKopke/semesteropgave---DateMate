const profileWindow = document.querySelector(".profile-window");
const profileBtn = document.querySelector(".fa-user");

profileBtn.addEventListener("click", () => {
  profileWindow.classList.toggle("active");
});
