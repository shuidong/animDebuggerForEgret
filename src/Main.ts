
class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;
    public static basePanel: egret.DisplayObjectContainer;
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        Main.basePanel = this.stage;
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("role1Ani");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if(event.groupName == "role1Ani") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    /**
     * 创建游戏场景
     * Create a game scene
     */
    public static TestAni: egret.MovieClip;
    private createGameScene():void {
        egret.log("createGameScene");
        
        Main.TestAni = AnimeFact.build("r1_4s");
        this.addChildAt(Main.TestAni, 1);
        
        Main.TestAni.x = this.stage.stageWidth * 0.5;
        Main.TestAni.y = this.stage.stageHeight * 0.5;
        Main.TestAni.play(-1);
        
        Main.TestAni.addEventListener(egret.TouchEvent.TOUCH_TAP,this.setMousePointAsAnimeCenter,this);
        Main.TestAni.touchEnabled = true;
        
        Rocker.open();
        
        {
            var spDebug: egret.Sprite = new egret.Sprite;
            spDebug.name = "spDebug";
            this.addChildAt(spDebug,5);
            spDebug.graphics.beginFill(0,.3);
            spDebug.graphics.drawRect(0,0,this.stage.stageWidth,this.stage.stageHeight);
            spDebug.graphics.endFill();

            var painter = new Painter(spDebug);
            painter.drawLine(this.stage.stageWidth / 2,0,this.stage.stageWidth / 2,this.stage.stageHeight);
            painter.drawLine(0,this.stage.stageHeight / 2,this.stage.stageWidth,this.stage.stageHeight / 2);
        }
    }
    
    private setMousePointAsAnimeCenter(e: egret.TouchEvent){
        console.log("e.localX=" + e.localX + ";e.localY=" + e.localY);
        Main.doAniOffset(-e.localX, -e.localY);        
    }
    /*
     * 动画帧中心偏移
     */ 
    public static doAniOffset(x:number, y:number){
        var frames = Main.TestAni.movieClipData.frames;
        for(var key in frames){
            var frame = frames[key];
            frame.x += x;
            frame.y += y;
        }
    }
    
    /*
     * 暂停动画
     */ 
    public static pauseAni() { 
        Main.TestAni.stop();
    }
    
    /*
     * 恢复播放动画
     */ 
    public static playAni(){
        Main.TestAni.play(-1);
    }
    
    /*
     * 翻转动画
     */ 
    public static flipAni() { 
        var nowSkewY = Main.TestAni.skewY;
        if(nowSkewY == 0){ 
            Main.TestAni.skewY = 180;
        }else{
            Main.TestAni.skewY = 0;
        }
    }
    
    public static dumpMovieClipData(){
        console.log(Main.TestAni.movieClipData);
        var frames = Main.TestAni.movieClipData.frames;
        var ret = "";
        var limit = frames.length;
        var count = 0;
        for(var k in frames){
            count++;
            var frame = frames[k];
            /*
             * "res":"x1",
			"x":2,
			"y":1
             */ 
            ret += "{\"res\":\"";
            ret += frame.res;
            ret += "\",\"x\":";
            ret += frame.x;
            ret += ",\"y\":";
            ret += frame.y;
            
            if(count != limit){
                ret += "},\n";
            }else{
                ret += "}\n";
            }
            
        } 
        console.log(ret);
    }


}


