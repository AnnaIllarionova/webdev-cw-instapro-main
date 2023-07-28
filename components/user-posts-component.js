import { getUserPost } from "../api.js";
import { getToken, goToPage } from "../index.js";
import { USER_POSTS_PAGE } from "../routes.js";

export function renderUserPage({ userId }) {
    const appEl = document.getElementById("app");

    getUserPost({ token: getToken(), userId })
    .then((userPosts) => {
      console.log(userId);
      const userPostHtml = userPosts
        .map((post) => {
          return `
      <li class="post">
        <div class="post-header" data-user-id="${post.user.id}">
            <img src="${post.user.imageUrl}" class="post-header__user-image">
            <p class="post-header__user-name">${post.user.name}</p>
        </div>
        <div class="post-image-container">
          <img class="post-image" src="${post.imageUrl}">
        </div>
        <div class="post-likes">
          <button data-post-id="${post.id}" class="like-button">
            <img src="./assets/images/like-active.svg">
          </button>
          <p class="post-likes-text">
            Нравится: <strong>2</strong>
          </p>
        </div>
        <p class="post-text">
          <span class="user-name">${post.user.name}</span>
          ${post.description}
        </p>
        <p class="post-date">
          19 минут назад
        </p>
      </li>
      `;
        })
        .join("");

      const userPostsHtml = `
      <div class="page-container">
        <div class="header-container"></div>
        <ul class="posts">
          ${userPostHtml}
        </ul>
      </div>
      `;
      
      appEl.innerHTML = userPostsHtml;

      renderHeaderComponent({
        element: document.querySelector(".header-container"),
      });
    })
    .catch((error) => {
      console.warn("error");
      appEl.innerHTML = "Ошибка при загрузке страницы пользователя";
    });
  return goToPage(USER_POSTS_PAGE);
}


