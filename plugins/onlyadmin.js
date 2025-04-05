export async function before(m, { conn, participants }) {
  if (!m.isGroup) return false; // Solo aplica en grupos

  let chat = global.db.data.chats[m.chat] || { onlyAdmin: false };
  const groupAdmins = participants.filter(p => p.admin).map(p => p.id);
  const isAdmin = groupAdmins.includes(m.sender);

  // Si onlyAdmin está activado y el usuario no es admin, bloquear
  if (chat.onlyAdmin && !isAdmin) {
    await conn.sendMessage(m.chat, { 
      text: '❌ *Solo los administradores* pueden usar el bot en este momento.' 
    }, { quoted: m });
    return true; // Detiene la ejecución
  }

  return false; // Permite continuar
}

// Configuración inicial de la base de datos
if (!global.db.data) global.db.data = {};
if (!global.db.data.chats) global.db.data.chats = {};