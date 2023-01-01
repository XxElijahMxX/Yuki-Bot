const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, AttachmentBuilder } = require(`discord.js`);
const levelSchema = require("../../schemas.js/level");
const Canvacord = require("canvacord");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`rank`)
    .setDescription(`Gets a members rank in the server`)
    .addIntegerOption((option) =>
      option
        .setName("user")
        .setDescription(`The member you want to check the rank of`)
        .setRequired(false)
    ),
  async execute(interaction) {
    const { options, user, guild } = interaction;

    const Member = options.getMember("user") || user;

    const member = guild.members.cache.get(Member.id);

    const Data = await levelSchema.findOne({
      Guild: guild.id,
      User: member.id,
    });

    const embed = new EmbedBuilder()
      .setColor("Aqua")
      .setDescription(`:white_check_mark: ${member} has not gained any XP yet`);

    if (!Data) return await interaction.reply({ embeds: [embed] });

    await interaction.deferReply();

    const Required = Data.Level * 20 + 20;

    const rank = new Canvacord.Rank()
      .setAvatar(member.displayAvatarURL({ forseStatic: true }))
      .setBackground(
        "IMAGE",
        `https://www.google.com/url?sa=i&url=https%3A%2F%2Fwallpapercrafter.com%2F108187-darling-in-the-franxx-zero-two-%2528darling-in-the-franxx%2529-anime-girls-pink-hair.html&psig=AOvVaw15R1ze0awV2qhDUsjxpDy8&ust=1672632062338000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCODg8pC-pfwCFQAAAAAdAAAAABAG`
      )
      .setCurrentXP(Data.XP)
      .setRequiredXP(Required)
      .setRank(1, "Rank", false)
      .setLevel(Data.Level, "Level")
      .setUsername(member.user.username)
      .setDiscriminator(member.user.discriminator);

    const Card = await rank.build();

    const attachment = new AttachmentBuilder(Card, { name: "rank,png" });

    const embed2 = new EmbedBuilder()
      .setColor("Aqua")
      .setTitle(`${member.user.username}'s Level / Rank`)
      .setImage("attachment://rank.png");

    await interaction.editReply({ embeds: [embed2], files: [attachment] });
  },
};
