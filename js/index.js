import swipesystem from "./swipesystem.service.js";
import { likedProfiles, dislikedProfiles } from "./swipesystem.service.js";

const app = {};

app.init = async () => {
  swipesystem.init();
};

app.init();
