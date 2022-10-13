const canvasMain = require('canvas');

module.exports = (skinImage, scale, ctx, x, y) => {
    let skinImageCanvas = canvasMain.createCanvas(64, 64);
    let skinCtx = skinImageCanvas.getContext('2d');
    skinCtx.drawImage(skinImage, 0, 0)
    let data = skinCtx.getImageData(54, 20, 1, 1).data;
    let slim = undefined;

    for (i = 0; i < data.length; i++) {
        if (data[i] == 0) {
            slim = true;
            // break;
        } else {
            slim = false;
            break;
        }
    }

    ctx.imageSmoothingEnabled = false
    ctx.shadowColor = 'rgba(85,85,85,0.25)';
    var s = scale;
    //draw the head
    ctx.drawImage(skinImage, 8, 8, 8, 8, x + (4 * s), y + (0 * s), 8 * s, 8 * s);
    ctx.shadowColor = 'rgba(85,85,85,0)';
    ctx.drawImage(skinImage, 40, 8, 8, 8, x + (4 * s), y + (0 * s), 8 * s, 8 * s)

    ctx.shadowColor = 'rgba(85,85,85,0.25)';
    if (slim) {
        // draw slim left arm
        ctx.drawImage(skinImage, 44, 20, 3, 12, x + (1 * s), y + (8 * s), 3 * s, 12 * s);
        ctx.shadowColor = 'rgba(85,85,85,0)'
        ctx.drawImage(skinImage, 44, 36, 3, 12, x + (1 * s), y + (8 * s), 3 * s, 12 * s);
    } else {
        //draw the left arm
        ctx.drawImage(skinImage, 44, 20, 4, 12, x + (0 * s), y + (8 * s), 4 * s, 12 * s);
        ctx.shadowColor = 'rgba(85,85,85,0)'
        ctx.drawImage(skinImage, 44, 36, 4, 12, x + (0 * s), y + (8 * s), 4 * s, 12 * s);
    }

    //draw the body
    ctx.shadowColor = 'rgba(85,85,85,0.25)';
    ctx.drawImage(skinImage, 20, 20, 8, 12, x + (4 * s), y + (8 * s), 8 * s, 12 * s);
    ctx.shadowColor = 'rgba(85,85,85,0)';
    ctx.drawImage(skinImage, 20, 36, 8, 12, x + (4 * s), y + (8 * s), 8 * s, 12 * s);
    ctx.shadowColor = 'rgba(85,85,85,0.25)';

    if (slim) {
        // draw slim right arm
        ctx.drawImage(skinImage, 36, 52, 3, 12, x + (12 * s), y + (8 * s), 3 * s, 12 * s);
        ctx.shadowColor = 'rgba(85,85,85,0)';
        ctx.drawImage(skinImage, 51, 52, 3, 12, x + (12 * s), y + (8 * s), 3 * s, 12 * s);
    } else {
        //draw the right arm
        ctx.drawImage(skinImage, 36, 52, 4, 12, x + (12 * s), y + (8 * s), 4 * s, 12 * s);
        ctx.shadowColor = 'rgba(85,85,85,0)';
        ctx.drawImage(skinImage, 52, 52, 4, 12, x + (12 * s), y + (8 * s), 4 * s, 12 * s);
    }


    //draw the left leg
    ctx.shadowColor = 'rgba(85,85,85,0.25)'
    ctx.drawImage(skinImage, 4, 20, 4, 12, x + (4 * s), y + (20 * s), 4 * s, 12 * s);
    ctx.shadowColor = 'rgba(85,85,85,0)'
    ctx.drawImage(skinImage, 4, 36, 4, 12, x + (4 * s), y + (20 * s), 4 * s, 12 * s);
    //draw the right leg
    ctx.shadowColor = 'rgba(85,85,85,0.25)'
    ctx.drawImage(skinImage, 20, 52, 4, 12, x + (8 * s), y + (20 * s), 4 * s, 12 * s);
    ctx.shadowColor = 'rgba(85,85,85,0)'
    ctx.drawImage(skinImage, 4, 52, 4, 12, x + (8 * s), y + (20 * s), 4 * s, 12 * s);


}