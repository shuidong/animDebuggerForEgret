/**
 *
 * @author 
 *
 */
class BitmapFact {
	public constructor() {
	}
	
	/*
	 * 根据名字获取位图，资源需要提前加载
	 */ 
	public static build(nm:string):egret.Bitmap{
        if(!RES.hasRes(nm)){
            return undefined;
    	  }
    	  
        var img: egret.Bitmap = new egret.Bitmap();
        img.texture = RES.getRes(nm);
        return img;
	}
}
