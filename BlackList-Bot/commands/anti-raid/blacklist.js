'use strict';

const Command = require("../../structure/Command.js");

class Staff extends Command {
    constructor() {
        super({
            name: 'blacklist',
            category: 'anti-raid',
            description: 'Allows people who are staff to blacklist one person.',
            usage: 'blacklist',
            example: ['blacklist <add/remove> <@user/id> <reason>'],
            aliases: []
        });
    }

    async run(client, message, args) {
        let staff = client.bdd.query(`SELECT * FROM user_staff WHERE user_id = ?`, [message.author.id]);
        if (staff) {
            if (args[1] === "add") {
                let member = message.mentions.members.first() || message.guild.members.cache.get(args[2]);
                if (!member) return message.channel.send("Mentionne ou note son ID.");
                let reason = args[3].slice(" ");
                if(!reason) return message.channel.send("Note la raison s'il te plait.");
                try {
                    client.bdd.query("SELECT * FROM user_blacklist WHERE user_id = ?", [member.id], function (err, result) {
                        if (err) throw err;
                        if (result.length === 0) {
                            client.bdd.query(`INSERT INTO user_blacklist SET ?`, {user_id: member.id, reason: reason });
                            message.channel.send(`Cette personne **${member.id}** est maintenant BlackList a jamais : **${reason}** !`)
                        } else {
                            message.channel.send(`Cette personne **${member.id}** est blacklist : **${result.reason}** !`)
                        }
                    });

                } catch (err) {
                    console.log(err)
                }
            } else if (args[1] === "remove") {
                let member = message.mentions.members.first() || message.guild.members.cache.get(args[2]);
                if (!member) return message.channel.send("Mentionne ou note son ID.");
                try {
                    client.bdd.query("SELECT * FROM user_blacklist WHERE user_id = ?", [member.id], function (err, result) {
                        if (err) throw err;
                        if (result.length !== 0) {
                            client.bdd.query(`DELETE FROM user_blacklist WHERE user_id = ?`, [member.id]);
                            message.channel.send(`Cette personne **${member.id}** est maintenant deblacklist.`)
                        } else {
                            message.channel.send(`Cette personne **${member.id}** est pas blacklist.`)
                        }
                    });

                } catch (err) {
                    console.log(err)
                }
            }
        } else {
            await message.channel.send("Vous n'avez pas la permission.")
        }
    }
}

module.exports = new Staff;
