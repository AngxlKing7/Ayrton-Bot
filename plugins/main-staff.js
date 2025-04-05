let handler = async (m, { conn, command, usedPrefix }) => {
  // Reemplazar la ruta de la imagen por una URL
  let img = 'https://qu.ax/MuFZT.jpg'; // Coloca aquí tu URL de imagen

  let staff = `
━━━━━━━━━━━━━━━━━━━━━
       equipo de ayudante 
━━━━━━━━━━━━━━━━━━━━━

✧ *Dueño:* ➣ ${creador}
✧ *Bot:* ➣ ${botname}
✧ *Versión:* ➣ ${vs}
✧ *Librería:* ➣ ${libreria} ${baileys}

━━━━━━━━━━━━━━━━━━━━━

   creador de la bot:

━━━━━━━[ creador ]━━━━━━━
ᥫ᭡ *AngxlKing7*
> ✰ *Rol* » *Creador*
> ✦ *GitHub* » https://github.com/AngxlKing7/Ayrton-bot
━━━━━━━━━━━━━━━━━━━━━
`
  await conn.sendFile(m.chat, img, 'imagen.jpg', staff.trim(), fkontak)
}

handler.help = ['staff']
handler.command = ['colaboradores', 'staff']
handler.register = true
handler.tags = ['main']

export default handler
