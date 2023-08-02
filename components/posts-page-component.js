import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, toggleUserLike, getToken, renderApp, user } from "../index.js";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import { deletePost } from "../api.js";

export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);

  const postsHtml = posts
    .map((post, index) => {
      const postWasCreated = formatDistanceToNow(new Date(post.createdAt), {
        locale: ru,
      });
      return `
    <li class="post">
      <div class="post-header" data-user-id="${post.user.id}">
          <img src="${post.user.imageUrl}" class="post-header__user-image">
          <p class="post-header__user-name">${post.user.name}</p>
      </div>
      <div class="post-image-container">
        <img class="post-image" src="${post.imageUrl}">
      </div>
      <div class="button-box">
      <div class="post-likes">
        <button data-index="${index}" data-post-id="${
        post.id
      }" class="like-button">
              <img src=${
                post.isLiked
                  ? "./assets/images/like-active.svg"
                  : "./assets/images/like-not-active.svg"
              }></img>
        </button>
        <p class="post-likes-text">
          Нравится: <strong>${post.likes
            .map(({ name }) => name)
            .join(", ")}</strong>
        </p>
      </div>
      <div class="post-delete">
          <button class="delete-button" data-post-id="${post.id}" data-user-id="${post.user.id}">
          <img class="delete-button-size" src="./assets/images/trash-svgrepo-com.svg"><img>
          </button>
       </div>
      </div>
      <p class="post-text">
        <span class="user-name">${post.user.name}</span>
        ${post.description}
      </p>
      <p class="post-date">
       Опубликован: ${postWasCreated} назад
      </p>
    </li>
    `;
    })
    .join("");

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <ul class="posts">
        ${postsHtml}
      </ul>
    </div>`;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }

  for (let likeEl of document.querySelectorAll(".like-button")) {
    likeEl.addEventListener("click", () => {
      toggleUserLike({ postId: likeEl.dataset.postId });
    });
  }

  for (const deleteEl of document.querySelectorAll(".delete-button")) {
    deleteEl.addEventListener("click", () => {

      const postId = deleteEl.dataset.postId;
      console.log(user._id);
        console.log(deleteEl.dataset.userId);

      if (user._id === deleteEl.dataset.userId) {
        
        deletePost({ postId, token: getToken() })
      .then(() => {
        renderApp();
      });
      } else {
        alert("Вы не можете удалять чужие посты")
      }
    });
  }
}
