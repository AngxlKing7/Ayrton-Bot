// Objeto para almacenar el bot principal por grupo
let primaryBots = {};

// Comando para establecer el bot principal
let setPrimaryHandler = async (m, { conn, text }) => {
    // Verificar si el usuario es administrador
    let isAdmin = await conn.groupMetadata(m.chat).then(metadata => {
        let admin = metadata.participants.find(participant => participant.id === m.sender);
        return admin && admin.admin;
    });

    if (!isAdmin) {
        await m.react('❌');
        return;
    }

    // Obtener el ID del bot etiquetado o al que se responde
    let botId;
    if (m.mentionedJid.length > 0) {
        botId = m.mentionedJid[0];
    } else if (m.quoted && m.quoted.sender) {
        botId = m.quoted.sender;
    } else {
        await m.react('⚠️');
        return;
    }

    // Establecer el bot principal para el grupo
    primaryBots[m.chat] = botId;
    await m.react('✅');
};

// Middleware para que los bots secundarios no respondan a comandos
let commandHandler = async (m, { conn }) => {
    let botId = conn.user.jid;
    let primaryBot = primaryBots[m.chat];

    // Si hay un bot principal y este bot no es el principal, no responder
    if (primaryBot && botId !== primaryBot) {
        return;
    }

    // Procesar el comando normalmente
    // ...
};

// Registrar los handlers
handler.command = ['setprimary'];
handler.admin = true;
handler.botAdmin = true;

export default setPrimaryHandler;
