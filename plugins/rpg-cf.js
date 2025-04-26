let users = {};

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let [eleccion, cantidad] = text.split(' ');
    if (!eleccion || !cantidad) {
        return m.reply(`${emoji} Por favor, elige cara o cruz y una cantidad de ${moneda} para apostar.\nEjemplo: *${usedPrefix + command} cara 5000*`);
    }

    eleccion = eleccion.toLowerCase();
    cantidad = parseInt(cantidad);
    if (eleccion !== 'cara' && eleccion !== 'cruz') {
        return m.reply(`${emoji2} Elección no válida. Por favor, elige cara o cruz.\nEjemplo: *${usedPrefix + command} cara 50*`);
    }

    if (isNaN(cantidad) || cantidad <= 0) {
        return m.reply(`${emoji2} Cantidad no válida. Por favor, ingresa una cantidad mayor a 0.\nEjemplo: *${usedPrefix + command} cara 50*`);
    }

    let apuesta = cantidad * 1000;

    if (apuesta < 1000) {
        return m.reply(`${emoji2} La apuesta mínima es de 1,000 ${moneda} (es decir, 1 en el comando).`);
    }

    let userId = m.sender;
    let user = global.db.data.users[userId];

    if (!user) {
        user = global.db.data.users[userId] = { coin: 100000 }; // Saldo base
    }

    if (user.coin < apuesta) {
        return m.reply(`${emoji2} No tienes suficientes ${moneda} para apostar. Tienes ${user.coin.toLocaleString()} ${moneda}.`);
    }

    let resultado = Math.random() < 0.5 ? 'cara' : 'cruz';
    let mensaje = `${emoji} La moneda ha caído en `;
    if (resultado === eleccion) {
        user.coin += apuesta;
        mensaje += `*${resultado}* y has ganado *${apuesta.toLocaleString()} ${moneda}*!`;
    } else {
        user.coin -= apuesta;
        mensaje += `*${resultado}* y has perdido *${apuesta.toLocaleString()} ${moneda}*!`;
    }

    await conn.reply(m.chat, mensaje, m);
};

handler.help = ['cf'];
handler.tags = ['economy'];
handler.command = ['cf', 'suerte', 'caracruz'];
handler.group = true;
handler.register = false;

export default handler;
