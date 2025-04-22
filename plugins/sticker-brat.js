import { sticker } from '../lib/sticker.js';
import { createCanvas, loadImage, registerFont } from 'canvas';
import fs from 'fs';

const createTextSticker = async (text) => {
    const width = 512;
    const height = 512;

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Fondo transparente
    ctx.clearRect(0, 0, width, height);

    // Texto
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 40px Sans'; // Puedes usar cualquier fuente instalada

    // Centrar texto
    const textWidth = ctx.measureText(text).width;
    ctx.fillText(text, (width - textWidth) / 2, height / 2);

    return canvas.toBuffer('image/png');
};

let handler = async (m, { conn, text }) => {
    if (!text) {
        return conn.sendMessage(m.chat, {
            text: '⚠️ Por favor escribe el texto para el sticker.',
        }, { quoted: m });
    }

    try {
        const imageBuffer = await createTextSticker(text);
        const stiker = await sticker(imageBuffer, false, global.botname, global.nombre);

        if (stiker) {
            return conn.sendFile(m.chat, stiker, 'sticker.webp', '', m);
        } else {
            throw new Error("No se pudo crear el sticker.");
        }
    } catch (error) {
        console.error(error);
        return conn.sendMessage(m.chat, {
            text: `❌ Ocurrió un error: ${error.message}`,
        }, { quoted: m });
    }
};

handler.command = ['brat'];
handler.tags = ['sticker'];
handler.help = ['brat *<texto>*'];

export default handler;
