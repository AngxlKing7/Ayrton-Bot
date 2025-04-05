let handler = async (m, { conn, args, participants }) => {
    const emoji = '🤍'; // Definir emoji
    const moneda = 'Yenes'; // Definir moneda

    // Obtener los usuarios desde la base de datos
    let users = Object.entries(global.db.data.users).map(([key, value]) => {
        return { ...value, jid: key };
    });

    // Ordenar usuarios por coin + bank
    let sortedLim = users.sort((a, b) => (b.coin || 0) + (b.bank || 0) - (a.coin || 0) - (a.bank || 0));

    // Validar el argumento args[0] para determinar cuántos mostrar
    let len = args[0] && !isNaN(args[0]) ? Math.min(10, Math.max(parseInt(args[0]), 1)) : Math.min(10, sortedLim.length);
    
    let text = `「${emoji}」Los usuarios con más *¥${moneda}* son:\n\n`;

    text += sortedLim.slice(0, len).map(({ jid, coin, bank }, i) => {
        let total = (coin || 0) + (bank || 0);
        return `✰ ${i + 1} » *${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]}:*` +
               `\n\t\t Total→ *¥${total} ${moneda}*`;
    }).join('\n');

    // Responder con el texto y las menciones
    await conn.reply(m.chat, text.trim(), m, { mentions: conn.parseMention(text) });
}

handler.help = ['baltop'];
handler.tags = ['rpg'];
handler.command = ['baltop', 'eboard'];
handler.group = true;
handler.register = true;
handler.fail = null;
handler.exp = 0;

export default handler;
