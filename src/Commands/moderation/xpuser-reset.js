const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  EmbedBuilder,
  AttachmentBuilder,
  PermissionsBitField,
} = require(`discord.js`);
const levelSchema = require("../../schemas.js/level");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`xpuser-reset`)
    .setDescription(`Resets a members XP`)
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription(`The member you want to reset the rank of`)
        .setRequired(true)
    ),
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

    const target = interaction.options.getUser("user");

    levelSchema.deleteMany(
      { Guild: guildId, User: target.id },
      async (err, data) => {
        const embed = new EmbedBuilder()
          .setColor("Aqua")
          .setDescription(
            `:white_check_mark: ${target.tag}'s rank has been reset to n00b XD`
          );

        await interaction.reply({ embeds: [embed] });
      }
    );
  },
};
