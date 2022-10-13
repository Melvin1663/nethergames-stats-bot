const fs = require('fs');

module.exports = async (client, canvas) => {
    // Backgrounds
    let canvasBackgrounds = ['bedwars', 'duels', 'lobby', 'murdermystery', 'skywars', 'thebridge'];
    canvasBackgrounds.forEach(async bg => client.canvas.backgrounds[bg] = await canvas.loadImage(`./images/backgrounds/${bg}_blurred.png`))
    console.log('Loaded Background Images');

    // Fonts
    canvas.registerFont('./fonts/minecraftory.ttf', { family: 'Minecraftory' });
    canvas.registerFont('./fonts/old/mojang-regular.otf', { family: 'Mojang' });
    canvas.registerFont('./fonts/old/mojang-bold.otf', { family: 'Mojang Bold' });
    canvas.registerFont('./fonts/old/mojang-italic.otf', { family: 'Mojang Italic' });
    canvas.registerFont('./fonts/old/mojang-bold-italic.otf', { family: 'Mojang Bold Italic' });
    console.log('Loaded Fonts');

    // Skins
    const skins = fs.readdirSync('./images/skins/');
    skins.forEach(async skin => client.canvas.skins[skin.split('.')[0]] = await canvas.loadImage(`./images/skins/${skin}`));
    console.log('Loaded Skins');

    // Watermark
    const watermarks = fs.readdirSync('./images/watermark/');
    watermarks.forEach(async wm => client.canvas.watermark[wm.split('.')[0]] = await canvas.loadImage(`./images/watermark/${wm}`));
    console.log('Loaded Watermark images')
}