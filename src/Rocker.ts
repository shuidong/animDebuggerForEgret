/**
 *
 * @author 
 * 测试摇杆
 */
class Rocker {

    private static instance: Rocker = null;
    private testBtnList: Array<eui.Button> = new Array<eui.Button>();

    public constructor() {
    }

    public static getInstance() {
        if(this.instance == null) {
            this.instance = new Rocker();
        }
        return this.instance;
    }
    
	/*
	 * 打开摇杆
	 */
    public static open() {
        this.getInstance().destoryControl();
        this.getInstance().createLeftControl();
        this.getInstance().createRightControl();
        this.getInstance().createAddControl();
        this.getInstance().createChangeControl();
        
        var text: egret.TextField = new egret.TextField();
        text.text = "使用方法：\n暂停动画，鼠标点击某部位\n（该部位将作为中心点）\n恢复播放查看效果\n箭头进行像素微调";
        Main.basePanel.addChild(text);
    }
    
    /*
     * 关闭摇杆
     */
    public static close() {
        if(this.instance == null) {
            return;
        }
        this.getInstance().destoryControl();
    }


    private createRect(x,y,text) {
        var b = new eui.Button();
        b.skinName = `<?xml version="1.0" encoding="utf-8" ?>
        <e:Skin class="skins.ButtonSkin" states="up,down,disabled" minHeight="50" minWidth="100" xmlns:e="http://ns.egret.com/eui">
            <e:Rect includeIn="disabled" left="0" right="0" top="0" bottom="0" fillColor="0x4A4A4A" fillAlpha="0.4"/>
        	<e:Rect includeIn="down" left="0" right="0" top="0" bottom="0" fillColor="0x4A4A4A" fillAlpha="0.6"/>
			<e:Rect includeIn="up" left="0" right="0" top="0" bottom="0" fillAlpha="0.6"/>
        	<e:Label id="labelDisplay" size="24" horizontalCenter="0" verticalCenter="0"/>
        </e:Skin>`;
        this.testBtnList.push(b);

        b.touchEnabled = true;
        b.width = 80;
        b.height = 80;
        b.x = x;
        b.y = y;
        b.label = text;
        b.labelDisplay["size"] = 20;

        Main.basePanel.addChildAt(b, 8);
        //App.View.addDisplayObj(b,ViewLayer.HUD);
        return b;
    }

    private destoryControl() {
        var len = this.testBtnList.length;
        for(var i = 0;i < len;i++) {
            var rect = this.testBtnList.pop();
            rect.parent.removeChild(rect);
        }
    }

    private createLeftControl() {
        var osX = 84 + 4;
        var osY = Main.basePanel.stage.stageHeight - 300;

        var t = this.createRect(osX,osY,"↑");
        t.addEventListener(egret.TouchEvent.TOUCH_TAP,function() { 
            Main.doAniOffset(0, -1);
        },this);

        var r = this.createRect(osX + 84,osY + 84,"→");
        r.addEventListener(egret.TouchEvent.TOUCH_TAP,function() { 
            Main.doAniOffset(1,0);
        },this);
        
        var d = this.createRect(osX,osY + 84 * 2,"↓");
        d.addEventListener(egret.TouchEvent.TOUCH_TAP,function() { 
            Main.doAniOffset(0,1);
        },this);
        
        var l = this.createRect(osX - 84,osY + 84,"←");
        l.addEventListener(egret.TouchEvent.TOUCH_TAP,function() { 
            Main.doAniOffset(-1,0);
        },this);
    }

    private createRightControl() {

    }

    private createAddControl() {
        var osX = 4;
        var osY = 160;

        var boss = this.createRect(osX,osY,"暂停播放");
        boss.enabled = true;
        boss.addEventListener(egret.TouchEvent.TOUCH_TAP,function() {
            Main.pauseAni();
        },this);

        var killBoss = this.createRect(osX + 84,osY,"恢复播放");
        killBoss.enabled = true;
        killBoss.addEventListener(egret.TouchEvent.TOUCH_TAP,function() {
            Main.playAni();
        },this);

        var pig = this.createRect(osX + 84 * 2,osY,"翻转");
        pig.enabled = true;
        pig.addEventListener(egret.TouchEvent.TOUCH_TAP,function() {
            Main.flipAni();
        },this);

        var killPig = this.createRect(osX + 84 * 3,osY,"导出数据");
        killPig.enabled = true;
        killPig.addEventListener(egret.TouchEvent.TOUCH_TAP,function() {
            Main.dumpMovieClipData();
        },this);
    }

    private createChangeControl() {
        var osX = 640 - 84;
        var osY = 160;

        var knife = this.createRect(osX,osY,"随机武器");
        knife.enabled = false;
        knife.addEventListener(egret.TouchEvent.TOUCH_TAP,function() {
            // TODO 随机武器
        },this);

        var noknife = this.createRect(osX,osY + 84,"赤手空拳");
        noknife.enabled = false;
        noknife.addEventListener(egret.TouchEvent.TOUCH_TAP,function() {
            // TODO 赤手空拳
        },this);

        var jacket = this.createRect(osX,osY + 84 * 2,"随机换装");
        jacket.enabled = true;
        jacket.addEventListener(egret.TouchEvent.TOUCH_TAP,function() {
            // TODO 换装
        },this);

        var sleep = this.createRect(osX,osY + 84 * 3,"裸奔");
        sleep.enabled = true;
        sleep.addEventListener(egret.TouchEvent.TOUCH_TAP,function() {
            // TODO 裸奔
        },this);

    }
}
