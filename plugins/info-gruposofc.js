import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {

let grupos = `
*Ven a unirte a los grupos oficiales de y comparte momentos lindos con la comunidad:*

❥ *${namegrupo}*
> ✿ ${gp1}

❥ *${namecomu}*
> ✿ ${comunidad1}

*⌒☆⌒☆⌒☆⌒☆⌒☆⌒☆⌒☆⌒☆*

⚘ ¿El enlace no funciona? No te preocupes, entra aquí:

❥ *${namechannel}*
> ✿ ${channel}

❥ *${namechannel2}*
> ✿ ${channel2}

> *Con cariño, tu Neko dev* ${dev}
`

const imageUrl = 'http://imgfz.com/i/AvjqxfO.jpeg'

await conn.sendFile(m.chat, imageUrl, "grupos.jpg", grupos, m)

await m.react(emojis)

}

handler.help = ['grupos']
handler.tags = ['info']
handler.command = ['grupos', 'links', 'groups']

export default handler
