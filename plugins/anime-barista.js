import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, usedPrefix }) => {
    let who;

    if (m.mentionedJid.length > 0) {
        who = m.mentionedJid[0];
    } else if (m.quoted) {
        who = m.quoted.sender;
    } else {
        who = m.sender;
    }

    let name = conn.getName(who);
    let name2 = conn.getName(m.sender);
    m.react('☕');

    let str;
    if (m.mentionedJid.length > 0) {
        str = `\`${name2}\` *está preparando un delicioso café para* \`${name || who}\`.`;
    } else if (m.quoted) {
        str = `\`${name2}\` *está compartiendo un café con* \`${name || who}\`.`;
    } else {
        str = `\`${name2}\` *se está preparando un café aromático.*`.trim();
    }
    
    if (m.isGroup) {
        // Videos de preparación de café (solo 5)
        let pp1 = 'https://files.catbox.moe/tvpxtr.gif'; 
        let pp2 = 'https://files.catbox.moe/s9j5ec.gif'; 
        let pp3 = 'https://files.catbox.moe/ql8p63.gif';
        let pp4 = 'https://files.catbox.moe/xrkt1s.gif';
        let pp5 = 'https://files.catbox.moe/4z9et0.gif';
        
        const videos = [pp1, pp2, pp3, pp4, pp5];
        const video = videos[Math.floor(Math.random() * videos.length)];

        let mentions = [who];
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['barista @tag'];
handler.tags = ['social', 'entretenimiento'];
handler.command = ['barista'];
handler.group = true;

export default handler;
