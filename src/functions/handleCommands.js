const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");

const clientId = "1056028453792661504";
const guildId = "803105882086834277";

module.exports = (client) => {
  client.handleCommands = async (commandFolders, path) => {
    client.commandArray = [];
    for (folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`${path}/${folder}`)
        .filter((file) => file.endsWith(".js"));
      for (const file of commandFiles) {
        const command = require(`../Commands/${folder}/${file}`);
        client.commands.set(command.data.name, command);
        client.commandArray.push(command.data.toJSON());
      }
    }

    const rest = new REST({
      version: "9",
    }).setToken(process.env.DISCORD_TOKEN);

    (async () => {
      try {
        console.log("Refreshing application (/) commands.");

        await rest.put(Routes.applicationCommands(clientId), {
          body: client.commandArray,
        });

        console.log("Successfully reloaded all the (/) commands.");
      } catch (error) {
        console.error(error);
      }
    })();
  };
};
