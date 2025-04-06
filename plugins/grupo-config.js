let handler = async (m, { conn, command }) => {
  let isClose = {
    open: 'not_announcement',
    close: 'announcement'
  }[command]

  if (isClose === undefined) return

  await conn.groupSettingUpdate(m.chat, isClose)
  await m.react('✅')
}

handler.help = ['open', 'close']
handler.tags = ['grupo']
handler.command = ['open', 'close']
handler.admin = true
handler.botAdmin = true

export default handler
