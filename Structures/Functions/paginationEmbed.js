const {
  ActionRowBuilder,
  Message,
  EmbedBuilder,
  ButtonBuilder,
} = require("discord.js");

/**
 * Creates a pagination embed
 * @param {Message} interaction
 * @param {EmbedBuilder[]} pages
 * @param {ButtonBuilder[]} buttonList
 * @param {number} timeout
 * @returns
 */
async function paginationEmbed(
  interaction,
  pages,
  buttonList,
  timeout = 10000
) {
  if (!interaction && !interaction.channel) throw new Error("Channel is inaccessible.");
  if (!pages) throw new Error("Pages are not given.");
  if (!buttonList) throw new Error("Buttons are not given.");
  if (buttonList[0].style === "LINK" || buttonList[1].style === "LINK")
    throw new Error(
      "Link buttons are not supported with discordjs-button-pagination"
    );
  if (buttonList.length !== 2) throw new Error("Need two buttons.");

  let page = 0;

  if (pages.length === 1) return await interaction.reply({
    embeds: [pages[0].setFooter({ text: `Page ${page + 1} / ${pages.length}` })]
  });

  const row = new ActionRowBuilder().setComponents(buttonList);

  const curPage = await interaction.reply({
    embeds: [pages[page].setFooter({ text: `Page ${page + 1} / ${pages.length}` })],
    components: [row],
  });

  const filter = (i) =>
    i.custom_id === buttonList[0].custom_id ||
    i.custom_id === buttonList[1].custom_id;

  const collector = curPage.createMessageComponentCollector({
    filter,
    time: timeout
  });

  collector.on("collect", async (i) => {
    switch (i.customId) {
      case buttonList[0].data.custom_id:
        page = page > 0 ? --page : pages.length - 1;
        break;
      case buttonList[1].data.custom_id:
        page = page + 1 < pages.length ? ++page : 0;
        break;
      default:
        break;
    }
    await i.deferUpdate();
    await i.editReply({
      embeds: [pages[page].setFooter({ text: `Page ${page + 1} / ${pages.length}` })],
      components: [row],
    });
    collector.resetTimer();
  });

  collector.on("end", async (collected) => {
    const disabledRow = new ActionRowBuilder().addComponents(
      buttonList[0].setDisabled(true),
      buttonList[1].setDisabled(true)
    );
    await interaction.editReply({
      embeds: [pages[page].setFooter({ text: `Page ${page + 1} / ${pages.length}` })],
      components: [disabledRow],
    });
  })

};
module.exports = { paginationEmbed };