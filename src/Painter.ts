/**
 *
 * @author 
 *
 */
class Painter {
    private sprite: egret.Sprite;
    
	public constructor(sp:egret.Sprite) {
        this.sprite = sp;
	}
	
    private COLOR_D_SLEEP: number = 0x999999;
    private COLOR_D_WAKE: number = 0xe5b2b2;
    private COLOR_K: number = 0x7f7fe5;
    private COLOR_S: number = 0x7fe57f;
    
    public drawLine(x1: number,y1: number,x2: number,y2: number): void {

        var g: egret.Graphics = this.sprite.graphics;
        
        g.beginFill(0,1);
        g.lineStyle(0.5,this.COLOR_S);
        g.moveTo(x1,y1);
        g.lineTo(x2,y2);

        g.endFill();
    }
}
