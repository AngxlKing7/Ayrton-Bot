let handler = async (m, { conn, args }) => {
    if (!args.length) return conn.sendMessage(m.chat, { text: '⚠️ Por favor, escribe el texto que deseas repetir.' });

    let message = args.join(' ');
    let invisibleChar = '\u200B';
    let finalMessage = invisibleChar + message;

    let mentions = [...message.matchAll(/@(\d+)/g)].map(v => v[1] + '@s.whatsapp.net');

    try {
        await conn.sendMessage(m.chat, { text: finalMessage, mentions: mentions.length ? mentions : undefined });
    } catch (e) {
        console.error('Error enviando el mensaje:', e);
    }
};

handler.command = ['say', 'decir'];
handler.tags = ['tools'];
handler.group = true;

export default handler;
