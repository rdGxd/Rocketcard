const btn = document.querySelector("button");
const section = document.querySelector("section");

// Sempre que o botão é clicado chama a função randomColor()
btn.addEventListener("click", randomColors);

// Chama um prompt na tela pedindo ao usuário para colocar o Username do GitHub necessário para buscar na API do GITHUB
function userName() {
  // Salva o nome do usuário e passar para o URL
  const user = prompt("Digite seu Username do GitHub: ");
  // Junta a URL da API + USERNAME
  const url = `https://api.github.com/users/${user}`;
  // Verifica se o valor é nulo ou vazio se for ele chama a função userName() novamente
  if (user === "" || user === null) {
    userName();
  } else {
    // Se não tiver vazio exibe a tela com os dados e chama a função getUser() passando a URL
    section.style.display = "flex";
    getUser(url);
  }
}

// Função para pegar os dados da API do GitHub
function getUser(url) {
  // Vai até a API buscar os dados necessário para exibir na tela
  axios
    .get(url)
    .then((response) => {
      const data = response.data;
      idUser.textContent = data.login;
      imgProfile.setAttribute("src", `${data.avatar_url}`);
      followers.textContent += `${data.followers}`;
      following.textContent += `${data.following}`;
      repository.textContent += `${data.public_repos}`;
      // Verifica se o usuário coloco alguma empresa
      if (data.company !== null) {
        company.textContent = data.company;
      }
      // Verifica se o usuário coloco alguma localização
      if (data.location !== null) {
        localization.textContent = data.location;
      }
    })
    .catch((error) => console.error(error));
}

// Função para gerar as cores de forma aleatória
function randomColors() {
  const valor1 = Math.floor(Math.random() * 255);
  const valor2 = Math.floor(Math.random() * 255);
  const valor3 = Math.floor(Math.random() * 255);
  section.style.backgroundColor = `rgb(${valor1}, ${valor2}, ${valor3})`;
}

userName();
