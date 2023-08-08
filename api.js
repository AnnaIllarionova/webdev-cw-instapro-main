// Замени на свой, чтобы получить независимый от других набор данных.
// "боевая" версия инстапро лежит в ключе prod
// const personalKey = "prod";
const personalKey = "anna";
const baseHost = "https://wedev-api.sky.pro";
const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`;

//Получение всех постов из API
export function getPosts({ token }) {
  return fetch(postsHost, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }

      return response.json();
    })
    .then((data) => {
      //console.log(data.posts);
      return data.posts;
    });
}

//Добавить пост
export function postNewPost({ token, description, imageUrl }) {
  return fetch(postsHost, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: JSON.stringify({
      description,
      imageUrl,
    }),
  })
    .then((response) => {
      if (response.status === 400) {
        throw new Error("Не введено описание или не добавлена картинка");
      }
      return response.json();
    })
    .catch((error) => {
      if (error.message === "Не введено описание или не добавлена картинка") {
        alert("Введите описание или добавьте картинку");
      }
    });
}

//Получить посты конкретного пользователя
export function getUserPost({ token, userId }) {
  return fetch(postsHost + `/user-posts/${userId}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      console.log(userId);
      return response.json();
    })
    .then((data) => {
      console.log(data.posts);
      return data.posts;
    });
}

//Удалить пост
export function deletePost({ token, postId }) {
  return fetch(postsHost + `/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error("Нет авторизации");
      }
      return response.json();
    })
    .catch((error) => {
      if (error.message === "Нет авторизации") {
        alert("Авторизуйтесь, чтобы удалять свои посты");
      }
    });
}

// https://github.com/GlebkaF/webdev-hw-api/blob/main/pages/api/user/README.md#%D0%B0%D0%B2%D1%82%D0%BE%D1%80%D0%B8%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%D1%81%D1%8F
//Список зарегистрированных
export function registerUser({ login, password, name, imageUrl }) {
  return fetch(baseHost + "/api/user", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      name,
      imageUrl,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Такой пользователь уже существует");
    }
    return response.json();
  });
}

export function loginUser({ login, password }) {
  return fetch(baseHost + "/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Неверный логин или пароль");
    }
    return response.json();
  });
}

// Загружает картинку в облако, возвращает url загруженной картинки
export function uploadImage({ file }) {
  const data = new FormData();
  data.append("file", file);

  return fetch(baseHost + "/api/upload/image", {
    method: "POST",
    body: data,
  }).then((response) => {
    return response.json();
  });
}

//Поставить лайк
export function getLikes({ token, id }) {
  return fetch(postsHost + `/${id}/like`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error("Нет авторизации для того, чтобы лайкать посты");
      }
      return response.json();
    })
    .catch((error) => {
      if ((error.message = "Нет авторизации для того, чтобы лайкать посты")) {
        alert("Авторизуйтесь, чтобы поставить лайк");
      }
    });
}

//Поставить дислайк
export function removeLike({ token, id }) {
  return fetch(postsHost + `/${id}/dislike`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error("Нет авторизации, чтобы убирать лайк");
      }
      return response.json();
    })
    .catch((error) => {
      if (error.message === "Нет авторизации, чтобы убирать лайк") {
        alert("Авторизуйтесь, чтобы убрать лайк");
      }
    });
}
