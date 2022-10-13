/**
 * Underline and Strikethroughs only support Mojangles font, else it would look ugly
 * @param {string} string Minecraft String to format to canvas
 * @param {object} ctx Canvas Context
 * @param {number} pos_x Starting X coordinate
 * @param {number} pos_y Y coordinate
 * @param {object} font The font
 * @param {number} fontSize Font size in pixels
 * @param {number} STLift How much pixels up the strikethrough line should be on
 * @param {number} ULDrop How much pixels down the underline should be on
 * @param {number} lineWidth Width of the underline and strikethrough in pixels
 * @returns width
 */

module.exports = (string, ctx, pos_x, pos_y, font, fontSize, STLift, ULDrop, lineWidth) => {
    const formats = {
        0: 'Black',
        1: 'Dark Blue',
        2: 'Dark Green',
        3: 'Dark Aqua',
        4: 'Dark Red',
        5: 'Dark Purple',
        6: 'Gold',
        7: 'Gray',
        8: 'Dark Gray',
        9: 'Blue',
        a: 'Green',
        b: 'Aqua',
        c: 'Red',
        d: 'Light Purple',
        e: 'Yellow',
        f: 'White',
        g: 'Minecoin Gold',

        k: 'Obfuscated', //not supported
        l: 'Bold',
        m: 'Strikethrough',
        n: 'Underline',
        o: 'Italic',
        r: 'Reset'
    }

    const colorHex = {
        'Black': '#000000',
        'Dark Blue': '#0000AA',
        'Dark Green': '#00AA00',
        'Dark Aqua': '#00AAAA',
        'Dark Red': '#AA0000',
        'Dark Purple': '#AA00AA',
        'Gold': '#FFAA00',
        'Gray': '#AAAAAA',
        'Dark Gray': '#555555',
        'Blue': '#5555FF',
        'Green': '#55FF55',
        'Aqua': '#55FFFF',
        'Red': '#FF5555',
        'Light Purple': '#FF55FF',
        'Yellow': '#FFFF55',
        'White': '#FFFFFF',
        'Minecoin Gold': '#DDD605',
    }

    const shadowColorHex = {
        'Black': '#000000',
        'Dark Blue': '#00002A',
        'Dark Green': '#002A00',
        'Dark Aqua': '#002A2A',
        'Dark Red': '#2A0000',
        'Dark Purple': '#2A002A',
        'Gold': '#402A00',
        'Gray': '#2A2A2A',
        'Dark Gray': '#151515',
        'Blue': '#15153F',
        'Green': '#153F15',
        'Aqua': '#153F3F',
        'Red': '#3F1515',
        'Light Purple': '#3F153F',
        'Yellow': '#3F3F15',
        'White': '#3F3F3F',
        'Minecoin Gold': '#373501'
    }

    let colors = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g'];
    let text = ['k', 'l', 'm', 'n', 'o'];

    let sections = string.split('§');
    if (sections[0] != '') sections[0] = `r${sections[0]}`;
    let memory = {
        color: formats.f,
        format: []
    };
    let x = pos_x;
    let oldAlign;

    if (!sections.length) sections.push(`r${string}`);
    if (['end', 'right', 'center'].includes(ctx.textAlign)) {
        sections.forEach(section => {
            let restxt = '';

            let code = section.slice(0, 1);
            if (colors.includes(code) && formats[code]) memory.color = formats[code];
            else if (text.includes(code) && formats[code] && !memory.format.includes(formats[code])) memory.format.push(formats[code]);
            else memory = { color: formats.f, format: [] };
            restxt = section.slice(1);

            let subfont = [];
            if (memory.format.includes('Bold')) subfont.push('Bold');
            if (memory.format.includes('Italic')) subfont.push('Italic');

            ctx.fillStyle = colorHex[memory.color] || '#FFFFFF';
            ctx.shadowColor = shadowColorHex[memory.color] || '#404040';
            ctx.font = `${fontSize}px "${font}${subfont.length ? ` ${subfont.join(' ')}` : ''}"`;

            if (ctx.textAlign == 'center') x -= ctx.measureText(restxt).width / 2
            else x -= ctx.measureText(restxt).width;
        })
        oldAlign = ctx.textAlign;
        ctx.textAlign = 'left';
    }

    let adjX = x;

    memory = { color: formats.f, format: [] };

    sections.forEach(section => {
        let restxt = '';

        let code = section.slice(0, 1);
        if (colors.includes(code) && formats[code]) memory.color = formats[code];
        else if (text.includes(code) && formats[code] && !memory.format.includes(formats[code])) memory.format.push(formats[code]);
        else memory = { color: formats.f, format: [] };
        restxt = section.slice(1);

        let subfont = [];
        if (memory.format.includes('Bold')) subfont.push('Bold');
        if (memory.format.includes('Italic')) subfont.push('Italic');

        ctx.fillStyle = colorHex[memory.color] || '#FFFFFF';
        ctx.shadowColor = shadowColorHex[memory.color] || '#404040';
        ctx.font = `${fontSize}px "${font}${subfont.length ? ' ' + subfont.join(' ') : ''}"`;

        ctx.fillText(restxt, x, pos_y);

        let oldX = x;

        x += ctx.measureText(restxt).width;


        if (memory.format.includes('Underline')) {
            let y = pos_y + (ULDrop || 6);
            let startX = oldX;
            let endX = x;
            switch (ctx.textAlign) {
                case 'center': {
                    startX = oldX - (x - oldX) / 2
                    endX = oldX + (x - oldX) / 2
                }; break;
                case 'end': case 'right': endX = oldX - (x - oldX); break;
            }
            ctx.lineWidth = lineWidth || 3;
            ctx.beginPath();
            ctx.strokeStyle = colorHex[memory.color] || '#FFFFFF';
            ctx.moveTo(startX, y);
            ctx.lineTo(endX, y);
            ctx.stroke();
            ctx.closePath();
        }

        if (memory.format.includes('Strikethrough')) {
            let y = pos_y - (STLift || 8);
            let startX = oldX;
            let endX = x;
            switch (ctx.textAlign) {
                case 'center': {
                    startX = oldX - (x - oldX) / 2
                    endX = oldX + (x - oldX) / 2
                }; break;
                case 'end': case 'right': endX = oldX - (x - oldX); break;
            }
            ctx.lineWidth = lineWidth || 3;
            ctx.beginPath();
            ctx.strokeStyle = colorHex[memory.color] || '#FFFFFF';
            ctx.moveTo(startX, y);
            ctx.lineTo(endX, y);
            ctx.stroke();
            ctx.closePath();
        }
    })

    if (oldAlign) ctx.textAlign = oldAlign;

    return {
        width: ['end', 'right'].includes(oldAlign) ? pos_x - adjX : x - pos_x
    }
}
