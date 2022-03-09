'use strict';

const Command = require("../../structure/Command.js");

class Staff extends Command {
    constructor() {
        super({
            name: 'staff',
            category: 'dev',
            description: 'Allows you to add and/or remove staffs who are allowed to add/remove people from the blacklist.',
            usage: 'staff',
            example: ['staff <add/remove> <@user/id>'],
            aliases: []
        });
    }

    async run(client, message, args) {
        if (message.author.id === client.config.owner.id) {
            if (args[1] === "add") {
                let member = message.mentions.members.first() || message.guild.members.cache.get(args[2]) || message.member;
                if (!member) return message.channel.send("Mentionne le ou note son ID.");
                try {
                    client.bdd.query("SELECT * FROM user_staff WHERE user_id = ?", [member.id], function (err, result) {
                        if (err) throw err;
                        if (result.length === 0) {
                            client.bdd.query(`INSERT INTO user_staff SET ?`, {user_id: member.id});
                            message.channel.send(`Cette personne **${member.id}** a maintenant la permission.`)
                        } else {
                            message.channel.send(`Cette personne **${member.id}** a deja la permission.`)
                        }
                    });

                } catch (err) {
                    console.log(err)
                }
            } else if (args[1] === "remove") {
                let member = message.mentions.members.first() || message.guild.members.cache.get(args[2]) || message.member;
                if (!member) return message.channel.send("Mentionne le ou note son ID.");
                try {
                    client.bdd.query("SELECT * FROM user_staff WHERE user_id = ?", [member.id], function (err, result) {
                        if (err) throw err;
                        if (result.length !== 0) {
                            client.bdd.query(`DELETE FROM user_staff WHERE user_id = ?`, [member.id]);
                            message.channel.send(`Cette personne **${member.id}** n'a plus la permission.`)
                        } else {
                            message.channel.send(`Cette personne **${member.id}** n'a pas la permission.`)
                        }
                    });

                } catch (err) {
                    console.log(err)
                }
            }


        } else {
            message.channel.send("Tu ne peux pas donner la permission sale fils de pute.")
        }

    }
}

module.exports = new Staff;
