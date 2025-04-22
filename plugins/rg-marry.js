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

const handler = async (m, { conn, command, mentionedJid }) => {
    const isPropose = /^marry$/i.test(command);
    const isDivorce = /^divorce$/i.test(command);

    const userIsMarried = (user) => marriages[user] !== undefined;

    try {
        if (isPropose) {
            const proposee = m.quoted?.sender || mentionedJid?.[0];
            const proposer = m.sender;

            // Si es una aceptación
            if (!proposee && confirmation[proposer]) {
                throw new Error(`Para aceptar debes usar: *#marry @usuario*`);
            }

            if (confirmation[proposer] && proposee) {
                const expectedProposer = confirmation[proposer].proposer;
                if (proposee !== expectedProposer) {
                    throw new Error(`La propuesta que tienes pendiente es de @${expectedProposer.split('@')[0]}`);
                }

                // Aceptación
                const { timeout } = confirmation[proposer];
                marriages[proposer] = proposee;
                marriages[proposee] = proposer;
                saveMarriages();

                conn.sendMessage(m.chat, {
                    text: `◎ ─━──━─❖─━──━─ ◎\n¡Se han Casado! ฅ^•ﻌ•^ฅ*:･ﾟ✧\n\n*•.¸♡  @${proposer.split('@')[0]} y @${proposee.split('@')[0]}\n\n\`Felicidades, disfruten de su luna de miel\`\n◎ ─━──━─❖─━──━─ ◎`,
                    mentions: [proposer, proposee]
                }, { quoted: m });

                clearTimeout(timeout);
                delete confirmation[proposer];
                delete proposals[proposee];
                return;
            }

            // Si no hay aceptación, es propuesta
            if (!proposee) {
                if (userIsMarried(proposer)) {
                    return await conn.reply(m.chat, `《✧》 Ya estás casado con *@${marriages[proposer].split('@')[0]}*\n> Puedes divorciarte con el comando: *#divorce*`, m, { mentions: [marriages[proposer]] });
                } else {
                    throw new Error('Debes mencionar a alguien para proponer matrimonio.\n> Ejemplo » *#marry @usuario*');
                }
            }

            if (userIsMarried(proposer)) throw new Error(`Ya estás casado con @${marriages[proposer].split('@')[0]}.`);
            if (userIsMarried(proposee)) throw new Error(`@${proposee.split('@')[0]} ya está casado con @${marriages[proposee].split('@')[0]}.`);
            if (proposer === proposee) throw new Error('¡No puedes proponerte matrimonio a ti mismo!');

            proposals[proposer] = proposee;
            const confirmationMessage = `ᥫᩣ @${proposer.split('@')[0]} te ha propuesto matrimonio @${proposee.split('@')[0]} ¿aceptas? ʕ•ᴥ•ʔ\n\n*Debes responder con:*\n> ✎ Aceptar » *#marry @${proposer.split('@')[0]}*`;
            await conn.reply(m.chat, confirmationMessage, m, { mentions: [proposer, proposee] });

            confirmation[proposee] = {
                proposer,
                timeout: setTimeout(() => {
                    conn.sendMessage(m.chat, { text: '*〘⌛〙Se acabó el tiempo, no se obtuvo respuesta. La propuesta de matrimonio fue cancelada.*' }, { quoted: m });
                    delete confirmation[proposee];
                }, 300000)
            };
        } else if (isDivorce) {
            if (!userIsMarried(m.sender)) throw new Error('No estás casado con nadie.');

            const partner = marriages[m.sender];
            delete marriages[m.sender];
            delete marriages[partner];
            saveMarriages();

            await conn.reply(m.chat, `✐ @${m.sender.split('@')[0]} y @${partner.split('@')[0]} se han divorciado. ×᷼×`, m, { mentions: [m.sender, partner] });
        }
    } catch (error) {
        await conn.reply(m.chat, `《✧》 ${error.message}`, m);
    }
};

handler.tags = ['fun'];
handler.help = ['marry *@usuario*', 'divorce'];
handler.command = ['marry', 'divorce'];
handler.group = true;

export default handler;
