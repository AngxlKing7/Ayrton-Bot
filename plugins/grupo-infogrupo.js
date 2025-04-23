const handler = async (m, {conn, participants, groupMetadata}) => {
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch((_) => null) || `${icono}`;
  const {antiLink, detect, welcome, modoadmin, antiPrivate, autoRechazar, nsfw, autoAceptar, restrict, antiSpam, reaction, antiviewonce, antiTraba, antiToxic} = global.db.data.chats[m.chat];
  const groupAdmins = participants.filter((p) => p.admin);
  const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n');
  const owner = groupMetadata.owner || groupAdmins.find((p) => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net';
  const text = `*✧･ﾟ INFO GRUPO ﾟ･✧*
👑 *ID:*
→ ${groupMetadata.id}
🔥 *Nombre:*
→ ${groupMetadata.subject}
🌟 *Descripción:*
→ ${groupMetadata.desc?.toString() || 'Sin Descripción'}
⚡ *Miembros:*
→ ${participants.length} Participantes
👑 *Creador del Grupo:*
→ @${owner.split('@')[0]}
⚡ *Administradores:*
${listAdmin}

˚₊· ͟͟͞͞👑 *CONFIGURACIÓN*

✐ *Welcome* ${welcome ? '✓' : '✗'}
✐ *Detect:* ${detect ? '✓' : '✗'}  
✐ *Antilink:* ${antiLink ? '✓' : '✗'} 
✐ *Autoaceptar:* ${autoAceptar ? '✓' : '✗'} 
✐ *Autorechazar:* ${autoRechazar ? '✓' : '✗'} 
✐ *Nfsw:* ${nsfw ? '✓' : '✗'} 
✐ *Antiprivado:* ${antiPrivate ? '✓' : '✗'} 
✐ *Modoadmin:* ${modoadmin ? '✓' : '✗'} 
✐ *Antiver:* ${antiviewonce ? '✓' : '✗'} 
✐ *Reacción* ${reaction ? "✓️" : "✗️"}
✐ *Antispam:* ${antiSpam ? '✓' : '✗'} 
✐ *Restrict:* ${restrict ? '✓' : '✗'} 
✐ *Antitoxic:* ${antiToxic ? '✓' : '✗'} 
✐ *Antitraba:* ${antiTraba ? '✓' : '✗'} 
`.trim();
  conn.sendFile(m.chat, pp, 'img.jpg', text, m, false, {mentions: [...groupAdmins.map((v) => v.id), owner]});
};
handler.help = ['infogrupo'];
handler.tags = ['grupo'];
handler.command = ['infogrupo', 'gp'];
handler.register = false
handler.group = true;

export default handler;