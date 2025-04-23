import moment from 'moment-timezone';
import PhoneNumber from 'awesome-phonenumber';
import fetch from 'node-fetch';
import fs from 'fs';

const loadMarriages = () => {
    if (fs.existsSync('./src/database/marry.json')) {
        const data = JSON.parse(fs.readFileSync('./src/database/marry.json', 'utf-8'));
        global.db.data.marriages = data;
    } else {
        global.db.data.marriages = {};
    }
};

let handler = async (m, { conn, args }) => {
    loadMarriages();

    let userId;
    if (m.quoted && m.quoted.sender) {
        userId = m.quoted.sender;
    } else {
        userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
    }

    let user = global.db.data.users[userId];

    let name = conn.getName(userId);
    let cumpleanos = user.birth || 'Sin especificar :< (#setbirth)';
    let genero = user.genre || 'No especificado';
    let description = user.description || 'Sin Descripción';
    let exp = user.exp || 0;
    let nivel = user.level || 0;
    let role = user.role || 'Esclavo';
    let coins = user.coin || 0;
    let bankCoins = user.bank || 0;
    let moneda = '💰'; // Puedes cambiar el ícono de moneda si quieres
    let dev = 'Bot Personal'; // Cambia esto si quieres poner el nombre del creador

    let perfil = await conn.profilePictureUrl(userId, 'image').catch(_ => 'https://qu.ax/ESiZc.jpg');
    let imgBuffer = await conn.getFile(perfil).then(res => res.data).catch(_ => null);

    let isMarried = userId in global.db.data.marriages;
    let partner = isMarried ? global.db.data.marriages[userId] : null;
    let partnerName = partner ? await conn.getName(partner) : 'Nadie';

    let profileText = `
「👑」 *Perfil* ✰@${userId.split('@')[0]}✰
${description}

✎ Edad » ${user.age || 'Desconocida'}
✎ *Cumpleaños* » ${cumpleanos}
✎ *Género* » ${genero}
✎ Casado con » ${isMarried ? partnerName : 'Nadie'}

♛ *Experiencia* » ${exp.toLocaleString()}
♛ *Nivel* » ${nivel}

⛁ *Coins Cartera* » ${coins.toLocaleString()} ${moneda}
⛃ *Coins Banco* » ${bankCoins.toLocaleString()} ${moneda}
✰ *Premium* » ${user.premium ? '✅' : '❌'}
    `.trim();

    if (imgBuffer) {
        await conn.sendMessage(m.chat, {
            image: imgBuffer,
            caption: profileText,
            contextInfo: {
                mentionedJid: [userId]
            }
        }, { quoted: m });
    } else {
        await conn.sendMessage(m.chat, {
            text: profileText,
            contextInfo: {
                mentionedJid: [userId]
            }
        }, { quoted: m });
    }
};

handler.help = ['profile'];
handler.tags = ['rg'];
handler.command = ['profile', 'perfil'];
handler.register = false;
handler.group = true;

export default handler;
