let handler = async (m, { conn, text }) => {
    if (!text) return m.reply("⚠️ Por favor, describe el error que encontraste.")

    if (text.length > 1000) return m.reply("⚠️ El mensaje es muy largo, máximo 1000 caracteres.")

    const report = `*📢 REPORTE DE ERROR*  

🔹 *Número:*  
wa.me/${m.sender.split`@`[0]}  

🔹 *Usuario:*  
${m.pushName || 'Anónimo'}  

🔹 *Mensaje:*  
${text}`

    // Enviar reporte al owner
    await conn.reply("5215665619261@s.whatsapp.net", report, m, { mentions: [m.sender] })

    m.reply("✅ ¡Tu reporte ha sido enviado con éxito! Gracias por ayudar a mejorar el bot.")
}

handler.help = ['reportar']
handler.tags = ['info']
handler.command = ['reporte', 'report', 'reportar', 'bug', 'error']

export default handler
