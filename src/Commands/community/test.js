const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("This is the test commands"),
  async execute(interaction, client) {
    await interaction.reply({
      content: "I am alive but sometimes I wish I wasn't.",
    });
  },
};
