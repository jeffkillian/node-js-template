const GIFEncoder = require('gifencoder');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

module.exports = class GifCreator {
    constructor(){
        this.encoder = "";
    }
    start(width, height) {
        this.encoder = new GIFEncoder(width, height);
        this.encoder.createReadStream().pipe(fs.createWriteStream('created_gif.gif'));
        this.encoder.start();
        this.encoder.setRepeat(0);   // 0 fors repeat, -1 for no-repeat
        this.encoder.setQuality(1); // image quality. 10 is default.
        this.canvas = createCanvas(width, height);
        this.ctx = this.canvas.getContext('2d');
        this.encoder.addFrame(this.ctx);
    }

    async addFrame(base64, delay){
        this.encoder.setDelay(delay);  // frame delay in ms
        let img = await loadImage(base64)
        this.ctx.drawImage(img, 0, 0);
        this.encoder.addFrame(this.ctx);
    }

    finish(){
        this.encoder.finish();
    }

    // loadImage(src) {
    //     return new Promise((resolve, reject) => {
    //       const img = new Image();
    //       img.addEventListener("load", () => resolve(img));
    //       img.addEventListener("error", err => reject(err));
    //       img.src = src;
    //     });
    //   };
      

    createSampleGif() {
        const encoder = new GIFEncoder(320, 240);
        encoder.setQuality(10); // image quality. 10 is default.
        // stream the results as they are available into myanimated.gif
        encoder.createReadStream().pipe(fs.createWriteStream('myanimated.gif'));
        
        encoder.start();
        encoder.setRepeat(0);   // 0 fors repeat, -1 for no-repeat
        encoder.setDelay(500);  // frame delay in ms
        encoder.setQuality(10); // image quality. 10 is default.
        
        // use node-canvas
        const canvas = createCanvas(320, 240);
        const ctx = canvas.getContext('2d');
        
        // red rectangle
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(0, 0, 320, 240);
        encoder.addFrame(ctx);
        
        // green rectangle
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(0, 0, 320, 240);
        encoder.addFrame(ctx);
        
        // blue rectangle
        ctx.fillStyle = '#0000ff';
        ctx.fillRect(0, 0, 320, 240);
        encoder.addFrame(ctx);
        
        encoder.finish();
    }
}