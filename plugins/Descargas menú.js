let handler = async (m, { conn }) => {
  let name = await conn.getName(m.sender)
  
  // Obtener la hora actual
  let currentHour = new Date().getHours()
  
  // Determinar el saludo según la hora
  let greeting = ''
  if (currentHour >= 6 && currentHour < 12) {
    greeting = '¡Buenos días!'
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = '¡Buenas tardes!'
  } else {
    greeting = '¡Buenas noches!'
  }

  // Reaccionar al mensaje con el emoji de música primero
  await conn.sendMessage(m.chat, { react: { text: '🎵', key: m.key } })

  // Texto del menú con saludo
  let menuText = `
${greeting} *${name}*, ¿Qué deseas escuchar este día?

╭──⬣「 *Herramientas* 」⬣
│
│  ≡◦ *Comando 1*
│  ✦ #play
│  ≡◦ *Comando 2*
│  ✦ #ytaudio
│  ≡◦ *Comando 3*
│  ✦ #play1
│ 🩵 Nota de mi owner:
│ si uno de mis comandos no 
│ funciona reporta ejemplo 
│              .reportar play
╰──⬣
  `

  // URL de la imagen
  let imageUrl = 'https://files.catbox.moe/j0ftmj.jpg'
  
  // Enviar mensaje con imagen y texto del menú
  await conn.sendFile(m.chat, imageUrl, 'thumbnail.jpg', menuText.trim(), m)
}

handler.help = ['musica']
handler.tags = ['main']
handler.command = ['musica']

export default handler
