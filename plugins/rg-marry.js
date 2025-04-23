/* Código creado por Deyin */

import fs from 'fs';
import path from 'path';

const marriagesFile = path.resolve('src/database/marry.json');
let proposals = {}; 
let marriages = loadMarriages();
const confirmation = {};

function loadMarriages() {
    return fs.existsSync(marriagesFile) ? JSON.parse(fs.readFileSync(marriagesFile, 'utf8')) : {};
}

function saveMarriages() {
    fs.writeFileSync(marriagesFile, JSON.stringify(marriages, null, 2));
}

function getSpouse(user) {
    return marriages[user] ? `@${marriages[user].split('@')[0]}` : 'Nadie';
}

const handler = async (m, { conn, command }) => {
    const isPropose = command === 'marry';
    const isDivorce = command === 'divorce';
    const isAccept = command === 'si';
    const isDecline = command === 'no';

    const userIsMarried = (user) => marriages[user] !== undefined;

    try {
        if (isPropose) {
            const proposee = m.quoted?.sender || m.mentionedJid?.[0];
            const proposer = m.sender;

            if (!proposee) {
                if (userIsMarried(proposer)) {
                    return await conn.reply(m.chat, `《✧》 Ya estás casado con *@${marriages[proposer].split('@')[0]}*\n> Puedes divorciarte con: *#divorce*`, m, {
                        mentions: [marriages[proposer]]
                    });
                } else {
                    throw 'Debes mencionar a alguien para proponer matrimonio.\n> Ejemplo: *#marry @usuario*';
                }
            }

            if (userIsMarried(proposer)) throw `Ya estás casado con @${marriages[proposer].split('@')[0]}`;
            if (userIsMarried(proposee)) throw `${await conn.getName(proposee)} ya está casado con @${marriages[proposee].split('@')[0]}`;
            if (proposer === proposee) throw '¡No puedes proponerte matrimonio a ti mismo!';

            proposals[proposer] = proposee;

            const proposerName = await conn.getName(proposer);
            const proposeeName = await conn.getName(proposee);

            const confirmationMessage = `ᥫᩣ ${proposerName} te ha propuesto matrimonio. ${proposeeName} ¿aceptas? ʕ•ᴥ•ʔ\n\n*Debes responder con:*\n> ✎ *#si* » para aceptar\n> ✎ *#no* » para rechazar.`;

            await conn.reply(m.chat, confirmationMessage, m, { mentions: [proposee, proposer] });

            confirmation[proposee] = {
                proposer,
                timeout: setTimeout(() => {
                    conn.sendMessage(m.chat, { text: '*⌛ Se acabó el tiempo. La propuesta fue cancelada.*' }, { quoted: m });
                    delete confirmation[proposee];
                }, 300000) // 5 minutos
            };

        } else if (isDivorce) {
            if (!userIsMarried(m.sender)) throw 'No estás casado con nadie.';

            const partner = marriages[m.sender];
            delete marriages[m.sender];
            delete marriages[partner];
            saveMarriages();

            await conn.reply(m.chat,
                `✐ @${m.sender.split('@')[0]} y @${partner.split('@')[0]} se han divorciado. ×᷼×`,
                m,
                { mentions: [m.sender, partner] }
            );

        } else if (isAccept) {
            if (!(m.sender in confirmation)) throw 'No tienes ninguna propuesta pendiente.';

            const { proposer, timeout } = confirmation[m.sender];

            delete proposals[proposer];
            marriages[proposer] = m.sender;
            marriages[m.sender] = proposer;
            saveMarriages();

            conn.sendMessage(m.chat, {
                text: `◎ ─━──━─❖─━──━─ ◎\n¡Se han Casado! ฅ^•ﻌ•^ฅ*:･ﾟ✧\n\n*•.¸♡  @${proposer.split('@')[0]} y @${m.sender.split('@')[0]}\n\n\`Felicidades, disfruten su luna de miel\`\n◎ ─━──━─❖─━──━─ ◎`,
                mentions: [proposer, m.sender]
            }, { quoted: m });

            clearTimeout(timeout);
            delete confirmation[m.sender];

        } else if (isDecline) {
            if (!(m.sender in confirmation)) throw 'No tienes ninguna propuesta pendiente.';

            const { proposer, timeout } = confirmation[m.sender];
            clearTimeout(timeout);
            delete confirmation[m.sender];
            delete proposals[proposer];

            await conn.sendMessage(m.chat, {
                text: `✦ ${await conn.getName(m.sender)} ha rechazado la propuesta de @${proposer.split('@')[0]}.`,
                mentions: [proposer, m.sender]
            }, { quoted: m });
        }

    } catch (e) {
        await conn.reply(m.chat, typeof e === 'string' ? e : '❌ Ocurrió un error.', m);
    }
};

handler.command = ['marry', 'divorce', 'si', 'no'];
export default handler;
    
