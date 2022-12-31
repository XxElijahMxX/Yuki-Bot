const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const e = require("express");
const { execute } = require("../community/test");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription(
      "This command deletes a specified number of messages from a channel"
    )
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("The amount of messages to delete")
        .setMinValue(1)
        .setMaxValue(150)
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const amount = interaction.options.getInteger("amount");
    const channel = interaction.channel;

    if (!interaction.member.permissions.has(PermissionsBitField.ManageMessages))
      return await interaction.reply({
        content: "XD Nii san you don't have the rights to use this command",
        ephemeral: true,
      });
    if (!amount)
      return await interaction.reply({
        content: "Baka you didn't set an amount of messages for me to delete!",
        ephemeral: true,
      });
    if (amount > 150 || amount < 1)
      return await interaction.reply({
        content:
          "Admin san how many messages do you want me to delete? (1-150)",
        ephemeral: true,
      });

    await interaction.channel.bulkDelete(amount).catch((err) => {
      return;
    });

    const embed = new EmbedBuilder()
      .setColor("Aqua")
      .setDescription(`:white_check_mark: Deleted **${amount}** messages.`);

    await interaction.reply({ embeds: [embed] }).catch((err) => {
      return;
    });
  },
};
