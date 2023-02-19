const btn = document.querySelector("button");
const section = document.querySelector("section");

// Mostra um prompt na tela pedindo ao usuário para colocar o User name do GitHub
function userName() {
  const nome = prompt("Digite seu nome de usuário do GitHub: ");
  const url = `https://api.github.com/users/${nome}`;
  if (nome === "" || nome === null) {
    userName();
  } else {
    section.style.display = "flex";
    getUser(url);
  }
}

// Função para pegar os dados da API do GitHub
function getUser(url) {
  axios
    .get(url)
    .then((response) => {
      const data = response.data;
      idUser.textContent = data.login;
      imgProfile.setAttribute("src", `${data.avatar_url}`);
      followers.textContent += `${data.followers}`;
      following.textContent += `${data.following}`;
      repository.textContent += `${data.public_repos}`;
      if (data.company !== null) {
        company.textContent = data.company;
      }
      if (data.location !== null) {
        localization.textContent = data.location;
      }
    })
    .catch((error) => console.error(error));
}

userName();

// Função para gerar as cores de forma aleatória
function randomColor() {
  let valor1 = Math.floor(Math.random() * 255);
  let valor2 = Math.floor(Math.random() * 255);
  let valor3 = Math.floor(Math.random() * 255);
  section.style.backgroundColor = `rgb(${valor1}, ${valor2}, ${valor3})`;
}

btn.addEventListener("click", randomColor);
