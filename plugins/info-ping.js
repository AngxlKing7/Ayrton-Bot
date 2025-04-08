import { totalmem, freemem } from 'os'
import osu from 'node-os-utils'
import { performance } from 'perf_hooks'
import { sizeFormatter } from 'human-readable'
import speed from 'performance-now'
import { spawn, exec, execSync } from 'child_process'

const format = sizeFormatter({ std: 'JEDEC', decimalPlaces: 2, keepTrailingZeroes: false, render: (literal, symbol) => `${literal} ${symbol}B` })

var handler = async (m, { conn, args }) => {
    await m.react('🤍')

    let timestamp = speed()
    let latensi = speed() - timestamp
    let _muptime = process.uptime() * 1000
    let muptime = clockString(_muptime)

    let chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
    let groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce).map(v => v[0])

    let url = args.length > 0 ? args.join(' ') : '' 

    // Hora en la zona de México
    let horaMX = new Date().toLocaleString("es-MX", { timeZone: "America/Mexico_City", hour: "numeric", hour12: false })
    horaMX = parseInt(horaMX)

    let nombreUsuario = conn.getName(m.sender) || "querido usuario"
    let saludo = horaMX < 6 ? `🌙 Buenas noches, ${nombreUsuario}` : 
                 horaMX < 12 ? `🌸 Buenos días, ${nombreUsuario}` : 
                 horaMX < 19 ? `🌅 Buenas tardes, ${nombreUsuario}` : 
                 `🌙 Buenas noches, ${nombreUsuario}`

    let cpu = await osu.cpu.usage()
    let cpuTexto = `💾 *CPU:* ${cpu.toFixed(2)}%`
    
    let versionBot = "Ayrton v2.1"

    let texto = `
╭───────────────❀
│ ${saludo} 
│ 🤖 *Versión:* ${versionBot}
╰───────────────❀

╭━━━✦ ✦━━━╮
┃ 🚀 *Velocidad:*  
┃ ⏱️ ${latensi.toFixed(4)} ms
╰━━━✦ ✦━━━╮

╭━━━✦ ✦━━━╯
┃ ⏳ *Actividad:*  
┃ ⌛ ${muptime}
╰━━━✦ ✦━━━╮

╭━━━✦ ✦━━━╯
┃ 💻 *Servidor:*  
┃ 🖥️ RAM: ${format(totalmem() - freemem())} / ${format(totalmem())}
┃ ${cpuTexto}
╰━━━✦ ✦━━━╮

${url ? `📡 *Enlace:* ${url}` : ''}
`.trim()

    await conn.sendFile(m.chat, "https://files.catbox.moe/j0ftmj.jpg", '2B.jpg', texto, null)
}

handler.help = ['ping']
handler.tags = ['bot']
handler.command = ['ping', 'speed', 'p']

handler.register = false

export default handler

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
