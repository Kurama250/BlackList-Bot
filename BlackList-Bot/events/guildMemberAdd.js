'use strict';

module.exports = (client, member) => {
    try {
        client.bdd.query("SELECT * FROM user_blacklist WHERE user_id = ?", [member.id], function (err, result) {
            if (err) throw err;
            if (result.length !== 0) {
                member.send(`Vous avez etait BlackList suite a votre comportement !`)
                member.ban({ reason: `Vous avez etait BlackList. : ${result[0].reason}` })
                    .then(console.log)
                    .catch(console.error);
            }
        });

    } catch (err) {
        console.log(err)
    }
}
