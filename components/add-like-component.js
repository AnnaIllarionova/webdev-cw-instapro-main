import { getLikes, getPosts, removeLike } from "../api.js";
import { getToken } from "../index.js";

export function addLike({ posts }) {
  const likeButtons = document.querySelectorAll(".like-button");
  //console.log(likeButtons);
  

  for (const likeButton of likeButtons) {
    likeButton.addEventListener("click", () => {
      
      const index = parseInt(likeButton.dataset.index);
      const post = posts[index];

      const id = likeButton.dataset.postId;
      console.log(id);

      if (post.isLiked) {
        removeLike({ token: getToken(), id})
        .then(() => {
          post.isliked = false;

          //getPosts({ token: getToken() });
        })
      } else {
        getLikes({ token: getToken(), id })
        .then(() => {
          post.isliked = true;
          //getPosts({ token: getToken() });
        });
      }  
    });
  }
}


