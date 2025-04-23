var handler = async (m, { conn, participants }) => {
    if (!m.mentionedJid[0] && !m.quoted) {
        return conn.reply(m.chat, '⚠️ Debes mencionar a un usuario para expulsarlo.', m);
    }

    let user = m.mentionedJid[0] || m.quoted.sender;
    let groupMetadata = await conn.groupMetadata(m.chat);
    let ownerGroup = groupMetadata.owner || m.chat.split`-`[0] + '@s.whatsapp.net';
    let ownerBot = global.owner[0][0] + '@s.whatsapp.net';

    let bot = participants.find(p => p.id === conn.user.jid);
    if (!bot || !bot.admin) {
        return conn.reply(m.chat, '《✧》 Ayrton-Bot debe ser administrador del grupo para poder expulsar a un usuario.', m);
    }

    if ([conn.user.jid, ownerGroup, ownerBot].includes(user)) {
        return conn.reply(m.chat, '⚠️ No puedes eliminar a este usuario.', m);
    }

    try {
        await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
    } catch (e) {
        console.error(e);
        return conn.reply(m.chat, '❌ No se pudo eliminar al usuario. Puede que tenga protecciones o que el bot no tenga permisos suficientes.', m);
    }
};

handler.help = ['kick'];
handler.tags = ['grupo'];
handler.command = ['kick', 'echar', 'sacar', 'ban'];
handler.admin = true;
handler.group = true;
handler.botAdmin = true;

export default handler;
