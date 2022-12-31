const { SlashCommandBuilder } = require("@discordjs/builders");
const currentDate = new Date();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("time")
    .setDescription("This command tells you the date and time"),

  async execute(interaction, client) {
    await interaction.reply({
      content: "What am I a clock? The date and time is",
    });

    await interaction.channel.send(currentDate.toLocaleString());
  },
};
