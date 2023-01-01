const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  EmbedBuilder,
  AttachmentBuilder,
  PermissionsBitField,
} = require(`discord.js`);
const levelSchema = require("../../schemas.js/level");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`xp-leaderboard`)
    .setDescription(`Shows the servers leaderboard`),

  async execute(interaction) {
    const { guild, client } = interaction;

    let text = "";

    const embed1 = new EmbedBuilder()
      .setColor("Aqua")
      .setDescription(
        `:white_check_mark: None of you scrubs are on the leaderboard yet!`
      );

    const Data = await levelSchema
      .find({ Guild: guild.id })
      .sort({
        XP: -1,
        Level: -1,
      })
      .limit(10);

    if (!Data) return await interaction.reply({ embeds: [embed1] });

    await interaction.deferReply();

    for (let counter = 0; counter < Data.length; ++counter) {
      let { User, XP, Level } = Data[counter];

      const value = (await client.users.fetch(User)) || "Unknown Member";

      const member = value.tag;

      text += `${counter + 1}. ${member} | XP: ${XP} | Level: ${Level} \n`;

      const embed = new EmbedBuilder()
        .setColor("Aqua")
        .setTitle(`${interaction.guild.name}'s XP Leaderboard:`)
        .setDescription(`\`\`\`${text}\`\`\``)
        .setTimestamp()
        .setFooter({ text: "XP Leaderboard" });

      interaction.editReply({ embeds: [embed] });
    }
  },
};
