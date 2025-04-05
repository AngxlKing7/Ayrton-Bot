let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];
    if (!user) return;

    if (user.pickaxedurability >= 100) {
        return conn.reply(m.chat, '⚒️ Tu picota no necesita reparaciones.', m);
    }

    let costIron = 20;  // Cantidad de hierro requerido para reparar
    let costGold = 10;  // Cantidad de oro requerido

    if (user.iron < costIron || user.gold < costGold) {
        return conn.reply(m.chat, `❌ No tienes suficientes materiales para reparar la picota.\n🔩 *Hierro necesario:* ${costIron}\n🏅 *Oro necesario:* ${costGold}`, m);
    }

    user.iron -= costIron;
    user.gold -= costGold;
    user.pickaxedurability = 100; // Restaura la durabilidad a 100

    conn.reply(m.chat, '✅ Tu picota ha sido reparada con éxito y ahora tiene *100* de durabilidad.', m);
}

handler.help = ['reparar'];
handler.tags = ['economy'];
handler.command = ['reparar', 'fixpickaxe'];
handler.register = true;
handler.group = true;

export default handler;
