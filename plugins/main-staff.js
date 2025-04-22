import fs from 'fs';

let handler = async (m, { conn }) => {
    let img = './src/catalogo.jpg';

    
    let creador = [['525665619261', '*AngxlKing7 👑*']];

    
    let staff = [
        ['527203112316', '*Chilakiles*']
    ];

    
    let staffMessage = "🌟 *Lista de Staff* 🌟\n\n";
    
    
    staffMessage += "*👑 Creador 👑*\n\n";
    staffMessage += creador.map(([number, name]) => `- ${name}:\n> https://wa.me/${number}\n\n`).join('');
    
   
    staffMessage += "🎩 *Colaboradores* 🎩\n\n";
    staffMessage += staff.map(([number, name]) => `- ${name}:\n> https://wa.me/${number}\n\n`).join('');

    
    if (!fs.existsSync(img)) {
        console.error(`Error: La imagen ${img} no existe.`);
        return m.reply("⚠️ Imagen no encontrada.");
    }

    
    await conn.sendFile(m.chat, img, 'staff.jpg', staffMessage.trim(), m, { linkPreview: true });
};

handler.help = ['staff'];
handler.command = ['colaboradores', 'staff'];
handler.register = true;
handler.tags = ['main'];

export default handler;