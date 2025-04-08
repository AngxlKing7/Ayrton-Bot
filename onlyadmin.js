let isAdminOnlyMode = false;  // Variable para controlar el modo de solo admin

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    // Verificar si el comando es 'on' o 'off'
    if (command === 'onlyadmin') {
      if (text === 'on') {
        isAdminOnlyMode = true;  // Activar el modo solo admin
        return;  // No respondemos nada
      } 
      
      if (text === 'off') {
        isAdminOnlyMode = false;  // Desactivar el modo solo admin
        return;  // No respondemos nada
      }
    }

    // Si está activado el modo solo admin y el usuario no es admin, no hace nada
    if (isAdminOnlyMode && !await conn.isGroupAdmin(m.sender, m.chat)) {
      return;  // No responde si no es un administrador
    }

    // Aquí va la lógica de lo que deseas que haga el bot
    // El bot puede responder si el modo está desactivado o si el usuario es administrador

  } catch (error) {
    console.error('Error:', error);
  }
};

handler.command = ['onlyadmin'];  // Comando principal
handler.help = ['onlyadmin'];     // Ayuda para el comando
handler.tags = ['admin'];         // Etiqueta para el comando
handler.group = true;             // Solo en grupos
handler.register = true;          // Habilitar el comando

export default handler;
