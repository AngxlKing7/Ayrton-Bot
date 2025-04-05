let handler = async (m, { conn, isOwner }) => {
    if (!isOwner) return m.reply('❌ Solo el owner puede usar este comando.');

    // Resetear los yenes de todos los usuarios
    let users = global.db.data.users;
    for (let jid in users) {
        users[jid].coin = 0; // Reiniciar moneda
        users[jid].bank = 0; // Reiniciar banco
    }

    m.reply('✅ Se han reiniciado los yenes de todos los usuarios.');
};

handler.help = ['resetbaltop'];
handler.tags = ['rpg'];
handler.command = ['resetbaltop'];
handler.group = true;
handler.owner = true;

export default handler;
