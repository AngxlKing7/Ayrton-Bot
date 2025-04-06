import { promises } from 'fs'
import { join } from 'path'

let handler = async (m, { conn, __dirname }) => {
  try {
    let { exp, limit, level } = global.db.data.users[m.sender]
    let name = await conn.getName(m.sender)
    let _uptime = process.uptime() * 1000
    let muptime = clockString(_uptime)

    let leerMas = '\u200e'.repeat(850)

    let menuText = `
*𝐇𝐨𝐥𝐚 ${name}! 𝐒𝐨𝐲 ✦2B✦ (𝐁𝐨𝐭-𝐅𝐞𝐦)*  
╭─┈↷
│ ✐ 𝓓𝓮𝓼𝓮𝓻𝓻𝓸𝓵𝓵𝓮𝓭 𝓹𝓸𝓻 Neykoor 💜
│ ➥ Tiempo activa: *${muptime}*
│ ✿ Temporada: *1 — El Florecer*  
│ ✐ ꒷ꕤ💎 ᴄᴀɴᴀʟ ᴏғɪᴄɪᴀʟ:
│ https://whatsapp.com/channel/0029VazHywx0rGiUAYluYB24
╰─────────────────
${leerMas}
》───「 𝗖𝗢𝗠𝗔𝗡𝗗𝗢𝗦 」───《

✿ 𝗖𝗼𝗺𝗮𝗻𝗱𝗼𝘀 𝗱𝗲 *Rpg*:

> ✦ Trabaja para ganar ${moneda}.
ᰔᩚ *#slut • #protituirse*
> ✦ Trabaja como prostituta y gana ${moneda}.
ᰔᩚ *#cf • #suerte*
> ✦ Apuesta tus ${moneda} a cara o cruz.
ᰔᩚ *#crime • #crimen
> ✦ Trabaja como ladrón para ganar ${moneda}.
ᰔᩚ *#ruleta • #roulette • #rt*
> ✦ Apuesta ${moneda} al color rojo o negro.
ᰔᩚ *#casino • #apostar*
> ✦ Apuesta tus ${moneda} en el casino.
ᰔᩚ *#slot*
> ✦ Apuesta tus ${moneda} en la ruleta y prueba tu suerte.
ᰔᩚ *#cartera • #wallet*
> ✦ Ver tus ${moneda} en la cartera.
ᰔᩚ *#banco • #bank*
> ✦ Ver tus ${moneda} en el banco.
ᰔᩚ *#deposit • #depositar • #d*
> ✦ Deposita tus ${moneda} al banco.
ᰔᩚ *#with • #retirar • #withdraw*
> ✦ Retira tus ${moneda} del banco.
ᰔᩚ *#transfer • #pay*
> ✦ Transfiere ${moneda} o XP a otros usuarios.
ᰔᩚ *#miming • #minar • #mine*
> ✦ Trabaja como minero y recolecta recursos.
ᰔᩚ *#buyall • #buy*
> ✦ Compra ${moneda} con tu XP.
ᰔᩚ *#daily • #diario*
> ✦ Reclama tu recompensa diaria.
ᰔᩚ *#cofre*
> ✦ Reclama un cofre diario lleno de recursos.
ᰔᩚ *#weekly • #semanal*
> ✦ Reclama tu regalo semanal.
ᰔᩚ *#monthly • #mensual*
> ✦ Reclama tu recompensa mensual.
ᰔᩚ *#steal • #robar • #rob*
> ✦ Intenta robarle ${moneda} a alguien.
ᰔᩚ *#robarxp • #robxp*
> ✦ Intenta robar XP a un usuario.
ᰔᩚ *#eboard • #baltop*
> ✦ Ver el ranking de usuarios con más ${moneda}.
ᰔᩚ *#aventura • #adventure*
> ✦ Aventúrate en un nuevo reino y recolecta recursos.
ᰔᩚ *#curar • #heal*
> ✦ Cura tu salud para volverte aventurar.
ᰔᩚ *#cazar • #hunt • #berburu*
> ✦ Aventúrate en una caza de animales.
ᰔᩚ *#inv • #inventario*
> ✦ Ver tu inventario con todos tus ítems.
ᰔᩚ *#mazmorra • #explorar*
> ✦ Explorar mazmorras para ganar ${moneda}.
ᰔᩚ *#halloween*
> ✦ Reclama tu dulce o truco (Solo en Halloween).
ᰔᩚ *#christmas • #navidad*
> ✦ Reclama tu regalo navideño (Solo en Navidad).
ᰔᩚ *#kurogane*
> ✦ para recoger materiales oro y hierro

 
»⊹˚୨ *2B* ⊹
`.trim()

    let pp = 'https://files.catbox.moe/rt7ivf.jpg'
    await conn.sendFile(m.chat, pp, 'thumbnail.jpg', menuText, m)

  } catch (e) {
    conn.reply(m.chat, 'Lo sentimos, ocurrió un error mostrando el menú.', m)
    throw e
  }
}

handler.help = ['rpg']
handler.tags = ['main']
handler.command = ['rpg128']
handler.register = false
export default handler

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
