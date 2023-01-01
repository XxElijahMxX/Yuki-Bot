const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("time")
    .setDescription("This command tells you the date and time"),

  async execute(interaction, client) {
    await interaction.reply({
      content: "What am I a clock? The date and time is",
    });

    const currentDate = new Date();
    await interaction.channel.send(currentDate.toLocaleString());
  },
};
