import speed from 'performance-now'

var handler = async (m, { conn, args }) => {
    let timestamp = speed()
    let latensi = speed() - timestamp

    let texto = `✰ ¡Pong!\n> Tiempo ⴵ ${latensi.toFixed(4)} ms`.trim()

    await conn.sendMessage(m.chat, { text: texto }, { quoted: m })
}

handler.help = ['ping']
handler.tags = ['bot']
handler.command = ['ping', 'speed', 'p']
handler.register = false

export default handler
