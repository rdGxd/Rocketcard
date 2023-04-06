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
  if (!user) {
    alert("Usuário invalido ou não encontrado");
    userName();
  } else {
    // Se o valor não for vazio ou nulo era passa a URL para o getUseR() e liberar o section com as informações
    section.style.display = "flex";
    getUser(url);
  }
}

// Função para consumir a API do GitHub
async function getUser(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    idUser.textContent = data.login;
    imgProfile.setAttribute("src", `${data.avatar_url}`);
    followers.textContent += `${data.followers}`;
    following.textContent += `${data.following}`;
    repository.textContent += `${data.public_repos}`;
    // Verifica se o usuário está em alguma empresa
    if (data.company) {
      company.textContent = data.company;
    }
    // Verifica se o usuário informo alguma localização
    if (data.location) {
      localization.textContent = data.location;
    }
  } catch (e) {
    console.error(e);
  }
}
// Função para gerar as cores de forma aleatória
function randomColors() {
  const R = Math.floor(Math.random() * 255);
  const G = Math.floor(Math.random() * 255);
  const B = Math.floor(Math.random() * 255);
  section.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
}

userName();
