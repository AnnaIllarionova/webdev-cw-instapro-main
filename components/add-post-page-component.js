import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <h3 class="form-title">
        Cтраница добавления поста
      </h3>
      <div class="form-inputs">
        <div class="upload-image-container"></div>
        <input type="text" id="comment-input" class="input" placeholder="Комментарий" />
        <button class="button" id="add-button">Добавить</button>
    </div>
  `;

    appEl.innerHTML = appHtml;

    document.getElementById("add-button").addEventListener("click", () => {
      const commentElement = document.getElementById("comment-input");
      onAddPostClick({
        description: commentElement.value
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll("&", "&amp;")
        .replaceAll('"', "&quot;"),
        imageUrl,
      });
      console.log(uploadImageContainer.value);
      console.log(commentElement.value);
    });
  };

  render();
  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  const uploadImageContainer = appEl.querySelector(".upload-image-container");
  let imageUrl = "";

  if (uploadImageContainer) {
    renderUploadImageComponent({
      element: appEl.querySelector(".upload-image-container"),
      onImageUrlChange(newImageUrl) {
        imageUrl = newImageUrl;
      },
    });
  }
}
