import ws from 'ws'

let handler = async (m, { conn, usedPrefix, isRowner }) => {
  // Obtención de datos de tiempo y estadísticas
  let _uptime = process.uptime() * 1000;
  let totalreg = Object.keys(global.db.data.users).length;
  let totalchats = Object.keys(global.db.data.chats).length;

  let uptime = clockString(_uptime);
  
  // Establecer conexión y grupos
  let users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])];
  const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats);
  const groupsIn = chats.filter(([id]) => id.endsWith('@g.us'));
  
  const totalUsers = users.length;

  // Calcular la velocidad de ejecución
  let old = performance.now();
  let neww = performance.now();
  let speed = neww - old;

  // Obtener uso de memoria
  const used = process.memoryUsage();

  // Crear la información a mostrar
  let info = `ᥫ᭡ Información - ${botname} ❀\n`;
  info += `ᰔᩚ  *◜Creador◞* ⇢ ${etiqueta}\n`;
  info += `🜸  *◜Prefijo◞* ⇢ [ ${usedPrefix} ]\n`;
  info += `✧  *◜Versión◞* ⇢ ${vs}\n`;
  info += `❖  *◜Chats Privados◞* ⇢ ${chats.length - groupsIn.length}\n`;
  info += `✎  *◜Total De Chats◞* ⇢ ${chats.length}\n`;
  info += `❍  *◜Usuarios◞* ⇢ ${totalreg}\n`;
  info += `❑  *◜Grupos◞* ⇢ ${groupsIn.length}\n`;
  info += `✰  *◜Actividad◞* ⇢ ${uptime}\n`;
  info += `ⴵ  *◜Velocidad◞* ⇢ ${(speed * 1000).toFixed(0) / 1000}\n`;
  info += `✦  *◜Sub-Bots Activos◞* ⇢ ${totalUsers || '0'}`;

  // Enviar el estado con imagen
  await conn.sendFile(m.chat, avatar, 'estado.jpg', info, fkontak);
}

handler.help = ['estado'];
handler.tags = ['info'];
handler.command = ['estado', 'status', 'estate', 'state', 'stado', 'stats'];
handler.register = false;

export default handler;

function clockString(ms) {
  let seconds = Math.floor((ms / 1000) % 60);
  let minutes = Math.floor((ms / (1000 * 60)) % 60);
  let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  return `${hours}h ${minutes}m ${seconds}s`;
}
