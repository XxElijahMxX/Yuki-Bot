const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  PermissionsBitField,
  Permissions,
} = require(`discord.js`);
require(`dotenv`).config();

const prefix = "!";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(" Yuki is online!");

  client.user.setActivity(`Tired of my role in this slice of life`, {
    type: "Watching",
  });
});

client.on("messageCreate", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  // message array

  const messageArray = message.content.split(" ");
  const argument = messageArray.slice(1);
  const cmd = messageArray[0];

  //COMMANDS

  // test commands

  if (command === "test") {
    message.channel.send("Yuki is online!");
  }

  if (command === "die") {
    message.channel.send("Shine Baka!");
  }

  if (command === "love") {
    message.channel.send("Aishiteru");
  }

  if (command === "bro") {
    message.channel.send("Nani Shiteru No Aniki");
  }

  if (command === "hello") {
    message.channel.send("Hello <@4091>!");
  }
});

client.login(process.env.DISCORD_TOKEN);
