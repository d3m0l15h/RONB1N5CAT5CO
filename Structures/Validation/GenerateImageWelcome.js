const Canvas = require('canvas');
const { AttachmentBuilder } = require('discord.js');
const background = 'https://i.imgur.com/Ubo3Vbq.jpg';
Canvas.registerFont('upheavtt.ttf', {family: 'Unpheaval'});

const dim = {
    height: 675,
    width: 1200,
    margin: 50
}

const av = {
    size: 256,
    x: 480,
    y: 170
}

const generateImageWelcome = async (member) => {
    let username = member.user.username;
    let discrim = member.user.discriminator;
    let avatarURL = member.user.displayAvatarURL({extension: 'png', size: av.size});

    const canvas = Canvas.createCanvas(dim.width, dim.height);
    const ctx = canvas.getContext('2d');

    //draw in the background
    const backimg = await Canvas.loadImage(background);
    ctx.drawImage(backimg, 0, 0);

    //draw black tinted box
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(dim.margin, dim.margin, dim.width - 2 * dim.margin,  dim.height - 2 * dim.margin);

    const avimg = await Canvas.loadImage(avatarURL);    
    ctx.save();

    //draw avatar circle
    ctx.beginPath();
    ctx.arc((av.x + av.size / 2) - 10, (av.y + av.size / 2) - 10, (av.size / 2) - 10, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(avimg, av.x, av.y);
    ctx.restore();

    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';

    ctx.font = '50px Unpheaval';
    ctx.fillText('Welcome', dim.width / 2, dim.margin + 70);

    ctx.font = '60px Unpheaval';
    ctx.fillText(username + '#' + discrim, dim.width / 2, dim.height - dim.margin - 125);

    ctx.font = '40px Unpheaval';
    ctx.fillText('to the server', dim.width / 2, dim.height - dim.margin - 50);

    const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'welcome.png' });

    return attachment;
}

module.exports = generateImageWelcome