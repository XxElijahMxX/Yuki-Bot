const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  PermissionsBitField,
  Permissions,
  MessageManager,
  Embed,
  Collection,
  Events,
} = require(`discord.js`);

const fs = require("fs");
const { data } = require("./Commands/community/test");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();

require("dotenv").config();

const functions = fs
  .readdirSync("./src/functions")
  .filter((file) => file.endsWith(".js"));
const eventFiles = fs
  .readdirSync("./src/events")
  .filter((file) => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/Commands");

(async () => {
  for (file of functions) {
    require(`./functions/${file}`)(client);
  }
  client.handleEvents(eventFiles, "./src/events");
  client.handleCommands(commandFolders, "./src/commands");
  client.login(process.env.DISCORD_TOKEN);
})();

const levelSchema = require("./schemas.js/level");
client.on(Events.MessageCreate, async (message) => {
  const { guild, author } = message;
  if (!guild || author.bot) return;

  levelSchema.findOne(
    { Guild: guild.id, User: author.id },
    async (err, data) => {
      if (err) throw err;
      if (!data) {
        levelSchema.create({
          Guild: guild.id,
          User: author.id,
          XP: 0,
          Level: 0,
        });
      }
    }
  );

  const channel = message.channel;

  const give = 1;

  const data = await levelSchema.findOne({ Guild: guild.id, User: author.id });

  if (!data) return;

  const requiredXP = data.Level * data.Level * 20 + 20;

  if (data.XP + give >= requiredXP) {
    data.XP += give;
    data.Level += 1;
    await data.save();

    if (!channel) return;

    const embed = new EmbedBuilder()
      .setColor("Aqua")
      .setDescription(`${author}, UwU pog champ you reached ${data.Level}!`);

    channel.send({ embeds: [embed] });
  } else {
    data.XP += give;
    data.save();
  }
});
