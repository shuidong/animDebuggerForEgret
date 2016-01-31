# animDebuggerForEgret
## 背景描述
本工具针对egret的序列帧动画开发。
在一个动画对象中，原点位于左上角，默认帧素材的原点也在左上角。
这种情况下，如果对动画进行flip，就会出现镜面翻转，假如人物向右移动，翻转后往左移动的瞬间会有较大的偏差。
因此，需要将动画帧的原点（所谓的中心点）设置到腰部位置，进行调整

## 执行方法
在动画上点击适当的部位，工具将会设置该部位为动画的中心。
然后可以实时翻转查看效果，满意后点击导出数据

## 改善空间
（待追加）