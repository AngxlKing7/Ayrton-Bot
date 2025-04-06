let handler = async (m, { conn, args, mentionedJid }) => {
  if (!mentionedJid || mentionedJid.length === 0) {
    return m.reply('Etiqueta al bot que será el *principal*, por ejemplo:\n\n#setprimary @bot')
  }
  
  const botPrincipal = mentionedJid[0]
  global.mainBot = botPrincipal
  
  await m.react('✅')
}
handler.help = ['setprimary @bot']
handler.tags = ['grupo']
handler.command = ['setprimary']
handler.admin = true

export default handler
