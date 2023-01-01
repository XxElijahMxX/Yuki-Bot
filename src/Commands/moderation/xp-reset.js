const { SlashCommandBuilder } = require(`@discordjs/builders`);
const {
  EmbedBuilder,
  AttachmentBuilder,
  PermissionsBitField,
} = require(`discord.js`);
const levelSchema = require("../../schemas.js/level");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`xp-reset`)
    .setDescription(`Resets all of the servers XP levels`),

  async execute(interaction) {
    const perm = new EmbedBuilder()
      .setColor("Aqua")
      .setDescription(
        `:white_checkmark: Sorry nii san but you don't have permission to reset user xp levels`
      );
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.Administrator
      )
    )
      return await interaction.reply({ embeds: [perm], ephemeral: true });

    const { guildId } = interaction;

    levelSchema.deleteMany({ Guild: guildId }, async (err, data) => {
      const embed = new EmbedBuilder()
        .setColor("Aqua")
        .setDescription(
          `:white_check_mark: All of the users have XP has been reset to n00b XD`
        );

      await interaction.reply({ embeds: [embed] });
    });
  },
};
