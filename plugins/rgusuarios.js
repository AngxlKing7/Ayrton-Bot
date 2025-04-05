import db from '../lib/database.js'

let handler = async function (m, { conn }) {
  const users = global.db.data.users
  const totalRegistrados = Object.values(users).filter(u => u.registered === true).length
  const totalreg = Object.keys(users).length  // Total de usuarios en la base

  let message = `♡✧  𝗧𝗢𝗧𝗔𝗟 𝗗𝗘 𝗨𝗦𝗨𝗔𝗥𝗜𝗢𝗦 𝗥𝗘𝗚𝗜𝗦𝗧𝗥𝗔𝗗𝗢𝗦  ✧♡\n`
  message += `╭───────────────╮\n`
  message += `🌸 Total registrados: *${totalRegistrados}* usuarios\n`
  message += `🌼 Total en la base: *${totalreg}* usuarios\n`
  message += `╰───────────────╯\n`
  message += `Gracias por confiar en 2B.`

  await m.reply(message)
}

handler.help = ['usuariosregistrados']
handler.tags = ['owner']
handler.command = ['usuariosregistrados', 'registrados']

export default handler
