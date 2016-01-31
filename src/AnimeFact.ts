/**
 *
 * @author 
 *
 */
class AnimeFact {
	public constructor() {
	}
	
	/*
	 * animeMark 配置文件名称前缀 ，比如 ld， 将被转换为ldPng, ldJson
	 * clipDataNm 动画的名字，比如 loading
	 * frameRate 帧率 默认=10
	 */
    public static build(animeMark: string,frameRate?: number): egret.MovieClip {
        var image = RES.getRes(animeMark); //获取图片
        var data = RES.getRes(animeMark + "Json");  //获取描述文件
        if(null == image || null == data) {
            return null;
        }

        var clipDataNm: string = animeMark;
        var mcf: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,image);
        var monkeyClip: egret.MovieClip = new egret.MovieClip(mcf.generateMovieClipData(clipDataNm));
        if(null == monkeyClip) {
            return null;
        } 
        if(frameRate != undefined){
            monkeyClip.frameRate = 10;    //运行帧率，作用同上
        }
        return monkeyClip;
    }
}
