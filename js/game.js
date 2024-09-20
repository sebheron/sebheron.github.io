import { Client } from "https://cdn.jsdelivr.net/npm/@gradio/client/dist/index.min.js";

const locations = [
  "woods",
  "forest",
  "cave",
  "mountain",
  "desert",
  "beach",
  "jungle",
  "swamp",
  "city",
  "village",
  "castle",
  "ruin",
  "temple",
  "tavern",
  "inn",
  "market",
  "shop",
  "library",
  "hospital",
  "graveyard",
  "prison",
  "church",
];

const themes = [
  "magic",
  "mystery",
  "horror",
  "comedy",
  "romance",
  "thriller",
  "sci-fi",
  "fantasy",
  "historical",
  "western",
  "noir",
  "dystopian",
  "post-apocalyptic",
  "cyberpunk",
  "steampunk",
  "superhero",
  "space opera",
  "time travel",
  "alternate history",
  "martial arts",
  "spy",
  "heist",
  "pirate",
  "detective",
];

const location = locations[Math.floor(Math.random() * locations.length)];
const theme = themes[Math.floor(Math.random() * themes.length)];

const model = "Qwen/Qwen2-72B-Instruct";
const dir = "/model_chat";
const system = `You are an adventure game. You will take me on an adventure through a creative world with the theme of ${theme} starting in a ${location}. I want you to provide 3 choices for me to make for each, these could be "go north" or "eat the fruit", anything around those lines. I want the response in the JSON format:
{
  prompt: [Prompt],
  choice1: [Choice 1],
  choice2: [Choice 2],
  choice3: [Choice 3]
}


Commence the game when I say "start".`;

const content = document.getElementById("content");
const start = document.getElementById("start");
const game = document.getElementById("game");
const loader = document.getElementById("loader");

const makeText = (text) => {
  const p = document.createElement("p");
  p.innerText = text;
  return p;
};

const makeButton = (text, onClick) => {
  const button = document.createElement("button");
  button.innerText = text;
  button.addEventListener("click", onClick);
  return button;
};

const selectButton = (primary, other1, other2) => {
  primary.disabled = true;
  other1.classList.add("hidden");
  other2.classList.add("hidden");
  setTimeout(() => {
    other1.remove();
    other2.remove();
  }, 300);
};

const request = async (client, history, query) => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  loader.classList.add("show");
  const response = await client.predict(dir, {
    query,
    history,
    system,
  });
  loader.classList.remove("show");
  await new Promise((resolve) => setTimeout(resolve, 400));

  const value = response.data[1];
  const gameData = JSON.parse(value[value.length - 1][1]);

  const text = makeText(gameData.prompt);
  const choice1 = makeButton(gameData.choice1, () => {
    request(client, value, gameData.choice1);
    selectButton(choice1, choice2, choice3);
  });
  const choice2 = makeButton(gameData.choice2, () => {
    request(client, value, gameData.choice2);
    selectButton(choice2, choice1, choice3);
  });
  const choice3 = makeButton(gameData.choice3, () => {
    request(client, value, gameData.choice3);
    selectButton(choice3, choice1, choice2);
  });
  game.appendChild(text);
  game.appendChild(choice1);
  game.appendChild(choice2);
  game.appendChild(choice3);
  game.classList.remove("hidden");
  choice3.scrollIntoView({ behavior: "smooth", block: "end" });
};

start.addEventListener("click", async () => {
  content.classList.add("hidden");
  setTimeout(() => {
    game.classList.add("hidden");
  }, 500);
  setTimeout(() => {
    game.innerHTML = "";
    loader.classList.add("show");
  }, 1000);

  try {
    const client = await Client.connect(model);
    await request(client, [], "start");
  } catch {
    loader.classList.remove("show");
    setTimeout(() => {
      game.innerHTML = "Something went wrong. Try again later.";
      game.classList.remove("hidden");
    }, 500);
  }
});
