require('dotenv').config();
const fdo_key = process.env.fdo_key;
const { EmbedBuilder, ButtonBuilder } = require('discord.js');
const { flag } = require('country-emoji');
const { paginationEmbed } = require('../../../../Structures/Functions/paginationEmbed');

module.exports = {
    subCommandGroup: "sports.soccer.matches",

    async execute(interaction, client) {
        const data = await fetch('https://api.football-data.org/v4/matches',
            {
                method: 'GET',
                headers: { 'X-Auth-Token': fdo_key }
            }).then(res => res.json());

        // Invalid API Key
        if (data.message === 'Invalid authentication credentials') throw new Error(data.message);

        // Handling Player Not Found error
        if (data.error) return data;

        const pages = await matchesQueue(data.matches)

        const button1 = new ButtonBuilder()
            .setCustomId('previousbtn')
            .setLabel('<')
            .setStyle('Secondary');
        const button2 = new ButtonBuilder()
            .setCustomId('nextbtn')
            .setLabel('>')
            .setStyle('Secondary');

        const buttonList = [button1, button2]

        return paginationEmbed(interaction, pages, buttonList);

    }
}

function matchesQueue(matches) {
    const embeds = [];
    for (let i = 0; i < matches.length; i++) {
        const embed = new EmbedBuilder()
            .setColor("Blurple")
            .setTitle(`${matches[i].competition.name}`)
            .setThumbnail(matches[i].competition.emblem)
            .setDescription(`**${matches[i].stage}** - **${matches[i].group}**
            \n${flag(matches[i].homeTeam.name) || matches[i].homeTeam.shortName} | **${matches[i].homeTeam.tla}** - **${matches[i].awayTeam.tla}** | ${flag(matches[i].awayTeam.name) || matches[i].awayTeam.shortName}`)
            .addFields(
                { name: 'START TIME', value: `${(new Date(matches[i].utcDate)).toString()}` },
                { name: 'SCORE', value: `**${matches[i].score.fullTime.home | 0}** - **${matches[i].score.fullTime.away | 0}**`, inline: true },
                { name: 'STATUS', value: `${matches[i].status}`, inline: true },
            )
            .setTimestamp()
        embeds.push(embed);
    }
    return embeds;
}