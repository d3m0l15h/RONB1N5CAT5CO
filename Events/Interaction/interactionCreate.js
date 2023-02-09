module.exports = {
    name: "interactionCreate",

    execute(interaction, client) {
        if(interaction.isChatInputCommand()) {

            const command = client.commands.get(interaction.commandName);
            
            if(!command)
            return interaction.reply({
                content: "This command is outdated.",
                ephemeral: true
            });

            if(command.developer && interaction.user.id !== "390075791448342529")
            return interaction.reply({
                content: "This command is available for the developer.",
                ephemeral: true
            });

            const subCommand = interaction.options.getSubcommand(false);
            const subCommandGroup = interaction.options.getSubcommandGroup(false);

            if(subCommandGroup) {
                const subCommandGroupFile = client.subCommandGroups.get(`${interaction.commandName}.${subCommandGroup}.${subCommand}`);

                if(!subCommandGroupFile) 
                return interaction.reply({
                    content: "This subcommand group is outdated.",
                    ephemeral: true
                });

                subCommandGroupFile.execute(interaction, client)
            }
            else if(subCommand) {
                const subCommandFile = client.subCommands.get(`${interaction.commandName}.${subCommand}`);

                if(!subCommandFile) 
                return interaction.reply({
                    content: "This subcommand is outdated.",
                    ephemeral: true
                });

                subCommandFile.execute(interaction, client);

            } else command.execute(interaction, client);

        } else if(interaction.isButton()) {
            try {
            const Button = client.buttons.get(interaction.customId);

            if(Button.permission && !interaction.member.permissions.has(Button.permission))
                return interaction.reply({content: "You don't have permission to use this button", ephemeral: true});

            if(Button.ownerOnly && interaction.member.id !== interaction.guild.ownerId)
                return interaction.reply({content: "You don't have permission to use this button", ephemeral: true});

            Button.execute(interaction, client);
            } catch(err) {}
        }
        else return;
    }
}