const gp1 = 'https://chat.whatsapp.com/Lf5b8iMlbCbEvYlDQC6SgC'; // Reemplaza con tu enlace

export async function before(m, {conn, isAdmin, isBotAdmin, isOwner, isROwner}) {
  if (m.isBaileys && m.fromMe) return true;
  if (m.isGroup) return false;
  if (!m.message) return true;
  if (m.text.includes('PIEDRA') || m.text.includes('PAPEL') || m.text.includes('TIJERA') || m.text.includes('serbot') || m.text.includes('jadibot')) return true;
  
  const bot = global.db.data.settings[this.user.jid] || {};

  if (m.chat === '120363322713003916@newsletter') return true;

  if (bot.antiPrivate && !isOwner && !isROwner) {
    await m.reply(`⚠️ Hola @${m.sender.split`@`[0]}, mi creador ha desactivado los comandos en los chats privados, por lo que serás bloqueado. Si quieres usar los comandos del bot, únete al grupo principal:\n\n${gp1}`, false, {mentions: [m.sender]});
    await this.updateBlockStatus(m.chat, 'block');
  }
  
  return false;
}
