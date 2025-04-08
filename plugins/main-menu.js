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
Hola! Soy  *${botname}*  🜲
Aquí tienes la lista de comandos
╭┈ ↷
│ᰔᩚ Usuario » @${userId.split('@')[0]}
│✦ Bot » ${(conn.user.jid == global.conn.user.jid ? 'Principal 🜲' : 'Sub Bot')}
│✧ Comandos » ${totalCommands}
│•——————•Canal Oficial•——————•
│https://whatsapp.com/channel/0029VbAmwbQBqbr587Zkni1a
╰─────────────────
Crea un *Sub-Bot* con tu número utilizando *${usedPrefix}qr* o *${usedPrefix}code*

• :･ﾟ⊹˚• \`『 Info-Bot 』\` •˚⊹:･ﾟ•

❍ Comandos para ver estado e información de el bot.
ᰔᩚ *${usedPrefix}uptime • ${usedPrefix}runtime*
> ✦ Ver tiempo activo o en linea de el bot.
ᰔᩚ *${usedPrefix}bots • ${usedPrefix}sockets*
> ✦ Ver la lista de Sub-Bots activos.
ᰔᩚ *${usedPrefix}creador*
> ✦ Contacto del creador de el bot.
ᰔᩚ *${usedPrefix}status • ${usedPrefix}estado*
> ✦ Ver el estado actual de el bot.
ᰔᩚ *${usedPrefix}infobot • ${usedPrefix}infobot*
> ✦ Ver la información completa de el bot.
ᰔᩚ *${usedPrefix}sug • ${usedPrefix}newcommand*
> ✦ Sugiere un nuevo comando.
ᰔᩚ *${usedPrefix}p • ${usedPrefix}ping*
> ✦ Ver la velocidad de respuesta del bot.
ᰔᩚ *${usedPrefix}reporte • ${usedPrefix}reportar*
> ✦ Reporta alguna falla o problema de el bot.
ᰔᩚ *${usedPrefix}speed • ${usedPrefix}speedtest*
> ✦ Ver las estadísticas de velocidad de el bot.
ᰔᩚ *${usedPrefix}funciones • ${usedPrefix}totalfunciones*
> ✦ Ver todas las funciones de el bot.

• :･ﾟ⊹˚• \`『 Buscadores 』\` •˚⊹:･ﾟ•

❍ Comandos para realizar búsquedas en distintas plataformas.
ᰔᩚ *${usedPrefix}tiktoksearch • ${usedPrefix}tiktoks*
> ✦ Buscador de videos de tiktok.
ᰔᩚ *${usedPrefix}tweetposts*
> ✦ Buscador de posts de Twitter/X.
ᰔᩚ *${usedPrefix}ytsearch • ${usedPrefix}yts*
> ✦ Realiza búsquedas de Youtube.
ᰔᩚ *${usedPrefix}cuevana • ${usedPrefix}cuevanasearch*
> ✦ Buscador de películas/series por Cuevana.
ᰔᩚ *${usedPrefix}google*
> ✦ Realiza búsquedas por Google.
ᰔᩚ *${usedPrefix}pin • ${usedPrefix}pinterest*
> ✦ Buscador de imagenes de Pinterest.
ᰔᩚ *${usedPrefix}imagen • ${usedPrefix}image*
> ✦ buscador de imagenes de Google.
ᰔᩚ *${usedPrefix}animesearch • ${usedPrefix}animess*
> ✦ Buscador de animes de tioanime.
ᰔᩚ *${usedPrefix}animei • ${usedPrefix}animeinfo*
> ✦ Buscador de capítulos de ${usedPrefix}animesearch.
ᰔᩚ *${usedPrefix}infoanime*
> ✦ Buscador de información de anime/manga.
ᰔᩚ *${usedPrefix}hentaisearch • ${usedPrefix}searchhentai*
> ✦ Buscador de capítulos hentai.
ᰔᩚ ${usedPrefix}xnxxsearch • ${usedPrefix}xnxxs*
> ✦ Buscador de vídeos de Xnxx.
ᰔᩚ *${usedPrefix}xvsearch • ${usedPrefix}xvideossearch*
> ✦ Buscador de vídeos de Xvideos.
ᰔᩚ *${usedPrefix}pornhubsearch • ${usedPrefix}phsearch*
> ✦ Buscador de videos de Pornhub.
ᰔᩚ *${usedPrefix}npmjs*
> ✦ Buscandor de npmjs.

• :･ﾟ⊹˚• \`『 Descargas 』\` •˚⊹:･ﾟ•

❍ Comandos de descargas para varios archivos.
ᰔᩚ *${usedPrefix}tiktok • ${usedPrefix}tt*
> ✦ Descarga videos de TikTok.
ᰔᩚ *${usedPrefix}mediafire • ${usedPrefix}mf*
> ✦ Descargar un archivo de MediaFire.
ᰔᩚ *${usedPrefix}pinvid • ${usedPrefix}pinvideo* + [enlacé]
> ✦ Descargar vídeos de Pinterest. 
ᰔᩚ *${usedPrefix}mega • ${usedPrefix}mg* + [enlacé]
> ✦ Descargar un archivo de MEGA.
ᰔᩚ *${usedPrefix}play • ${usedPrefix}play2*
> ✦ Descarga música/video de YouTube.
ᰔᩚ *${usedPrefix}ytmp3 • ${usedPrefix}ytmp4*
> ✦ Descarga música/video de YouTube mediante url.
ᰔᩚ *${usedPrefix}fb • ${usedPrefix}facebook*
> ✦ Descarga videos de Facebook.
ᰔᩚ *${usedPrefix}twitter • ${usedPrefix}x* + [Link]
> ✦ Descargar un video de Twitter/X
ᰔᩚ *${usedPrefix}ig • ${usedPrefix}instagram*
> ✦ Descarga contenido de Instagram.
ᰔᩚ *${usedPrefix}tts • ${usedPrefix}tiktoks* + [busqueda]
> ✦ Buscar videos de tiktok 
ᰔᩚ *${usedPrefix}terabox • ${usedPrefix}tb* + [enlace]
> ✦ Descargar archivos por Terabox.
ᰔᩚ *${usedPrefix}gdrive • ${usedPrefix}drive* + [enlace]
> ✦ Descargar archivos por Google Drive.
ᰔᩚ *${usedPrefix}ttimg • ${usedPrefix}ttmp3* + <url>
> ✦ Descarga fotos/audios de tiktok. 
ᰔᩚ *${usedPrefix}xvideosdl*
> ✦ Descarga videos porno de (Xvideos). 
ᰔᩚ *${usedPrefix}xnxxdl*
> ✦ Descarga videos porno de (xnxx).
ᰔᩚ *${usedPrefix}apk • ${usedPrefix}modapk*
> ✦ Descarga un apk de Aptoide.
ᰔᩚ *${usedPrefix}tiktokrandom • ${usedPrefix}ttrandom*
> ✦ Descarga un video aleatorio de tiktok.
ᰔᩚ *${usedPrefix}npmdl • ${usedPrefix}npmdownloader*
> ✦ Descarga paquetes de NPMJs.
ᰔᩚ *${usedPrefix}animelinks • ${usedPrefix}animedl*
> ✦ Descarga Links disponibles de descargas.

• :･ﾟ⊹˚• \`『 Economia 』\` •˚⊹:･ﾟ•

❍ Comandos de economía y rpg para ganar dinero y otros recursos.
ᰔᩚ *${usedPrefix}w • ${usedPrefix}work • ${usedPrefix}trabajar*
> ✦ Trabaja para ganar ${moneda}.
ᰔᩚ *${usedPrefix}slut • ${usedPrefix}protituirse*
> ✦ Trabaja como prostituta y gana ${moneda}.
ᰔᩚ *${usedPrefix}cf • ${usedPrefix}suerte*
> ✦ Apuesta tus ${moneda} a cara o cruz.
ᰔᩚ *${usedPrefix}crime • ${usedPrefix}crimen
> ✦ Trabaja como ladrón para ganar ${moneda}.
ᰔᩚ *${usedPrefix}ruleta • ${usedPrefix}roulette • ${usedPrefix}rt*
> ✦ Apuesta ${moneda} al color rojo o negro.
ᰔᩚ *${usedPrefix}casino • ${usedPrefix}apostar*
> ✦ Apuesta tus ${moneda} en el casino.
ᰔᩚ *${usedPrefix}slot*
> ✦ Apuesta tus ${moneda} en la ruleta y prueba tu suerte.
ᰔᩚ *${usedPrefix}cartera • ${usedPrefix}wallet*
> ✦ Ver tus ${moneda} en la cartera.
ᰔᩚ *${usedPrefix}banco • ${usedPrefix}bank*
> ✦ Ver tus ${moneda} en el banco.
ᰔᩚ *${usedPrefix}deposit • ${usedPrefix}depositar • ${usedPrefix}d*
> ✦ Deposita tus ${moneda} al banco.
ᰔᩚ *${usedPrefix}with • ${usedPrefix}retirar • ${usedPrefix}withdraw*
> ✦ Retira tus ${moneda} del banco.
ᰔᩚ *${usedPrefix}transfer • ${usedPrefix}pay*
> ✦ Transfiere ${moneda} o XP a otros usuarios.
ᰔᩚ *${usedPrefix}miming • ${usedPrefix}minar • ${usedPrefix}mine*
> ✦ Trabaja como minero y recolecta recursos.
ᰔᩚ *${usedPrefix}buyall • ${usedPrefix}buy*
> ✦ Compra ${moneda} con tu XP.
ᰔᩚ *${usedPrefix}daily • ${usedPrefix}diario*
> ✦ Reclama tu recompensa diaria.
ᰔᩚ *${usedPrefix}cofre*
> ✦ Reclama un cofre diario lleno de recursos.
ᰔᩚ *${usedPrefix}weekly • ${usedPrefix}semanal*
> ✦ Reclama tu regalo semanal.
ᰔᩚ *${usedPrefix}monthly • ${usedPrefix}mensual*
> ✦ Reclama tu recompensa mensual.
ᰔᩚ *${usedPrefix}steal • ${usedPrefix}robar • ${usedPrefix}rob*
> ✦ Intenta robarle ${moneda} a alguien.
ᰔᩚ *${usedPrefix}robarxp • ${usedPrefix}robxp*
> ✦ Intenta robar XP a un usuario.
ᰔᩚ *${usedPrefix}eboard • ${usedPrefix}baltop*
> ✦ Ver el ranking de usuarios con más ${moneda}.
ᰔᩚ *${usedPrefix}aventura • ${usedPrefix}adventure*
> ✦ Aventúrate en un nuevo reino y recolecta recursos.
ᰔᩚ *${usedPrefix}curar • ${usedPrefix}heal*
> ✦ Cura tu salud para volverte aventurar.
ᰔᩚ *${usedPrefix}cazar • ${usedPrefix}hunt • ${usedPrefix}berburu*
> ✦ Aventúrate en una caza de animales.
ᰔᩚ *${usedPrefix}inv • ${usedPrefix}inventario*
> ✦ Ver tu inventario con todos tus ítems.
ᰔᩚ *${usedPrefix}mazmorra • ${usedPrefix}explorar*
> ✦ Explorar mazmorras para ganar ${moneda}.
ᰔᩚ *${usedPrefix}halloween*
> ✦ Reclama tu dulce o truco (Solo en Halloween).
ᰔᩚ *${usedPrefix}christmas • ${usedPrefix}navidad*
> ✦ Reclama tu regalo navideño (Solo en Navidad).

• :･ﾟ⊹˚• \`『 Gacha 』\` •˚⊹:･ﾟ•

❍ Comandos de gacha para reclamar y colecciónar personajes.
ᰔᩚ *${usedPrefix}rollwaifu • ${usedPrefix}rw • ${usedPrefix}roll*
> ✦ Waifu o husbando aleatorio.
ᰔᩚ  *${usedPrefix}claim • ${usedPrefix}c • ${usedPrefix}reclamar*
> ✦ Reclamar un personaje.
ᰔᩚ *${usedPrefix}harem • ${usedPrefix}waifus • ${usedPrefix}claims*
> ✦ Ver tus personajes reclamados.
ᰔᩚ *${usedPrefix}charimage • ${usedPrefix}waifuimage • ${usedPrefix}wimage* 
> ✦ Ver una imagen aleatoria de un personaje.
ᰔᩚ *${usedPrefix}charinfo • ${usedPrefix}winfo • ${usedPrefix}waifuinfo*
> ✦ Ver información de un personaje.
ᰔᩚ *${usedPrefix}givechar • ${usedPrefix}givewaifu • ${usedPrefix}regalar*
> ✦ Regalar un personaje a otro usuario.
ᰔᩚ *${usedPrefix}vote • ${usedPrefix}votar*
> ✦ Votar por un personaje para subir su valor.
ᰔᩚ *${usedPrefix}waifusboard • ${usedPrefix}waifustop • ${usedPrefix}topwaifus*
> ✦ Ver el top de personajes con mayor valor.

• :･ﾟ⊹˚• \`『 Stickers 』\` •˚⊹:･ﾟ•

❍ Comandos para creaciones de stickers etc.
ᰔᩚ *${usedPrefix}sticker • ${usedPrefix}s*
> ✦ Crea stickers de (imagen/video)
ᰔᩚ *${usedPrefix}setmeta*
> ✦ Estable un pack y autor para los stickers.
ᰔᩚ *${usedPrefix}delmeta*
> ✦ Elimina tu pack de stickers.
ᰔᩚ *${usedPrefix}pfp • ${usedPrefix}getpic*
> ✦ Obtén la foto de perfil de un usuario.
ᰔᩚ *${usedPrefix}qc*
> ✦ Crea stickers con texto o de un usuario.
ᰔᩚ *${usedPrefix}toimg • ${usedPrefix}img*
> ✦ Convierte stickers en imagen.
ᰔᩚ *${usedPrefix}brat • ${usedPrefix}ttp • ${usedPrefix}attp*︎ 
> ✦ Crea stickers con texto.
ᰔᩚ *${usedPrefix}emojimix*
> ✦ Fuciona 2 emojis para crear un sticker.
ᰔᩚ *${usedPrefix}wm*
> ✦ Cambia el nombre de los stickers.

•:･ﾟ⊹˚• \`『 Herramientas 』\` •˚⊹:･ﾟ•

❍ Comandos de herramientas con muchas funciones.
ᰔᩚ *${usedPrefix}calcular • ${usedPrefix}calcular • ${usedPrefix}cal*
> ✦ Calcular todo tipo de ecuaciones.
ᰔᩚ *${usedPrefix}tiempo • ${usedPrefix}clima*
> ✦ Ver el clima de un pais.
ᰔᩚ *${usedPrefix}horario*
> ✦ Ver el horario global de los países.
ᰔᩚ *${usedPrefix}fake • ${usedPrefix}fakereply*
> ✦ Crea un mensaje falso de un usuario.
ᰔᩚ *${usedPrefix}enhance • ${usedPrefix}remini • ${usedPrefix}hd*
> ✦ Mejora la calidad de una imagen.
ᰔᩚ *${usedPrefix}letra*
> ✦ Cambia la fuente de las letras.
ᰔᩚ *${usedPrefix}read • ${usedPrefix}readviewonce • ${usedPrefix}ver*
> ✦ Ver imágenes de una sola vista.
ᰔᩚ *${usedPrefix}whatmusic • ${usedPrefix}shazam*
> ✦ Descubre el nombre de canciones o vídeos.
ᰔᩚ *${usedPrefix}spamwa • ${usedPrefix}spam*
> ✦ Envia spam aun usuario.
ᰔᩚ *${usedPrefix}ss • ${usedPrefix}ssweb*
> ✦ Ver el estado de una página web.
ᰔᩚ *${usedPrefix}length • ${usedPrefix}tamaño*
> ✦ Cambia el tamaño de imágenes y vídeos.
ᰔᩚ *${usedPrefix}say • ${usedPrefix}decir* + [texto]
> ✦ Repetir un mensaje.
ᰔᩚ *${usedPrefix}todoc • ${usedPrefix}toducument*
> ✦ Crea documentos de (audio, imágenes y vídeos).
ᰔᩚ *${usedPrefix}translate • ${usedPrefix}traducir • ${usedPrefix}trad*
> ✦ Traduce palabras en otros idiomas.

• :･ﾟ⊹˚• \`『 Perfil 』\` •˚⊹:･ﾟ•

❍ Comandos de perfil para ver, configurar y comprobar estados de tu perfil.
ᰔᩚ *${usedPrefix}reg • ${usedPrefix}verificar • ${usedPrefix}register*
> ✦ Registra tu nombre y edad en el bot.
ᰔᩚ *${usedPrefix}unreg*
> ✦ Elimina tu registro del bot.
ᰔᩚ *${usedPrefix}profile*
> ✦ Muestra tu perfil de usuario.
ᰔᩚ *${usedPrefix}marry* [mension / etiquetar]
> ✦ Propón matrimonio a otro usuario.
ᰔᩚ *${usedPrefix}divorce*
> ✦ Divorciarte de tu pareja.
ᰔᩚ *${usedPrefix}setgenre • ${usedPrefix}setgenero*
> ✦ Establece tu género en el perfil del bot.
ᰔᩚ *${usedPrefix}delgenre • ${usedPrefix}delgenero*
> ✦ Elimina tu género del perfil del bot.
ᰔᩚ *${usedPrefix}setbirth • ${usedPrefix}setnacimiento*
> ✦ Establece tu fecha de nacimiento en el perfil del bot.
ᰔᩚ *${usedPrefix}delbirth • ${usedPrefix}delnacimiento*
> ✦ Elimina tu fecha de nacimiento del perfil del bot.
ᰔᩚ *${usedPrefix}setdescription • ${usedPrefix}setdesc*
> ✦ Establece una descripción en tu perfil del bot.
ᰔᩚ *${usedPrefix}deldescription • ${usedPrefix}deldesc*
> ✦ Elimina la descripción de tu perfil del bot.
ᰔᩚ *${usedPrefix}lb • ${usedPrefix}lboard* + <Paginá>
> ✦ Top de usuarios con más (experiencia y nivel).
ᰔᩚ *${usedPrefix}level • ${usedPrefix}lvl* + <@Mencion>
> ✦ Ver tu nivel y experiencia actual.
ᰔᩚ *${usedPrefix}comprarpremium • ${usedPrefix}premium*
> ✦ Compra un pase premium para usar el bot sin límites.
ᰔᩚ *${usedPrefix}confesiones • ${usedPrefix}confesar*
> ✦ Confiesa tus sentimientos a alguien de manera anonima.

• :･ﾟ⊹˚• \`『 Grupos 』\` •˚⊹:･ﾟ•

❍ Comandos de grupos para una mejor gestión de ellos.
ᰔᩚ *${usedPrefix}config • ${usedPrefix}on*
> ✦ Ver opciones de configuración de grupos.
ᰔᩚ *${usedPrefix}hidetag • ${usedPrefix}tag*
> ✦ Envia un mensaje mencionando a todos los usuarios
ᰔᩚ *${usedPrefix}gp • ${usedPrefix}infogrupo*
> ✦  Ver la Informacion del grupo.
ᰔᩚ *${usedPrefix}linea • ${usedPrefix}listonline*
> ✦ Ver la lista de los usuarios en linea.
ᰔᩚ *${usedPrefix}setwelcome*
> ✦ Establecer un mensaje de bienvenida personalizado.
ᰔᩚ *${usedPrefix}setbye*
> ✦ Establecer un mensaje de despedida personalizado.
ᰔᩚ *${usedPrefix}link*
> ✦ el bot envia el link del grupo.
ᰔᩚ *${usedPrefix}admins • ${usedPrefix}admin*
> ✦ Mencionar a los admins para solicitar ayuda.
ᰔᩚ *${usedPrefix}restablecer • ${usedPrefix}revoke*
> ✦ Restablecer el enlace del grupo.
ᰔᩚ *${usedPrefix}grupo • ${usedPrefix}group* [open / abrir]
> ✦ Cambia ajustes del grupo para que todos los usuarios envien mensaje.
ᰔᩚ *${usedPrefix}grupo • ${usedPrefix}gruop* [close / cerrar]
> ✦ Cambia ajustes del grupo para que solo los administradores envien mensaje.
ᰔᩚ *${usedPrefix}kick* [número / mension]
> ✦ Elimina un usuario de un grupo.
ᰔᩚ *${usedPrefix}add • ${usedPrefix}añadir • ${usedPrefix}agregar* [número]
> ✦ Invita a un usuario a tu grupo.
ᰔᩚ *${usedPrefix}promote* [mension / etiquetar]
> ✦ el bot dara administrador al usuario mencionando.
ᰔᩚ *${usedPrefix}demote* [mension / etiquetar]
> ✦ el bot quitara administrador al usuario mencionando.
ᰔᩚ *${usedPrefix}gpbanner • ${usedPrefix}groupimg*
> ✦ Cambiar la imagen del grupo.
ᰔᩚ *${usedPrefix}gpname • ${usedPrefix}groupname*
> ✦ Cambiar el nombre del grupo.
ᰔᩚ *${usedPrefix}gpdesc • ${usedPrefix}groupdesc*
> ✦ Cambiar la descripción del grupo.
ᰔᩚ *${usedPrefix}advertir • ${usedPrefix}warn • ${usedPrefix}warning*
> ✦ Darle una advertencia aún usuario.
ᰔᩚ ︎*${usedPrefix}unwarn • ${usedPrefix}delwarn*
> ✦ Quitar advertencias.
ᰔᩚ *${usedPrefix}advlist • ${usedPrefix}listadv*
> ✦ Ver lista de usuarios advertidos.
ᰔᩚ *${usedPrefix}bot on/off*
> ✦ Enciende el bot o Apaga el bot en un grupo.
ᰔᩚ *${usedPrefix}encuesta • ${usedPrefix}poll*
> ✦ Crea una encuesta.
ᰔᩚ *${usedPrefix}delete • ${usedPrefix}del*
> ✦ Elimina mensaje de otros usuarios.
ᰔᩚ *${usedPrefix}fantasmas*
> ✦ Ver lista de inactivos del grupo.
ᰔᩚ *${usedPrefix}kickfantasmas*
> ✦ Elimina a los inactivos del grupo.
ᰔᩚ *${usedPrefix}invocar • ${usedPrefix}tagall • ${usedPrefix}todos*
> ✦ Invoca a todos los usuarios de un grupo.
ᰔᩚ *${usedPrefix}setemoji • ${usedPrefix}setemo*
> ✦ Cambia el emoji que se usa en la invitación de usuarios.
ᰔᩚ *${usedPrefix}listnum • ${usedPrefix}kicknum*
> ✦ Elimine a usuario por el prefijo de país.

• :･ﾟ⊹˚• \`『 Anime 』\` •˚⊹:･ﾟ•

❍ Comandos de reacciones de anime.
ᰔᩚ *${usedPrefix}angry • ${usedPrefix}enojado* + <mencion>
> ✦ Estar enojado
ᰔᩚ *${usedPrefix}bite* + <mencion>
> ✦ Muerde a alguien
ᰔᩚ *${usedPrefix}bleh* + <mencion>
> ✦ Sacar la lengua
ᰔᩚ *${usedPrefix}blush* + <mencion>
> ✦ Sonrojarte
ᰔᩚ *${usedPrefix}bored • ${usedPrefix}aburrido* + <mencion>
> ✦ Estar aburrido
ᰔᩚ *${usedPrefix}cry* + <mencion>
> ✦ Llorar por algo o alguien
ᰔᩚ *${usedPrefix}cuddle* + <mencion>
> ✦ Acurrucarse
ᰔᩚ *${usedPrefix}dance* + <mencion>
> ✦ Sacate los pasitos prohíbidos
ᰔᩚ *${usedPrefix}drunk* + <mencion>
> ✦ Estar borracho
ᰔᩚ *${usedPrefix}eat • ${usedPrefix}comer* + <mencion>
> ✦ Comer algo delicioso
ᰔᩚ *${usedPrefix}facepalm* + <mencion>
> ✦ Darte una palmada en la cara
ᰔᩚ *${usedPrefix}happy • ${usedPrefix}feliz* + <mencion>
> ✦ Salta de felicidad
ᰔᩚ *${usedPrefix}hug* + <mencion>
> ✦ Dar un abrazo
ᰔᩚ *${usedPrefix}impregnate • ${usedPrefix}preg* + <mencion>
> ✦ Embarazar a alguien
ᰔᩚ *${usedPrefix}kill* + <mencion>
> ✦ Toma tu arma y mata a alguien
ᰔᩚ *${usedPrefix}kiss • ${usedPrefix}besar* • ${usedPrefix}kiss2 + <mencion>
> ✦ Dar un beso
ᰔᩚ *${usedPrefix}laugh* + <mencion>
> ✦ Reírte de algo o alguien
ᰔᩚ *${usedPrefix}lick* + <mencion>
> ✦ Lamer a alguien
ᰔᩚ *${usedPrefix}love • ${usedPrefix}amor* + <mencion>
> ✦ Sentirse enamorado
ᰔᩚ *${usedPrefix}pat* + <mencion>
> ✦ Acaricia a alguien
ᰔᩚ *${usedPrefix}poke* + <mencion>
> ✦ Picar a alguien
ᰔᩚ *${usedPrefix}pout* + <mencion>
> ✦ Hacer pucheros
ᰔᩚ *${usedPrefix}punch* + <mencion>
> ✦ Dar un puñetazo
ᰔᩚ *${usedPrefix}run* + <mencion>
> ✦ Correr
ᰔᩚ *${usedPrefix}sad • ${usedPrefix}triste* + <mencion>
> ✦ Expresar tristeza
ᰔᩚ *${usedPrefix}scared* + <mencion>
> ✦ Estar asustado
ᰔᩚ *${usedPrefix}seduce* + <mencion>
> ✦ Seducir a alguien
ᰔᩚ *${usedPrefix}shy • ${usedPrefix}timido* + <mencion>
> ✦ Sentir timidez
ᰔᩚ *${usedPrefix}slap* + <mencion>
> ✦ Dar una bofetada
ᰔᩚ *${usedPrefix}dias • ${usedPrefix}days*
> ✦ Darle los buenos días a alguien 
ᰔᩚ *${usedPrefix}noches • ${usedPrefix}nights*
> ✦ Darle las buenas noches a alguien 
ᰔᩚ *${usedPrefix}sleep* + <mencion>
> ✦ Tumbarte a dormir
ᰔᩚ *${usedPrefix}smoke* + <mencion>
> ✦ Fumar
ᰔᩚ *${usedPrefix}think* + <mencion>
> ✦ Pensar en algo

• :･ﾟ⊹˚• \`『 NSFW 』\` •˚⊹:･ﾟ•

❍ Comandos NSFW (Contenido para adultos)
ᰔᩚ *${usedPrefix}anal* + <mencion>
> ✦ Hacer un anal
ᰔᩚ *${usedPrefix}waifu*
> ✦ Buscá una waifu aleatorio.
ᰔᩚ *${usedPrefix}bath* + <mencion>
> ✦ Bañarse
ᰔᩚ *${usedPrefix}blowjob • ${usedPrefix}mamada • ${usedPrefix}bj* + <mencion>
> ✦ Dar una mamada
ᰔᩚ *${usedPrefix}boobjob* + <mencion>
> ✦ Hacer una rusa
ᰔᩚ *${usedPrefix}cum* + <mencion>
> ✦ Venirse en alguien.
ᰔᩚ *${usedPrefix}fap* + <mencion>
> ✦ Hacerse una paja
ᰔᩚ *${usedPrefix}ppcouple • ${usedPrefix}ppcp*
> ✦ Genera imagenes para amistades o parejas.
ᰔᩚ *${usedPrefix}footjob* + <mencion>
> ✦ Hacer una paja con los pies
ᰔᩚ *${usedPrefix}fuck • ${usedPrefix}coger • ${usedPrefix}fuck2* + <mencion>
> ✦ Follarte a alguien
ᰔᩚ *${usedPrefix}cafe • ${usedPrefix}coffe*
> ✦ Tomate un cafecito con alguien
ᰔᩚ *${usedPrefix}violar • ${usedPrefix}perra + <mencion>
> ✦ Viola a alguien
ᰔᩚ *${usedPrefix}grabboobs* + <mencion>
> ✦ Agarrrar tetas
ᰔᩚ *${usedPrefix}grop* + <mencion>
> ✦ Manosear a alguien
ᰔᩚ *${usedPrefix}lickpussy* + <mencion>
> ✦ Lamer un coño
ᰔᩚ *${usedPrefix}rule34 • ${usedPrefix}r34* + [Tags]
> ✦ Buscar imagenes en Rule34
ᰔᩚ *${usedPrefix}sixnine • ${usedPrefix}69* + <mencion>
> ✦ Haz un 69 con alguien
ᰔᩚ *${usedPrefix}spank • ${usedPrefix}nalgada* + <mencion>
> ✦ Dar una nalgada
ᰔᩚ *${usedPrefix}suckboobs* + <mencion>
> ✦ Chupar tetas
ᰔᩚ *${usedPrefix}undress • ${usedPrefix}encuerar* + <mencion>
> ✦ Desnudar a alguien
ᰔᩚ *${usedPrefix}yuri • ${usedPrefix}tijeras* + <mencion>
> ✦ Hacer tijeras.

• :･ﾟ⊹˚• \`『 Juegos 』\` •˚⊹:･ﾟ•

❍ Comandos de juegos para jugar con rus amigos.
ᰔᩚ *${usedPrefix}amistad • ${usedPrefix}amigorandom* 
> ✦ hacer amigos con un juego. 
ᰔᩚ *${usedPrefix}chaqueta • ${usedPrefix}jalamela*
> ✦ Hacerte una chaqueta.
ᰔᩚ *${usedPrefix}chiste*
> ✦ el bot te cuenta un chiste.
ᰔᩚ *${usedPrefix}consejo* 
> ✦ el bot te da un consejo. 
ᰔᩚ *${usedPrefix}doxeo • ${usedPrefix}doxear* + <mencion>
> ✦ Simular un doxeo falso.
ᰔᩚ *${usedPrefix}facto*
> ✦ el bot te lanza un facto. 
ᰔᩚ *${usedPrefix}formarpareja*
> ✦ Forma una pareja. 
ᰔᩚ *${usedPrefix}formarpareja5*
> ✦ Forma 5 parejas diferentes.
ᰔᩚ *${usedPrefix}frase*
> ✦ el bot te da una frase.
ᰔᩚ *${usedPrefix}huevo*
> ✦ Agarrale el huevo a alguien.
ᰔᩚ *${usedPrefix}chupalo* + <mencion>
> ✦ Hacer que un usuario te la chupe.
ᰔᩚ *${usedPrefix}aplauso* + <mencion>
> ✦ Aplaudirle a alguien.
ᰔᩚ *${usedPrefix}marron* + <mencion>
> ✦ Burlarte del color de piel de un usuario. 
ᰔᩚ *${usedPrefix}suicidar*
> ✦ Suicidate. 
ᰔᩚ *${usedPrefix}iq • ${usedPrefix}iqtest* + <mencion>
> ✦ Calcular el iq de alguna persona. 
ᰔᩚ *${usedPrefix}meme*
> ✦ el bot te envía un meme aleatorio. 
ᰔᩚ *${usedPrefix}morse*
> ✦ Convierte un texto a codigo morse. 
ᰔᩚ *${usedPrefix}nombreninja*
> ✦ Busca un nombre ninja aleatorio. 
ᰔᩚ *${usedPrefix}personalidad* + <mencion>
> ✦ el bot busca tu personalidad. 
ᰔᩚ *${usedPrefix}piropo*
> ✦ Lanza un piropo.
ᰔᩚ *${usedPrefix}pregunta*
> ✦ Hazle una pregunta a el bot.
ᰔᩚ *${usedPrefix}ship • ${usedPrefix}pareja*
> ✦ el bot te da la probabilidad de enamorarte de una persona. 
ᰔᩚ *${usedPrefix}sorteo*
> ✦ Empieza un sorteo. 
ᰔᩚ *${usedPrefix}top*
> ✦ Empieza un top de personas.
ᰔᩚ *${usedPrefix}formartrio* + <mencion>
> ✦ Forma un trio.
ᰔᩚ *${usedPrefix}ahorcado*
> ✦ Diviertete con el bot jugando el juego ahorcado.
ᰔᩚ *${usedPrefix}genio*
> ✦ Comienza una pregunta con el genio.
ᰔᩚ *${usedPrefix}mates • ${usedPrefix}matematicas*
> ✦ Responde las preguntas de matemáticas para ganar recompensas.
ᰔᩚ *${usedPrefix}ppt*
> ✦ Juega piedra papel o tijeras con el bot.
ᰔᩚ *${usedPrefix}sopa • ${usedPrefix}buscarpalabra*
> ✦ Juega el famoso juego de sopa de letras.
ᰔᩚ *${usedPrefix}pvp • ${usedPrefix}suit* + <mencion>
> ✦ Juega un pvp contra otro usuario.
ᰔᩚ *${usedPrefix}ttt*
> ✦ Crea una sala de juego.
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

export default handler;

function clockString(ms) {
    let seconds = Math.floor((ms / 1000) % 60);
    let minutes = Math.floor((ms / (1000 * 60)) % 60);
    let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    return `${hours}h ${minutes}m ${seconds}s`;
}
