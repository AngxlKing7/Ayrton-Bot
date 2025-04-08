import moment from 'moment-timezone';

let handler = async (m, { conn, args }) => {
    // AsegÃºrate de que el comando no estÃ© invocando el menÃº cuando no se necesita
    if (args[0] && args[0].toLowerCase() === 'script') {
        return; // Simplemente no hace nada si se ingresa '.menÃº script'
    }

    let userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
    let user = global.db.data.users[userId];
    let name = conn.getName(userId);
    let _uptime = process.uptime() * 1000;
    let uptime = clockString(_uptime);
    let totalreg = Object.keys(global.db.data.users).length;
    let totalCommands = Object.values(global.plugins).filter((v) => v.help && v.tags).length;
    
    let txt = `
Hola! Soy  *${botname}*  ðŸœ²
AquÃ­ tienes la lista de comandos
â•­â”ˆ â†·
â”‚á°”á©š Usuario Â» @${userId.split('@')[0]}
â”‚âœ¦ Bot Â» ${(conn.user.jid == global.conn.user.jid ? 'Principal ðŸœ²' : 'Sub Bot')}
â”‚âœ§ Comandos Â» ${totalCommands}
â”‚â€¢â€”â€”â€”â€”â€”â€”â€¢Canal Oficialâ€¢â€”â€”â€”â€”â€”â€”â€¢
â”‚https://whatsapp.com/channel/0029VbAmwbQBqbr587Zkni1a
â•°â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
Crea un *Sub-Bot* con tu nÃºmero utilizando *#qr* o *#code*

â€¢ :ï½¥ï¾ŸâŠ¹Ëšâ€¢ \`ã€Ž Info-Bot ã€\` â€¢ËšâŠ¹:ï½¥ï¾Ÿâ€¢

â Comandos para ver estado e informaciÃ³n de el bot.
á°”á©š *#uptime â€¢ #runtime*
> âœ¦ Ver tiempo activo o en linea de el bot.
á°”á©š *#bots â€¢ #sockets*
> âœ¦ Ver la lista de Sub-Bots activos.
á°”á©š *#creador*
> âœ¦ Contacto del creador de el bot.
á°”á©š *#status â€¢ #estado*
> âœ¦ Ver el estado actual de el bot.
á°”á©š *#infobot â€¢ #infobot*
> âœ¦ Ver la informaciÃ³n completa de el bot.
á°”á©š *#sug â€¢ #newcommand*
> âœ¦ Sugiere un nuevo comando.
á°”á©š *#p â€¢ #ping*
> âœ¦ Ver la velocidad de respuesta del bot.
á°”á©š *#reporte â€¢ #reportar*
> âœ¦ Reporta alguna falla o problema de el bot.
á°”á©š *#speed â€¢ #speedtest*
> âœ¦ Ver las estadÃ­sticas de velocidad de el bot.
á°”á©š *#funciones â€¢ #totalfunciones*
> âœ¦ Ver todas las funciones de el bot.

â€¢ :ï½¥ï¾ŸâŠ¹Ëšâ€¢ \`ã€Ž Buscadores ã€\` â€¢ËšâŠ¹:ï½¥ï¾Ÿâ€¢

â Comandos para realizar bÃºsquedas en distintas plataformas.
á°”á©š *#tiktoksearch â€¢ #tiktoks*
> âœ¦ Buscador de videos de tiktok.
á°”á©š *#tweetposts*
> âœ¦ Buscador de posts de Twitter/X.
á°”á©š *#ytsearch â€¢ #yts*
> âœ¦ Realiza bÃºsquedas de Youtube.
á°”á©š *#cuevana â€¢ #cuevanasearch*
> âœ¦ Buscador de pelÃ­culas/series por Cuevana.
á°”á©š *#google*
> âœ¦ Realiza bÃºsquedas por Google.
á°”á©š *#pin â€¢ #pinterest*
> âœ¦ Buscador de imagenes de Pinterest.
á°”á©š *#imagen â€¢ #image*
> âœ¦ buscador de imagenes de Google.
á°”á©š *#animesearch â€¢ #animess*
> âœ¦ Buscador de animes de tioanime.
á°”á©š *#animei â€¢ #animeinfo*
> âœ¦ Buscador de capÃ­tulos de #animesearch.
á°”á©š *#infoanime*
> âœ¦ Buscador de informaciÃ³n de anime/manga.
á°”á©š *#hentaisearch â€¢ #searchhentai*
> âœ¦ Buscador de capÃ­tulos hentai.
á°”á©š #xnxxsearch â€¢ #xnxxs*
> âœ¦ Buscador de vÃ­deos de Xnxx.
á°”á©š *#xvsearch â€¢ #xvideossearch*
> âœ¦ Buscador de vÃ­deos de Xvideos.
á°”á©š *#pornhubsearch â€¢ #phsearch*
> âœ¦ Buscador de videos de Pornhub.
á°”á©š *#npmjs*
> âœ¦ Buscandor de npmjs.

â€¢ :ï½¥ï¾ŸâŠ¹Ëšâ€¢ \`ã€Ž Descargas ã€\` â€¢ËšâŠ¹:ï½¥ï¾Ÿâ€¢

â Comandos de descargas para varios archivos.
á°”á©š *#tiktok â€¢ #tt*
> âœ¦ Descarga videos de TikTok.
á°”á©š *#mediafire â€¢ #mf*
> âœ¦ Descargar un archivo de MediaFire.
á°”á©š *#pinvid â€¢ #pinvideo* + [enlacÃ©]
> âœ¦ Descargar vÃ­deos de Pinterest. 
á°”á©š *#mega â€¢ #mg* + [enlacÃ©]
> âœ¦ Descargar un archivo de MEGA.
á°”á©š *#play â€¢ #play2*
> âœ¦ Descarga mÃºsica/video de YouTube.
á°”á©š *#ytmp3 â€¢ #ytmp4*
> âœ¦ Descarga mÃºsica/video de YouTube mediante url.
á°”á©š *#fb â€¢ #facebook*
> âœ¦ Descarga videos de Facebook.
á°”á©š *#twitter â€¢ #x* + [Link]
> âœ¦ Descargar un video de Twitter/X
á°”á©š *#ig â€¢ #instagram*
> âœ¦ Descarga contenido de Instagram.
á°”á©š *#tts â€¢ #tiktoks* + [busqueda]
> âœ¦ Buscar videos de tiktok 
á°”á©š *#terabox â€¢ #tb* + [enlace]
> âœ¦ Descargar archivos por Terabox.
á°”á©š *#gdrive â€¢ #drive* + [enlace]
> âœ¦ Descargar archivos por Google Drive.
á°”á©š *#ttimg â€¢ #ttmp3* + <url>
> âœ¦ Descarga fotos/audios de tiktok. 
á°”á©š *#xvideosdl*
> âœ¦ Descarga videos porno de (Xvideos). 
á°”á©š *#xnxxdl*
> âœ¦ Descarga videos porno de (xnxx).
á°”á©š *#apk â€¢ #modapk*
> âœ¦ Descarga un apk de Aptoide.
á°”á©š *#tiktokrandom â€¢ #ttrandom*
> âœ¦ Descarga un video aleatorio de tiktok.
á°”á©š *#npmdl â€¢ #npmdownloader*
> âœ¦ Descarga paquetes de NPMJs.
á°”á©š *#animelinks â€¢ #animedl*
> âœ¦ Descarga Links disponibles de descargas.

â€¢ :ï½¥ï¾ŸâŠ¹Ëšâ€¢ \`ã€Ž Economia ã€\` â€¢ËšâŠ¹:ï½¥ï¾Ÿâ€¢

â Comandos de economÃ­a y rpg para ganar dinero y otros recursos.
á°”á©š *#w â€¢ #work â€¢ #trabajar*
> âœ¦ Trabaja para ganar ${moneda}.
á°”á©š *#slut â€¢ #protituirse*
> âœ¦ Trabaja como prostituta y gana ${moneda}.
á°”á©š *#cf â€¢ #suerte*
> âœ¦ Apuesta tus ${moneda} a cara o cruz.
á°”á©š *#crime â€¢ #crimen
> âœ¦ Trabaja como ladrÃ³n para ganar ${moneda}.
á°”á©š *#ruleta â€¢ #roulette â€¢ #rt*
> âœ¦ Apuesta ${moneda} al color rojo o negro.
á°”á©š *#casino â€¢ #apostar*
> âœ¦ Apuesta tus ${moneda} en el casino.
á°”á©š *#slot*
> âœ¦ Apuesta tus ${moneda} en la ruleta y prueba tu suerte.
á°”á©š *#cartera â€¢ #wallet*
> âœ¦ Ver tus ${moneda} en la cartera.
á°”á©š *#banco â€¢ #bank*
> âœ¦ Ver tus ${moneda} en el banco.
á°”á©š *#deposit â€¢ #depositar â€¢ #d*
> âœ¦ Deposita tus ${moneda} al banco.
á°”á©š *#with â€¢ #retirar â€¢ #withdraw*
> âœ¦ Retira tus ${moneda} del banco.
á°”á©š *#transfer â€¢ #pay*
> âœ¦ Transfiere ${moneda} o XP a otros usuarios.
á°”á©š *#miming â€¢ #minar â€¢ #mine*
> âœ¦ Trabaja como minero y recolecta recursos.
á°”á©š *#buyall â€¢ #buy*
> âœ¦ Compra ${moneda} con tu XP.
á°”á©š *#daily â€¢ #diario*
> âœ¦ Reclama tu recompensa diaria.
á°”á©š *#cofre*
> âœ¦ Reclama un cofre diario lleno de recursos.
á°”á©š *#weekly â€¢ #semanal*
> âœ¦ Reclama tu regalo semanal.
á°”á©š *#monthly â€¢ #mensual*
> âœ¦ Reclama tu recompensa mensual.
á°”á©š *#steal â€¢ #robar â€¢ #rob*
> âœ¦ Intenta robarle ${moneda} a alguien.
á°”á©š *#robarxp â€¢ #robxp*
> âœ¦ Intenta robar XP a un usuario.
á°”á©š *#eboard â€¢ #baltop*
> âœ¦ Ver el ranking de usuarios con mÃ¡s ${moneda}.
á°”á©š *#aventura â€¢ #adventure*
> âœ¦ AventÃºrate en un nuevo reino y recolecta recursos.
á°”á©š *#curar â€¢ #heal*
> âœ¦ Cura tu salud para volverte aventurar.
á°”á©š *#cazar â€¢ #hunt â€¢ #berburu*
> âœ¦ AventÃºrate en una caza de animales.
á°”á©š *#inv â€¢ #inventario*
> âœ¦ Ver tu inventario con todos tus Ã­tems.
á°”á©š *#mazmorra â€¢ #explorar*
> âœ¦ Explorar mazmorras para ganar ${moneda}.
á°”á©š *#halloween*
> âœ¦ Reclama tu dulce o truco (Solo en Halloween).
á°”á©š *#christmas â€¢ #navidad*
> âœ¦ Reclama tu regalo navideÃ±o (Solo en Navidad).

â€¢ :ï½¥ï¾ŸâŠ¹Ëšâ€¢ \`ã€Ž Gacha ã€\` â€¢ËšâŠ¹:ï½¥ï¾Ÿâ€¢

â Comandos de gacha para reclamar y colecciÃ³nar personajes.
á°”á©š *#rollwaifu â€¢ #rw â€¢ #roll*
> âœ¦ Waifu o husbando aleatorio.
á°”á©š  *#claim â€¢ #c â€¢ #reclamar*
> âœ¦ Reclamar un personaje.
á°”á©š *#harem â€¢ #waifus â€¢ #claims*
> âœ¦ Ver tus personajes reclamados.
á°”á©š *#charimage â€¢ #waifuimage â€¢ #wimage* 
> âœ¦ Ver una imagen aleatoria de un personaje.
á°”á©š *#charinfo â€¢ #winfo â€¢ #waifuinfo*
> âœ¦ Ver informaciÃ³n de un personaje.
á°”á©š *#givechar â€¢ #givewaifu â€¢ #regalar*
> âœ¦ Regalar un personaje a otro usuario.
á°”á©š *#vote â€¢ #votar*
> âœ¦ Votar por un personaje para subir su valor.
á°”á©š *#waifusboard â€¢ #waifustop â€¢ #topwaifus*
> âœ¦ Ver el top de personajes con mayor valor.

â€¢ :ï½¥ï¾ŸâŠ¹Ëšâ€¢ \`ã€Ž Stickers ã€\` â€¢ËšâŠ¹:ï½¥ï¾Ÿâ€¢

â Comandos para creaciones de stickers etc.
á°”á©š *#sticker â€¢ #s*
> âœ¦ Crea stickers de (imagen/video)
á°”á©š *#setmeta*
> âœ¦ Estable un pack y autor para los stickers.
á°”á©š *#delmeta*
> âœ¦ Elimina tu pack de stickers.
á°”á©š *#pfp â€¢ #getpic*
> âœ¦ ObtÃ©n la foto de perfil de un usuario.
á°”á©š *#qc*
> âœ¦ Crea stickers con texto o de un usuario.
á°”á©š *#toimg â€¢ #img*
> âœ¦ Convierte stickers en imagen.
á°”á©š *#brat â€¢ #ttp â€¢ #attp*ï¸Ž 
> âœ¦ Crea stickers con texto.
á°”á©š *#emojimix*
> âœ¦ Fuciona 2 emojis para crear un sticker.
á°”á©š *#wm*
> âœ¦ Cambia el nombre de los stickers.

â€¢:ï½¥ï¾ŸâŠ¹Ëšâ€¢ \`ã€Ž Herramientas ã€\` â€¢ËšâŠ¹:ï½¥ï¾Ÿâ€¢

â Comandos de herramientas con muchas funciones.
á°”á©š *#calcular â€¢ #calcular â€¢ #cal*
> âœ¦ Calcular todo tipo de ecuaciones.
á°”á©š *#tiempo â€¢ #clima*
> âœ¦ Ver el clima de un pais.
á°”á©š *#horario*
> âœ¦ Ver el horario global de los paÃ­ses.
á°”á©š *#fake â€¢ #fakereply*
> âœ¦ Crea un mensaje falso de un usuario.
á°”á©š *#enhance â€¢ #remini â€¢ #hd*
> âœ¦ Mejora la calidad de una imagen.
á°”á©š *#letra*
> âœ¦ Cambia la fuente de las letras.
á°”á©š *#read â€¢ #readviewonce â€¢ #ver*
> âœ¦ Ver imÃ¡genes de una sola vista.
á°”á©š *#whatmusic â€¢ #shazam*
> âœ¦ Descubre el nombre de canciones o vÃ­deos.
á°”á©š *#spamwa â€¢ #spam*
> âœ¦ Envia spam aun usuario.
á°”á©š *#ss â€¢ #ssweb*
> âœ¦ Ver el estado de una pÃ¡gina web.
á°”á©š *#length â€¢ #tamaÃ±o*
> âœ¦ Cambia el tamaÃ±o de imÃ¡genes y vÃ­deos.
á°”á©š *#say â€¢ #decir* + [texto]
> âœ¦ Repetir un mensaje.
á°”á©š *#todoc â€¢ #toducument*
> âœ¦ Crea documentos de (audio, imÃ¡genes y vÃ­deos).
á°”á©š *#translate â€¢ #traducir â€¢ #trad*
> âœ¦ Traduce palabras en otros idiomas.

â€¢ :ï½¥ï¾ŸâŠ¹Ëšâ€¢ \`ã€Ž Perfil ã€\` â€¢ËšâŠ¹:ï½¥ï¾Ÿâ€¢

â Comandos de perfil para ver, configurar y comprobar estados de tu perfil.
á°”á©š *#reg â€¢ #verificar â€¢ #register*
> âœ¦ Registra tu nombre y edad en el bot.
á°”á©š *#unreg*
> âœ¦ Elimina tu registro del bot.
á°”á©š *#profile*
> âœ¦ Muestra tu perfil de usuario.
á°”á©š *#marry* [mension / etiquetar]
> âœ¦ PropÃ³n matrimonio a otro usuario.
á°”á©š *#divorce*
> âœ¦ Divorciarte de tu pareja.
á°”á©š *#setgenre â€¢ #setgenero*
> âœ¦ Establece tu gÃ©nero en el perfil del bot.
á°”á©š *#delgenre â€¢ #delgenero*
> âœ¦ Elimina tu gÃ©nero del perfil del bot.
á°”á©š *#setbirth â€¢ #setnacimiento*
> âœ¦ Establece tu fecha de nacimiento en el perfil del bot.
á°”á©š *#delbirth â€¢ #delnacimiento*
> âœ¦ Elimina tu fecha de nacimiento del perfil del bot.
á°”á©š *#setdescription â€¢ #setdesc*
> âœ¦ Establece una descripciÃ³n en tu perfil del bot.
á°”á©š *#deldescription â€¢ #deldesc*
> âœ¦ Elimina la descripciÃ³n de tu perfil del bot.
á°”á©š *#lb â€¢ #lboard* + <PaginÃ¡>
> âœ¦ Top de usuarios con mÃ¡s (experiencia y nivel).
á°”á©š *#level â€¢ #lvl* + <@Mencion>
> âœ¦ Ver tu nivel y experiencia actual.
á°”á©š *#comprarpremium â€¢ #premium*
> âœ¦ Compra un pase premium para usar el bot sin lÃ­mites.
á°”á©š *#confesiones â€¢ #confesar*
> âœ¦ Confiesa tus sentimientos a alguien de manera anonima.

â€¢ :ï½¥ï¾ŸâŠ¹Ëšâ€¢ \`ã€Ž Grupos ã€\` â€¢ËšâŠ¹:ï½¥ï¾Ÿâ€¢

â Comandos de grupos para una mejor gestiÃ³n de ellos.
á°”á©š *#config â€¢ #on*
> âœ¦ Ver opciones de configuraciÃ³n de grupos.
á°”á©š *#hidetag â€¢ #tag*
> âœ¦ Envia un mensaje mencionando a todos los usuarios
á°”á©š *#gp â€¢ #infogrupo*
> âœ¦  Ver la Informacion del grupo.
á°”á©š *#linea â€¢ #listonline*
> âœ¦ Ver la lista de los usuarios en linea.
á°”á©š *#setwelcome*
> âœ¦ Establecer un mensaje de bienvenida personalizado.
á°”á©š *#setbye*
> âœ¦ Establecer un mensaje de despedida personalizado.
á°”á©š *#link*
> âœ¦ el bot envia el link del grupo.
á°”á©š *#admins â€¢ #admin*
> âœ¦ Mencionar a los admins para solicitar ayuda.
á°”á©š *#restablecer â€¢ #revoke*
> âœ¦ Restablecer el enlace del grupo.
á°”á©š *#grupo â€¢ #group* [open / abrir]
> âœ¦ Cambia ajustes del grupo para que todos los usuarios envien mensaje.
á°”á©š *#grupo â€¢ #gruop* [close / cerrar]
> âœ¦ Cambia ajustes del grupo para que solo los administradores envien mensaje.
á°”á©š *#kick* [nÃºmero / mension]
> âœ¦ Elimina un usuario de un grupo.
á°”á©š *#add â€¢ #aÃ±adir â€¢ #agregar* [nÃºmero]
> âœ¦ Invita a un usuario a tu grupo.
á°”á©š *#promote* [mension / etiquetar]
> âœ¦ el bot dara administrador al usuario mencionando.
á°”á©š *#demote* [mension / etiquetar]
> âœ¦ el bot quitara administrador al usuario mencionando.
á°”á©š *#gpbanner â€¢ #groupimg*
> âœ¦ Cambiar la imagen del grupo.
á°”á©š *#gpname â€¢ #groupname*
> âœ¦ Cambiar el nombre del grupo.
á°”á©š *#gpdesc â€¢ #groupdesc*
> âœ¦ Cambiar la descripciÃ³n del grupo.
á°”á©š *#advertir â€¢ #warn â€¢ #warning*
> âœ¦ Darle una advertencia aÃºn usuario.
á°”á©š ï¸Ž*#unwarn â€¢ #delwarn*
> âœ¦ Quitar advertencias.
á°”á©š *#advlist â€¢ #listadv*
> âœ¦ Ver lista de usuarios advertidos.
á°”á©š *#bot on/off*
> âœ¦ Enciende el bot o Apaga el bot en un grupo.
á°”á©š *#encuesta â€¢ #poll*
> âœ¦ Crea una encuesta.
á°”á©š *#delete â€¢ #del*
> âœ¦ Elimina mensaje de otros usuarios.
á°”á©š *#fantasmas*
> âœ¦ Ver lista de inactivos del grupo.
á°”á©š *#kickfantasmas*
> âœ¦ Elimina a los inactivos del grupo.
á°”á©š *#invocar â€¢ #tagall â€¢ #todos*
> âœ¦ Invoca a todos los usuarios de un grupo.
á°”á©š *#setemoji â€¢ #setemo*
> âœ¦ Cambia el emoji que se usa en la invitaciÃ³n de usuarios.
á°”á©š *#listnum â€¢ #kicknum*
> âœ¦ Elimine a usuario por el prefijo de paÃ­s.

â€¢ :ï½¥ï¾ŸâŠ¹Ëšâ€¢ \`ã€Ž Anime ã€\` â€¢ËšâŠ¹:ï½¥ï¾Ÿâ€¢

â Comandos de reacciones de anime.
á°”á©š *#angry â€¢ #enojado* + <mencion>
> âœ¦ Estar enojado
á°”á©š *#bite* + <mencion>
> âœ¦ Muerde a alguien
á°”á©š *#bleh* + <mencion>
> âœ¦ Sacar la lengua
á°”á©š *#blush* + <mencion>
> âœ¦ Sonrojarte
á°”á©š *#bored â€¢ #aburrido* + <mencion>
> âœ¦ Estar aburrido
á°”á©š *#cry* + <mencion>
> âœ¦ Llorar por algo o alguien
á°”á©š *#cuddle* + <mencion>
> âœ¦ Acurrucarse
á°”á©š *#dance* + <mencion>
> âœ¦ Sacate los pasitos prohÃ­bidos
á°”á©š *#drunk* + <mencion>
> âœ¦ Estar borracho
á°”á©š *#eat â€¢ #comer* + <mencion>
> âœ¦ Comer algo delicioso
á°”á©š *#facepalm* + <mencion>
> âœ¦ Darte una palmada en la cara
á°”á©š *#happy â€¢ #feliz* + <mencion>
> âœ¦ Salta de felicidad
á°”á©š *#hug* + <mencion>
> âœ¦ Dar un abrazo
á°”á©š *#impregnate â€¢ #preg* + <mencion>
> âœ¦ Embarazar a alguien
á°”á©š *#kill* + <mencion>
> âœ¦ Toma tu arma y mata a alguien
á°”á©š *#kiss â€¢ #besar* â€¢ #kiss2 + <mencion>
> âœ¦ Dar un beso
á°”á©š *#laugh* + <mencion>
> âœ¦ ReÃ­rte de algo o alguien
á°”á©š *#lick* + <mencion>
> âœ¦ Lamer a alguien
á°”á©š *#love â€¢ #amor* + <mencion>
> âœ¦ Sentirse enamorado
á°”á©š *#pat* + <mencion>
> âœ¦ Acaricia a alguien
á°”á©š *#poke* + <mencion>
> âœ¦ Picar a alguien
á°”á©š *#pout* + <mencion>
> âœ¦ Hacer pucheros
á°”á©š *#punch* + <mencion>
> âœ¦ Dar un puÃ±etazo
á°”á©š *#run* + <mencion>
> âœ¦ Correr
á°”á©š *#sad â€¢ #triste* + <mencion>
> âœ¦ Expresar tristeza
á°”á©š *#scared* + <mencion>
> âœ¦ Estar asustado
á°”á©š *#seduce* + <mencion>
> âœ¦ Seducir a alguien
á°”á©š *#shy â€¢ #timido* + <mencion>
> âœ¦ Sentir timidez
á°”á©š *#slap* + <mencion>
> âœ¦ Dar una bofetada
á°”á©š *#dias â€¢ #days*
> âœ¦ Darle los buenos dÃ­as a alguien 
á°”á©š *#noches â€¢ #nights*
> âœ¦ Darle las buenas noches a alguien 
á°”á©š *#sleep* + <mencion>
> âœ¦ Tumbarte a dormir
á°”á©š *#smoke* + <mencion>
> âœ¦ Fumar
á°”á©š *#think* + <mencion>
> âœ¦ Pensar en algo

â€¢ :ï½¥ï¾ŸâŠ¹Ëšâ€¢ \`ã€Ž NSFW ã€\` â€¢ËšâŠ¹:ï½¥ï¾Ÿâ€¢

â Comandos NSFW (Contenido para adultos)
á°”á©š *#anal* + <mencion>
> âœ¦ Hacer un anal
á°”á©š *#waifu*
> âœ¦ BuscÃ¡ una waifu aleatorio.
á°”á©š *#bath* + <mencion>
> âœ¦ BaÃ±arse
á°”á©š *#blowjob â€¢ #mamada â€¢ #bj* + <mencion>
> âœ¦ Dar una mamada
á°”á©š *#boobjob* + <mencion>
> âœ¦ Hacer una rusa
á°”á©š *#cum* + <mencion>
> âœ¦ Venirse en alguien.
á°”á©š *#fap* + <mencion>
> âœ¦ Hacerse una paja
á°”á©š *#ppcouple â€¢ #ppcp*
> âœ¦ Genera imagenes para amistades o parejas.
á°”á©š *#footjob* + <mencion>
> âœ¦ Hacer una paja con los pies
á°”á©š *#fuck â€¢ #coger â€¢ #fuck2* + <mencion>
> âœ¦ Follarte a alguien
á°”á©š *#cafe â€¢ #coffe*
> âœ¦ Tomate un cafecito con alguien
á°”á©š *#violar â€¢ #perra + <mencion>
> âœ¦ Viola a alguien
á°”á©š *#grabboobs* + <mencion>
> âœ¦ Agarrrar tetas
á°”á©š *#grop* + <mencion>
> âœ¦ Manosear a alguien
á°”á©š *#lickpussy* + <mencion>
> âœ¦ Lamer un coÃ±o
á°”á©š *#rule34 â€¢ #r34* + [Tags]
> âœ¦ Buscar imagenes en Rule34
á°”á©š *#sixnine â€¢ #69* + <mencion>
> âœ¦ Haz un 69 con alguien
á°”á©š *#spank â€¢ #nalgada* + <mencion>
> âœ¦ Dar una nalgada
á°”á©š *#suckboobs* + <mencion>
> âœ¦ Chupar tetas
á°”á©š *#undress â€¢ #encuerar* + <mencion>
> âœ¦ Desnudar a alguien
á°”á©š *#yuri â€¢ #tijeras* + <mencion>
> âœ¦ Hacer tijeras.

â€¢ :ï½¥ï¾ŸâŠ¹Ëšâ€¢ \`ã€Ž Juegos ã€\` â€¢ËšâŠ¹:ï½¥ï¾Ÿâ€¢

â Comandos de juegos para jugar con rus amigos.
á°”á©š *#amistad â€¢ #amigorandom* 
> âœ¦ hacer amigos con un juego. 
á°”á©š *#chaqueta â€¢ #jalamela*
> âœ¦ Hacerte una chaqueta.
á°”á©š *#chiste*
> âœ¦ el bot te cuenta un chiste.
á°”á©š *#consejo* 
> âœ¦ el bot te da un consejo. 
á°”á©š *#doxeo â€¢ #doxear* + <mencion>
> âœ¦ Simular un doxeo falso.
á°”á©š *#facto*
> âœ¦ el bot te lanza un facto. 
á°”á©š *#formarpareja*
> âœ¦ Forma una pareja. 
á°”á©š *#formarpareja5*
> âœ¦ Forma 5 parejas diferentes.
á°”á©š *#frase*
> âœ¦ el bot te da una frase.
á°”á©š *#huevo*
> âœ¦ Agarrale el huevo a alguien.
á°”á©š *#chupalo* + <mencion>
> âœ¦ Hacer que un usuario te la chupe.
á°”á©š *#aplauso* + <mencion>
> âœ¦ Aplaudirle a alguien.
á°”á©š *#marron* + <mencion>
> âœ¦ Burlarte del color de piel de un usuario. 
á°”á©š *#suicidar*
> âœ¦ Suicidate. 
á°”á©š *#iq â€¢ #iqtest* + <mencion>
> âœ¦ Calcular el iq de alguna persona. 
á°”á©š *#meme*
> âœ¦ el bot te envÃ­a un meme aleatorio. 
á°”á©š *#morse*
> âœ¦ Convierte un texto a codigo morse. 
á°”á©š *#nombreninja*
> âœ¦ Busca un nombre ninja aleatorio. 
á°”á©š *#personalidad* + <mencion>
> âœ¦ el bot busca tu personalidad. 
á°”á©š *#piropo*
> âœ¦ Lanza un piropo.
á°”á©š *#pregunta*
> âœ¦ Hazle una pregunta a el bot.
á°”á©š *#ship â€¢ #pareja*
> âœ¦ el bot te da la probabilidad de enamorarte de una persona. 
á°”á©š *#sorteo*
> âœ¦ Empieza un sorteo. 
á°”á©š *#top*
> âœ¦ Empieza un top de personas.
á°”á©š *#formartrio* + <mencion>
> âœ¦ Forma un trio.
á°”á©š *#ahorcado*
> âœ¦ Diviertete con el bot jugando el juego ahorcado.
á°”á©š *#genio*
> âœ¦ Comienza una pregunta con el genio.
á°”á©š *#mates â€¢ #matematicas*
> âœ¦ Responde las preguntas de matemÃ¡ticas para ganar recompensas.
á°”á©š *#ppt*
> âœ¦ Juega piedra papel o tijeras con el bot.
á°”á©š *#sopa â€¢ #buscarpalabra*
> âœ¦ Juega el famoso juego de sopa de letras.
á°”á©š *#pvp â€¢ #suit* + <mencion>
> âœ¦ Juega un pvp contra otro usuario.
á°”á©š *#ttt*
> âœ¦ Crea una sala de juego.
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
handler.command = ['menu', 'menÃº', 'help'];

export default handler;

function clockString(ms) {
    let seconds = Math.floor((ms / 1000) % 60);
    let minutes = Math.floor((ms / (1000 * 60)) % 60);
    let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    return `${hours}h ${minutes}m ${seconds}s`;
}
