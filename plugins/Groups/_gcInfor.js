const { Zenith } = require('../../lib/functions');
const moment = require('moment-timezone');
const config = require('../../config');

Zenith({
    usage: 'gcinfo',
    desc: 'Shows group information',
    category: 'Group',
}, async (vorterx, m, react, { text, args, participants, groupAdmin, metadata, groupName }) => {
   
    var get_cc = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg';

    var get_invite = null;
    try {
        get_cc = await vorterx.profilePictureUrl(m.chat, 'image');
        get_invite = await vorterx.groupInviteCode(m.chat);
    } catch (error) {
        console.error(error);
    }

    var MADEDate = moment(metadata.creation * 1000).tz('Africa/Johannesburg').format('MMMM D, YYYY [at] h:mm A');

    var get_infor = ` *乂 GROUP GC INFO 乂*\n\n` +
`*〄 NAME:* ${groupName}\n` +
`*〄 GC ID:* ${m.chat}\n` +
`*〄 MADE AT:* ${MADEDate}\n` +
`*〄 GC OWNER:* @${metadata.owner.split('@')[0]}\n` +
`*〄 ADMINS:* ${groupAdmin.length}\n` +
`*〄 MEMBERS:* ${participants.length}\n\n` +
`*〄 DESC:*\n${metadata.desc}\n\n*${config.CAPTION}*`;

    vorterx.sendMessage(m.chat, { image: { url: get_cc }, caption: get_infor, mentions: [metadata.owner] }, { quoted: m });
});
