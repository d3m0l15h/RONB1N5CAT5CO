const { EmbedBuilder  } = require('discord.js');
const config = require('../../../../Structures/config.json')
module.exports = {
    subCommandGroup: "images.waifu.sfw",

    async execute(interaction, client) {
        const { options } = interaction;
        let categories = config.waifu
        let category = options.getString('categories')
        if(!categories.includes(category)) 
            return interaction.reply({embeds: [new EmbedBuilder()
                                                    .setColor('DarkRed')
                                                    .setDescription(`The category is invalid. Get help at **/pics waifu help**.`)],
                                    ephemeral: true})
        const response = await fetch(`https://api.waifu.pics/sfw/${category}`);
        const data = await response.json();
        
        const waifu = new EmbedBuilder()
                            .setColor('Random')
                            .setImage(data.url)
        return interaction.reply({ embeds: [waifu] })
    }
}