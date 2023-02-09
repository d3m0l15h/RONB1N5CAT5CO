require('dotenv').config();
const girlcollections_key = process.env.girlcollections_key;
const { EmbedBuilder } = require('discord.js');

module.exports = {
    subCommand: "images.girls",
    
    async execute(interaction, client) { 
        let randOffset = Math.floor(Math.random() * 956)

        let data = await fetch(`https://api.tumblr.com/v2/blog/gaixinhchonloc.com/posts/photo?api_key=${girlcollections_key}&offset=${randOffset}`).then(res => res.json());

        const girls = new EmbedBuilder()
                        .setColor('DarkVividPink')
                        .setImage(data.response.posts[0].photos[0].original_size.url)

        return interaction.reply({embeds: [girls]})
    }
}


