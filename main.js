const btn = document.querySelector("button");
const section = document.querySelector("section");

btn.addEventListener("click", randomColor);

// Mostra um prompt na tela pedindo ao usuário para colocar o User name do GitHub
function userName() {
  const nome = prompt("Digite seu nome de usuário do GitHub: ");
  const url = `https://api.github.com/users/${nome}`;
  if (nome === "" || nome === null) {
    section.style.display = "none"
    userName();
  } else {
    section.style.display= "flex"
    getUser(url);
  }
}

// Função para pegar os dados da API do GitHub
function getUser(url) {
  axios
    .get(url)
    .then((response) => {
      const data = response.data;
      console.log(data);
      idUser.textContent = data.login;
      imgProfile.setAttribute("src", `${data.avatar_url}`);
      followers.textContent = `${data.followers} Seguidores`;
      following.textContent = `${data.following} Seguindo`;
      repository.textContent = `${data.public_repos} Repositórios`;
      if (data.company !== null) {
        company.textContent = data.company;
      }
      position.textContent = data.location;
    })
    .catch((error) => console.error(error));
}

// Função para gerar as cores de forma aleatória
function randomColor() {
  let valor1 = Math.floor(Math.random() * 255);
  let valor2 = Math.floor(Math.random() * 255);
  let valor3 = Math.floor(Math.random() * 255);
  section.style.backgroundColor = `rgb(${valor1}, ${valor2}, ${valor3})`;
}

userName();
