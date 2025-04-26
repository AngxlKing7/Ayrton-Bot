import moment from 'moment-timezone';

let handler = async (m, { conn, args }) => {
    // Asegúrate de que el comando no esté invocando el menú cuando no se necesita
    if (args[0] && args[0].toLowerCase() === 'script') {
        return; // Simplemente no hace nada si se ingresa '.menú script'
    }

    let userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
    let user = global.db.data.users[userId];
    let name = conn.getName(userId);
    let _uptime = process.uptime() * 1000;
    let uptime = clockString(_uptime);
    let totalreg = Object.keys(global.db.data.users).length;
    let totalCommands = Object.values(global.plugins).filter((v) => v.help && v.tags).length;
    
    let txt = `
Hola! Soy ${botname} ${(conn.user.jid == global.conn.user.jid ? '­­ㅤ­' : '(Sub-Bot)')}
ᴀǫᴜɪ ᴛɪᴇɴᴇs ʟᴀ ʟɪsᴛᴀ ᴅᴇ ᴄᴏᴍᴀɴᴅᴏs
╭┈ ↷
│ ✐ 𝓓𝓮𝓿𝓮𝓵𝓸𝓹𝓮𝓭 𝓫𝔂 𝙎𝙥𝙚𝙚𝙙𝟯𝙭𝙯 🕷️
│ ✐ ꒷ꕤ💎ദ ᴄᴏᴍᴀɴᴅᴏs ෴
│ https://ayrton.bot.nu/commands
│ ✐ ꒷ꕤ💎ദ ᴄᴀɴᴀʟ ᴏғɪᴄɪᴀʟ ෴
│ https://whatsapp.com/channel/0029VbAmwbQBqbr587Zkni1a
╰─────────────────
${leerMas}

✐; 💎→ Crea un *Sub-Bot* con tu número utilizando *#qr* o *#code*

• :･ﾟ⊹˚• \`『 Info-Bot 』\` •˚⊹:･ﾟ•

✐ Comandos para ver estado e información de el bot.
✦ *#uptime • #runtime*
→ Ver tiempo activo o en linea de el bot.
✦ *#bots • #sockets*
→ Ver la lista de Sub-Bots activos.
✦ *#creador*
→ Contacto del creador de el bot.
✦ *#status • #estado*
→ Ver el estado actual de el bot.
✦ *#infobot • #infobot*
→ Ver la información completa de el bot.
✦ *#sug • #newcommand*
→ Sugiere un nuevo comando.
✦ *#p • #ping*
→ Ver la velocidad de respuesta del bot.
✦ *#reporte • #reportar*
→ Reporta alguna falla o problema de el bot.
✦ *#speedtest*
→ Ver las estadísticas de velocidad de el bot.
✦ *#funciones • #totalfunciones*
→ Ver todas las funciones de el bot.

• :･ﾟ⊹˚• \`『 Economia 』\` •˚⊹:･ﾟ•

✐ Comandos de economía y rpg para ganar dinero y otros recursos.
✦ *#w • #work • #trabajar*
→ Trabaja para ganar ${moneda}.
✦ *#slut • #protituirse*
→ Trabaja como prostituta y gana ${moneda}.
✦ *#cf • #suerte*
→ Apuesta tus ${moneda} a cara o cruz.
✦ *#crime • #crimen
→ Trabaja como ladrón para ganar ${moneda}.
✦ *#ruleta • #roulette • #rt*
→ Apuesta ${moneda} al color rojo o negro.
✦ *#casino • #apostar*
→ Apuesta tus ${moneda} en el casino.
✦ *#slot*
→ Apuesta tus ${moneda} en la ruleta y prueba tu suerte.
✦ *#cartera • #wallet*
→ Ver tus ${moneda} en la cartera.
✦ *#banco • #bank*
→ Ver tus ${moneda} en el banco.
✦ *#deposit • #depositar • #d*
→ Deposita tus ${moneda} al banco.
✦ *#with • #retirar • #withdraw*
→ Retira tus ${moneda} del banco.
✦ *#transfer • #pay*
→ Transfiere ${moneda} o XP a otros usuarios.
✦ *#miming • #minar • #mine*
→ Trabaja como minero y recolecta recursos.
✦ *#buyall • #buy*
→ Compra ${moneda} con tu XP.
✦ *#daily • #diario*
→ Reclama tu recompensa diaria.
✦ *#cofre*
→ Reclama un cofre diario lleno de recursos.
✦ *#weekly • #semanal*
→ Reclama tu regalo semanal.
✦ *#monthly • #mensual*
→ Reclama tu recompensa mensual.
✦ *#steal • #robar • #rob*
→ Intenta robarle ${moneda} a alguien.
✦ *#robarxp • #robxp*
→ Intenta robar XP a un usuario.
✦ *#eboard • #baltop*
→ Ver el ranking de usuarios con más ${moneda}.
✦ *#aventura • #adventure*
→ Aventúrate en un nuevo reino y recolecta recursos.
✦ *#curar • #heal*
→ Cura tu salud para volverte aventurar.
✦ *#cazar • #hunt • #berburu*
→ Aventúrate en una caza de animales.
✦ *#inv • #inventario*
→ Ver tu inventario con todos tus ítems.
✦ *#mazmorra • #explorar*
→ Explorar mazmorras para ganar ${moneda}.
✦ *#halloween*
→ Reclama tu dulce o truco (Solo en Halloween).
✦ *#christmas • #navidad*
→ Reclama tu regalo navideño (Solo en Navidad).

• :･ﾟ⊹˚• \`『 Buscadores 』\` •˚⊹:･ﾟ•

✐ Comandos para realizar búsquedas en distintas plataformas.
✦ *#tiktoksearch • #tiktoks*
→ Buscador de videos de tiktok.
✦ *#tweetposts*
→ Buscador de posts de Twitter/X.
✦ *#ytsearch • #yts*
→ Realiza búsquedas de Youtube.
✦ *#cuevana • #cuevanasearch*
→ Buscador de películas/series por Cuevana.
✦ *#google*
→ Realiza búsquedas por Google.
✦ *#pin • #pinterest*
→ Buscador de imagenes de Pinterest.
✦ *#imagen • #image*
→ buscador de imagenes de Google.
✦ *#animesearch • #animess*
→ Buscador de animes de tioanime.
✦ *#animei • #animeinfo*
→ Buscador de capítulos de #animesearch.
✦ *#infoanime*
→ Buscador de información de anime/manga.
✦ *#hentaisearch • #searchhentai*
→ Buscador de capítulos hentai.
✦ #xnxxsearch • #xnxxs*
→ Buscador de vídeos de Xnxx.
✦ *#xvsearch • #xvideossearch*
→ Buscador de vídeos de Xvideos.
✦ *#pornhubsearch • #phsearch*
→ Buscador de videos de Pornhub.
✦ *#npmjs*
→ Buscandor de npmjs.

• :･ﾟ⊹˚• \`『 Descargas 』\` •˚⊹:･ﾟ•

✐ Comandos de descargas para varios archivos.
✦ *#tiktok • #tt*
→ Descarga videos de TikTok.
✦ *#mediafire • #mf*
→ Descargar un archivo de MediaFire.
✦ *#pinvid • #pinvideo* + [enlacé]
→ Descargar vídeos de Pinterest. 
✦ *#mega • #mg* + [enlacé]
→ Descargar un archivo de MEGA.
✦ *#play • #play2*
→ Descarga música/video de YouTube.
✦ *#ytmp3 • #ytmp4*
→ Descarga música/video de YouTube mediante url.
✦ *#fb • #facebook*
→ Descarga videos de Facebook.
✦ *#twitter • #x* + [Link]
→ Descargar un video de Twitter/X
✦ *#ig • #instagram*
→ Descarga contenido de Instagram.
✦ *#tts • #tiktoks* + [busqueda]
→ Buscar videos de tiktok 
✦ *#terabox • #tb* + [enlace]
→ Descargar archivos por Terabox.
✦ *#gdrive • #drive* + [enlace]
→ Descargar archivos por Google Drive.
✦ *#ttimg • #ttmp3* + <url>
→ Descarga fotos/audios de tiktok. 
✦ *#xvideosdl*
→ Descarga videos porno de (Xvideos). 
✦ *#xnxxdl*
→ Descarga videos porno de (xnxx).
✦ *#tiktokrandom • #ttrandom*
→ Descarga un video aleatorio de tiktok.
✦ *#animelinks • #animedl*
→ Descarga Links disponibles de descargas.

• :･ﾟ⊹˚• \`『 Gacha 』\` •˚⊹:･ﾟ•

✐ Comandos de gacha para reclamar y colecciónar personajes.
✦ *#rollwaifu • #rw • #roll*
→ Waifu o husbando aleatorio.
✦  *#claim • #c • #reclamar*
→ Reclamar un personaje.
✦ *#harem • #waifus • #claims*
→ Ver tus personajes reclamados.
✦ *#charimage • #waifuimage • #wimage* 
→ Ver una imagen aleatoria de un personaje.
✦ *#charinfo • #winfo • #waifuinfo*
→ Ver información de un personaje.
✦ *#givechar • #givewaifu • #regalar*
→ Regalar un personaje a otro usuario.
✦ *#vote • #votar*
→ Votar por un personaje para subir su valor.
✦ *#waifusboard • #waifustop • #topwaifus*
→ Ver el top de personajes con mayor valor.

• :･ﾟ⊹˚• \`『 Stickers 』\` •˚⊹:･ﾟ•

✐ Comandos para creaciones de stickers etc.
✦ *#sticker • #s*
→ Crea stickers de (imagen/video)
✦ *#setmeta*
→ Estable un pack y autor para los stickers.
✦ *#delmeta*
→ Elimina tu pack de stickers.
✦ *#pfp • #getpic*
→ Obtén la foto de perfil de un usuario.
✦ *#qc*
→ Crea stickers con texto o de un usuario.
✦ *#toimg • #img*
→ Convierte stickers en imagen.
✦ *#brat • #ttp • #attp*︎ 
→ Crea stickers con texto.
✦ *#emojimix*
→ Fuciona 2 emojis para crear un sticker.
✦ *#wm*
→ Cambia el nombre de los stickers.

•:･ﾟ⊹˚• \`『 Herramientas 』\` •˚⊹:･ﾟ•

✐ Comandos de herramientas con muchas funciones.
✦ *#calcular • #calcular • #cal*
→ Calcular todo tipo de ecuaciones.
✦ *#tiempo • #clima*
→ Ver el clima de un pais.
✦ *#horario*
→ Ver el horario global de los países.
✦ *#fake • #fakereply*
→ Crea un mensaje falso de un usuario.
✦ *#enhance • #remini • #hd*
→ Mejora la calidad de una imagen.
✦ *#letra*
→ Cambia la fuente de las letras.
✦ *#read • #readviewonce • #ver*
→ Ver imágenes de una sola vista.
✦ *#whatmusic • #shazam*
→ Descubre el nombre de canciones o vídeos.
✦ *#spamwa • #spam*
→ Envia spam aun usuario.
✦ *#ss • #ssweb*
→ Ver el estado de una página web.
✦ *#length • #tamaño*
→ Cambia el tamaño de imágenes y vídeos.
✦ *#say • #decir* + [texto]
→ Repetir un mensaje.
✦ *#todoc • #toducument*
→ Crea documentos de (audio, imágenes y vídeos).
✦ *#translate • #traducir • #trad*
→ Traduce palabras en otros idiomas.

• :･ﾟ⊹˚• \`『 Perfil 』\` •˚⊹:･ﾟ•

✐ Comandos de perfil para ver, configurar y comprobar estados de tu perfil.
✦ *#reg • #verificar • #register*
→ Registra tu nombre y edad en el bot.
✦ *#unreg*
→ Elimina tu registro del bot.
✦ *#profile*
→ Muestra tu perfil de usuario.
✦ *#marry* [mension / etiquetar]
→ Propón matrimonio a otro usuario.
✦ *#divorce*
→ Divorciarte de tu pareja.
✦ *#setgenre • #setgenero*
→ Establece tu género en el perfil del bot.
✦ *#delgenre • #delgenero*
→ Elimina tu género del perfil del bot.
✦ *#setbirth • #setnacimiento*
→ Establece tu fecha de nacimiento en el perfil del bot.
✦ *#delbirth • #delnacimiento*
→ Elimina tu fecha de nacimiento del perfil del bot.
✦ *#setdescription • #setdesc*
→ Establece una descripción en tu perfil del bot.
✦ *#deldescription • #deldesc*
→ Elimina la descripción de tu perfil del bot.
✦ *#lb • #lboard* + <Paginá>
→ Top de usuarios con más (experiencia y nivel).
✦ *#level • #lvl* + <@Mencion>
→ Ver tu nivel y experiencia actual.
✦ *#comprarpremium • #premium*
→ Compra un pase premium para usar el bot sin límites.
✦ *#confesiones • #confesar*
→ Confiesa tus sentimientos a alguien de manera anonima.

• :･ﾟ⊹˚• \`『 Grupos 』\` •˚⊹:･ﾟ•

✐ Comandos de grupos para una mejor gestión de ellos.
✦ *#config • #on*
→ Ver opciones de configuración de grupos.
✦ *#hidetag • #tag*
→ Envia un mensaje mencionando a todos los usuarios
✦ *#gp • #infogrupo*
→  Ver la Informacion del grupo.
✦ *#linea • #listonline*
→ Ver la lista de los usuarios en linea.
✦ *#setwelcome*
→ Establecer un mensaje de bienvenida personalizado.
✦ *#setbye*
→ Establecer un mensaje de despedida personalizado.
✦ *#link*
→ el bot envia el link del grupo.
✦ *#admins • #admin*
→ Mencionar a los admins para solicitar ayuda.
✦ *#restablecer • #revoke*
→ Restablecer el enlace del grupo.
✦ *#grupo • #group* [open / abrir]
→ Cambia ajustes del grupo para que todos los usuarios envien mensaje.
✦ *#grupo • #gruop* [close / cerrar]
→ Cambia ajustes del grupo para que solo los administradores envien mensaje.
✦ *#kick* [número / mension]
→ Elimina un usuario de un grupo.
✦ *#add • #añadir • #agregar* [número]
→ Invita a un usuario a tu grupo.
✦ *#promote* [mension / etiquetar]
→ el bot dara administrador al usuario mencionando.
✦ *#demote* [mension / etiquetar]
→ el bot quitara administrador al usuario mencionando.
✦ *#gpbanner • #groupimg*
→ Cambiar la imagen del grupo.
✦ *#gpname • #groupname*
→ Cambiar el nombre del grupo.
✦ *#gpdesc • #groupdesc*
→ Cambiar la descripción del grupo.
✦ *#advertir • #warn • #warning*
→ Darle una advertencia aún usuario.
✦ ︎*#unwarn • #delwarn*
→ Quitar advertencias.
✦ *#advlist • #listadv*
→ Ver lista de usuarios advertidos.
✦ *#bot on/off*
→ Enciende el bot o Apaga el bot en un grupo.
✦ *#encuesta • #poll*
→ Crea una encuesta.
✦ *#delete • #del*
→ Elimina mensaje de otros usuarios.
✦ *#fantasmas*
→ Ver lista de inactivos del grupo.
✦ *#kickfantasmas*
→ Elimina a los inactivos del grupo.
✦ *#invocar • #tagall • #todos*
→ Invoca a todos los usuarios de un grupo.
✦ *#setemoji • #setemo*
→ Cambia el emoji que se usa en la invitación de usuarios.
✦ *#listnum • #kicknum*
→ Elimine a usuario por el prefijo de país.

• :･ﾟ⊹˚• \`『 Anime 』\` •˚⊹:･ﾟ•

✐ Comandos de reacciones de anime.
✦ *#angry • #enojado* + <mencion>
→ Estar enojado
✦ *#bite* + <mencion>
→ Muerde a alguien
✦ *#bleh* + <mencion>
→ Sacar la lengua
✦ *#blush* + <mencion>
→ Sonrojarte
✦ *#bored • #aburrido* + <mencion>
→ Estar aburrido
✦ *#cry* + <mencion>
→ Llorar por algo o alguien
✦ *#cuddle* + <mencion>
→ Acurrucarse
✦ *#dance* + <mencion>
→ Sacate los pasitos prohíbidos
✦ *#drunk* + <mencion>
→ Estar borracho
✦ *#eat • #comer* + <mencion>
→ Comer algo delicioso
✦ *#facepalm* + <mencion>
→ Darte una palmada en la cara
✦ *#happy • #feliz* + <mencion>
→ Salta de felicidad
✦ *#hug* + <mencion>
→ Dar un abrazo
✦ *#impregnate • #preg* + <mencion>
→ Embarazar a alguien
✦ *#kill* + <mencion>
→ Toma tu arma y mata a alguien
✦ *#kiss • #besar* • #kiss2 + <mencion>
→ Dar un beso
✦ *#laugh* + <mencion>
→ Reírte de algo o alguien
✦ *#lick* + <mencion>
→ Lamer a alguien
✦ *#love • #amor* + <mencion>
→ Sentirse enamorado
✦ *#pat* + <mencion>
→ Acaricia a alguien
✦ *#poke* + <mencion>
→ Picar a alguien
✦ *#pout* + <mencion>
→ Hacer pucheros
✦ *#punch* + <mencion>
→ Dar un puñetazo
✦ *#run* + <mencion>
→ Correr
✦ *#sad • #triste* + <mencion>
→ Expresar tristeza
✦ *#scared* + <mencion>
→ Estar asustado
✦ *#seduce* + <mencion>
→ Seducir a alguien
✦ *#shy • #timido* + <mencion>
→ Sentir timidez
✦ *#slap* + <mencion>
→ Dar una bofetada
✦ *#dias • #days*
→ Darle los buenos días a alguien 
✦ *#noches • #nights*
→ Darle las buenas noches a alguien 
✦ *#sleep* + <mencion>
→ Tumbarte a dormir
✦ *#smoke* + <mencion>
→ Fumar
✦ *#think* + <mencion>
→ Pensar en algo

• :･ﾟ⊹˚• \`『 NSFW 』\` •˚⊹:･ﾟ•

✐ Comandos NSFW (Contenido para adultos)
✦ *#anal* + <mencion>
→ Hacer un anal
✦ *#waifu*
→ Buscá una waifu aleatorio.
✦ *#bath* + <mencion>
→ Bañarse
✦ *#blowjob • #mamada • #bj* + <mencion>
→ Dar una mamada
✦ *#boobjob* + <mencion>
→ Hacer una rusa
✦ *#cum* + <mencion>
→ Venirse en alguien.
✦ *#fap* + <mencion>
→ Hacerse una paja
✦ *#ppcouple • #ppcp*
→ Genera imagenes para amistades o parejas.
✦ *#footjob* + <mencion>
→ Hacer una paja con los pies
✦ *#fuck • #coger • #fuck2* + <mencion>
→ Follarte a alguien
✦ *#cafe • #coffe*
→ Tomate un cafecito con alguien
✦ *#violar • #perra + <mencion>
→ Viola a alguien
✦ *#grabboobs* + <mencion>
→ Agarrrar tetas
✦ *#grop* + <mencion>
→ Manosear a alguien
✦ *#lickpussy* + <mencion>
→ Lamer un coño
✦ *#rule34 • #r34* + [Tags]
→ Buscar imagenes en Rule34
✦ *#sixnine • #69* + <mencion>
→ Haz un 69 con alguien
✦ *#spank • #nalgada* + <mencion>
→ Dar una nalgada
✦ *#suckboobs* + <mencion>
→ Chupar tetas
✦ *#undress • #encuerar* + <mencion>
→ Desnudar a alguien
✦ *#yuri • #tijeras* + <mencion>
→ Hacer tijeras.

• :･ﾟ⊹˚• \`『 Juegos 』\` •˚⊹:･ﾟ•

✐ Comandos de juegos para jugar con rus amigos.
✦ *#amistad • #amigorandom* 
→ hacer amigos con un juego. 
✦ *#chaqueta • #jalamela*
→ Hacerte una chaqueta.
✦ *#chiste*
→ el bot te cuenta un chiste.
✦ *#consejo* 
→ el bot te da un consejo. 
✦ *#doxeo • #doxear* + <mencion>
→ Simular un doxeo falso.
✦ *#facto*
→ el bot te lanza un facto. 
✦ *#formarpareja*
→ Forma una pareja. 
✦ *#formarpareja5*
→ Forma 5 parejas diferentes.
✦ *#frase*
→ el bot te da una frase.
✦ *#huevo*
→ Agarrale el huevo a alguien.
✦ *#chupalo* + <mencion>
→ Hacer que un usuario te la chupe.
✦ *#aplauso* + <mencion>
→ Aplaudirle a alguien.
✦ *#marron* + <mencion>
→ Burlarte del color de piel de un usuario. 
✦ *#suicidar*
→ Suicidate. 
✦ *#iq • #iqtest* + <mencion>
→ Calcular el iq de alguna persona. 
✦ *#meme*
→ el bot te envía un meme aleatorio. 
✦ *#morse*
→ Convierte un texto a codigo morse. 
✦ *#nombreninja*
→ Busca un nombre ninja aleatorio. 
✦ *#personalidad* + <mencion>
→ el bot busca tu personalidad. 
✦ *#piropo*
→ Lanza un piropo.
✦ *#pregunta*
→ Hazle una pregunta a el bot.
✦ *#ship • #pareja*
→ el bot te da la probabilidad de enamorarte de una persona. 
✦ *#sorteo*
→ Empieza un sorteo. 
✦ *#top*
→ Empieza un top de personas.
✦ *#formartrio* + <mencion>
→ Forma un trio.
✦ *#ahorcado*
→ Diviertete con el bot jugando el juego ahorcado.
✦ *#genio*
→ Comienza una pregunta con el genio.
✦ *#mates • #matematicas*
→ Responde las preguntas de matemáticas para ganar recompensas.
✦ *#ppt*
→ Juega piedra papel o tijeras con el bot.
✦ *#sopa • #buscarpalabra*
→ Juega el famoso juego de sopa de letras.
✦ *#pvp • #suit* + <mencion>
→ Juega un pvp contra otro usuario.
✦ *#ttt*
→ Crea una sala de juego.
  `.trim();

  await conn.sendMessage(m.chat, { 
      text: txt,
      contextInfo: {
          mentionedJid: [m.sender, userId],
          isForwarded: false, // Desactiva la apariencia de reenviado
          externalAdReply: {
              title: botname,
              body: textbot,
              thumbnailUrl: banner,
              mediaType: 1,
              showAdAttribution: true,
              renderLargerThumbnail: true,
          },
      },
  }, { quoted: m });
};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ['menu', 'menú', 'help'];
handler.group = true;

export default handler;

function clockString(ms) {
    let seconds = Math.floor((ms / 1000) % 60);
    let minutes = Math.floor((ms / (1000 * 60)) % 60);
    let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    return `${hours}h ${minutes}m ${seconds}s`;
}
