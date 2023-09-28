export const profileTmpl = (profile) => `

      <img
        src="${profile.image}"
        alt=""
      />
      <div class="profile-info">
        <div class="topInfo">
          <h2 class="name">${profile.name}</h2>
          <h2 class="age">${profile.age}</h2>
        </div>
        <p class="bio">
        ${profile.bio}
        </p>
      </div>
      <div class="profile-window">
        <div class="topInfo infobox">
          <h2 class="name">${profile.name}</h2>
          <h2 class="age">${profile.age}</h2>
        </div>
        <div class="profile-window-content">
          <h2>Bio:</h2>
          <p>
          ${profile.bio}
          </p>
          <h2>Interesser:</h2>
          <div class="tags">
            <ul>
              <li>${profile.hobby1}</li>
              <li>${profile.hobby2}</li>
              <li>${profile.hobby3}</li>
              <li>${profile.hobby4}</li>
            </ul>
          </div>
        </div>
      </div>
   
`;

export const likedViewTmpl = (profile) => `

<div class="profile">
<img
  src="${profile.image}"
  alt=""
/>
</div>
`;
