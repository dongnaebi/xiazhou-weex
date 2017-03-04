<style src="../style/main.css"></style>
<style>
    .refresh{width:750px;height:130px;background-color:#f0f0f0;}
    .header{position:absolute;left:0;width:750px;}
    .head-content{flex-direction:row;justify-content:space-between;align-items: center;position: relative;}
    .search-box{width:398px;height:68px;background-color:rgba(255,255,255,.85);border-radius:72px;flex-direction:row;align-items:center;padding-left:20px;padding-right:20px;}
    .slider{width:750px;height:375px;flex-direction:row;background-color:#fff;}
    .slider-item{width:750px;height:375px;}
    .indicator{width:750px;height:20px;position:absolute;bottom:40px;left:0;display:flex;justify-content:center;item-color:#ccc;item-selectedColor:#ff6700;item-size:14;}
    .menu{flex-direction:row;flex-wrap:wrap;background-color:#fff;width:750px;height:330px;align-items:center;padding-top:7.5px;padding-bottom:7.5px;position:relative;}
    .menu-bg{width:750px;height:350px;position: absolute;top:0;left:0;}
    .menu-item{justify-content:center;width:150px;height:160px;align-items:center;position: relative;}
    .menu-item-img{width:80px;height:80px;}
    .menu-item-text{font-size:26px;color:#333;margin-top:10px;}
    .top-news{flex-direction:row;align-items:center;justify-content:space-around;background-color:#fff;height:70px;}
    .news-marquee{width:560px; height:80px;padding-left:10px;padding-right:10px;}
    .grey-space{background-color:#f0f0f0;height:32px;}
    .tab-bar{position:absolute;bottom:0;left:0;width:750px;background-color:rgba(245,245,245,.98);}
    .tab-bar-item{flex:1;justify-content:center;align-items:center;position:relative;}
</style>
<template>
    <div class="full-screen">
        <scroller class="full-screen" @scroll.native="scroll">
            <refresh class="refresh row justify-center align-center" :display="showRefresh" @refresh="refresh">
                <text>下拉刷新</text>
            </refresh>
            <slider class="slider" ref="slider" :autoPlay="true" :interval="3000">
                <image :src="b.img" resize="cover" class="slider-item" v-for="b in page.banner" @click="jump(b.link)"></image>
                <indicator class="indicator"></indicator><!--0.2.0版设置颜色不起作用，flex也不支持-->
            </slider>
            <div class="menu" v-if="page.menu">
                <image :src="page.menu.bg" class="menu-bg" v-if="page.menu.bg"></image>
                <div class="menu-item" v-for="m in page.menu.item" @click="jump(m.link)">
                    <image class="menu-item-img" :src="m.img"></image>
                    <text class="menu-item-text">{{m.text}}</text>
                </div>
            </div>
            <div class="top-news border-top border-bottom" v-if="page.news">
                <image src="//st.360buyimg.com/m/images/index/jd-news-tit.png" style="width:146px;height:32px;margin-left:20px;"></image>
                <weex-marquee class="news-marquee" step="80" count="4" interval="3500" duration="600">
                    <div v-for="n in page.news" style="height:80px;justify-content:center;" @click="jump('https://m.9ji.com/news/#'+n.cid+'-'+n.id)">
                        <text style="color:#333; font-size:28px;text-overflow:ellipsis;lines:1;">{{n.text}}</text>
                    </div>
                </weex-marquee>
            </div>
            <div class="grey-space"></div>
            <div class="align-center" style="height:800px;">
                <text class="margin-top grey-9 font-28">下面一般都是广告位，flex几下就搞定啦...</text>
                <text class="margin-top grey-9 font-28">iOS和安卓暂不支持scroll事件</text>
                <text class="margin-top grey-9 font-28">iOS连续push两个页面以上只能右滑返回一个？push时也偶尔会出现不请求js bundle的情况</text>
                <text class="margin-top grey-9 font-28">iOS push时也偶尔会出现不请求js bundle的情况，比如第一次加载点充值中心</text>
                <text class="margin-top grey-9 font-28">weex-vue-render的bug还很多，三端不一致的情况也很多，头疼</text>
            </div>
        </scroller>
        <div append="tree" class="header"
             :style="{ top:0,height:head.height+'px',backgroundColor:'rgba(201,21,35,'+head.bgAlpha+')', opacity: head.opacity }">
            <div :style="{ height: (40*rpx) + 'px' }" v-if="ios"></div>
            <div class="head-content" :style="{ height: head.contentHeight*rpx+'px' }">
                <div @click="jump('/list/2')" class="align-center justify-center" :style="{ height: head.contentHeight*rpx+'px' ,width:'110px'}">
                    <image src="http://m.mi.com/component/header/img/logo_e6453b2.png" style="width:60px;height:38px;"></image>
                </div>
                <div class="search-box" :style="{ height: (64*rpx) + 'px',width:'530px'}" @click="toggleSearch">
                    <image style="width:30px;height:30px;margin-right:10px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAcCAYAAACQ0cTtAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAACZUlEQVRIx7WWu2tUQRSHv6yPxcZHBIM2ii+IgogxBkllE6JZxUKLFS1SHSGtBGWDa0xE/QMETxtZLOwSXGIau+jiA60CuoVWIvjASnSRtZiZ3bPXm91N9nqquWdmft+cw9w5p4sWpqr7gSHgBLAX2OqnvgJl4CmwICLvWml1NYEMAleBvlYi3l4Bt0VksW2Yqm4ApoFsm5CoPQQmRORnU5iqbgEeAEeMuwIUgXngJfAJSAM9QC8wDJwF1pk9r4FLIvI9FuYjehQBzfrUfGwWiqruBK4BZyLA8zbCtWbypgH9AXIiMtNO3vxhLqvqInALWOO1poArYV3Kn2wQuGD2T7cLikBnPCxY1mvXYcC4SemsiOhKQQZ436cfrzleg6nqQaDff/8G8qsFGct7LYB+zyAFjJhFcyLyuVOS15gzrpEAO2ac8wlEFac1EGB7jHMpQdhbM94dYN3G2XEKl9HqDrCqcVYShP1jKcA+KdsS1O4x428BVjbOwwnCrFY5wJ4b58kEYcNmXAqwonFmVHVHpxRV3Q6cNq7HACkRWQpkXJm4kUBUk9RLTskzam/jHeq3MqOqox1ENQpk/GfVa1ODiUgJKJg9U6o6tgrQGK6sBCt4baCxnuWBA7g6lAJyqnoUmBSRDy0gu4DrNF6KN0Qe9WhbsBnXFtgmpwIsAE+AF7iXYT3uPzrkAUM0tgUAX4BztuuKa3jSuKp9kSbd1zJWxZWWdBywWSs3gCt8x9sEPQPu4lqKArAxCmx5clXtBU7hysQ+YJOf+gG8x/02xXC9/Z6+GODwStPUtsUAc/8NZoD3gF9A9i+YmrjxJaFx6gAAAABJRU5ErkJggg=="></image>
                    <text class="grey-9 font-26">{{page.hotSearch}}</text>
                </div>
                <div class="align-center justify-center" :style="{ height: head.contentHeight*rpx+'px' ,width:'110px'}">
                    <text class="font-30 light">登录</text>
                </div>
            </div>
        </div>
        <div append="tree" class="tab-bar row align-center border-top" :style="{height:100*rpx+'px'}">
            <div v-for="(item,i) in page.tabBar" @click="tabs(i)" class="tab-bar-item" :style="{ height: 100*rpx }">
                <image :src="i!=tabBarSelected?item.img:item.selectImg" v-if="item.text" :style="{ width: (40*rpx) + 'px', height: (40*rpx) + 'px' }"></image>
                <image :src="i!=tabBarSelected?item.img:item.selectImg" v-if="!item.text" :style="{ width: (130*rpx) + 'px', height: (100*rpx) + 'px' }"></image>
                <text v-if="item.text" :style="{ color: i!=tabBarSelected?'#333':'#ff6700', fontSize:'20px', marginTop: 11*rpx+'px' }">{{item.text}}</text>
                <div v-if="page.cartCount&&i==3" style="position:absolute;right:36px;top:8px;background-color:#ff6700;padding-top:2px;padding-bottom:2px;padding-left:8px;padding-right:8px;border-radius:15px;">
                    <text style="color:#fff;font-size:20px;">{{page.cartCount}}</text>
                </div>
            </div>
        </div>
        <search ref="search" @close="toggleSearch" v-if="showSearch"></search>
    </div>
</template>
<script>
    import mixins from '../mixins'
    import search from '../components/search.vue'
    import weexMarquee from '../components/weex-marquee.vue'
    export default {
        mixins:[mixins],
        components:{search,weexMarquee},
        data(){
            return {
                showRefresh:"hide",
                showSearch:false,
                tabBarSelected: 0,
                head: {
                    height: 88,
                    bgAlpha: 0,
                    contentHeight: 88
                },
                page:{}
            }
        },
        created(){
            let self=this;
            let rpx=self.rpx;

            if(self.ios){
                self.head.height = 128 * rpx;
                self.head.contentHeight=80;
                self.head.bgAlpha=.98;
            }
            if(self.android){
                self.head.height = 112 * rpx;
                self.head.contentHeight=112;
            }
            self.getPageData();
        },
        methods:{
            getPageData(){
                let self=this;
                self.request({
                    url:"/data/index.json"
                }).then(res=>{
                    if(res.status==1){
                        self.page=res.data;
                        self.showRefresh = "hide";
                        self.head.opacity=.98;
                    }
                });
            },
            scroll(e){
                if(!this.web)return;//目前scroller组件没有支持滚动事件，这里用html的scroll事件。据说0.11版会支持，期待
                let self=this;
                let scrollTop=e.target.scrollTop;
                if(scrollTop< 199){
                    self.head.bgAlpha =scrollTop / 200;
                }else{
                    self.head.bgAlpha =.98;
                }
            },
            toggleSearch(){
                this.showSearch=!this.showSearch;
            },
            refresh: function () {
                //weex-vue-render 0.2.0下拉刷新不会隐藏bug
                let self=this;
                self.showRefresh = "show";
                self.head.opacity=0;
                self.getPageData();
            },
            tabs(i){
                console.log(i);
            }
        }
    }
</script>