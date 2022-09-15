export class Align{
    static scaleToGameW(game, windowWidth, obj, per) {
        console.log(obj.displayWidth)
        console.log(windowWidth)
        console.log(game.config.width)
        obj.displayWidth = game.config.width*per;
        obj.scaleY = obj.scaleX
    }
}