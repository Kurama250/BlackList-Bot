'use strict';

module.exports = (client, message) => {
    if (message.author.bot || !message.channel.guild) {
        return ;
    }

    let author = message.author;
    try {
        client.bdd.query("SELECT * FROM user_blacklist WHERE user_id = ?", [author.id], function (err, result) {
            if (err) throw err;
            if (result.length !== 0) {
                message.author.send(`Vous avez etait Bannis du serveur **${message.guild.name}** car vous avez etait BlackList !`)
                message.guild.members.cache.get(message.author.id).ban({ reason: `Automatique Ban suite a une BlackList !` })
                    .then(console.log)
                    .catch(console.error);
            }
        });

    } catch (err) {
        console.log(err)
    }

    const data = message.content;

    const args = data.slice(client.prefix.length).trim().split(/ +/g);


    if (!data.startsWith(client.prefix)) {
        return;
    }

    const command = client.commands.find(cmd => cmd.aliases.includes(args[0])) || client.commands.get(args[0]);
    if (!command) {
        return ;
    }
    if(command.perms !== 'everyone') {
        if(!message.member.permission.has(command.perms)) {
            return message.channel.send('Vous avez pas la permissions pour effectuez cette commande !')
        }
    }

    try {
        command.run(client, message, args)
    } catch (err) {
        client.emit('error',err);
    }
};
