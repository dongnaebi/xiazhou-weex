<style src="../style/main.css"></style>
<style scoped>
    .search{width:750px;height:1400px;background-color:#f5f5f5;position:fixed;top:0;left:0;}
    .head-content{flex-direction:row;justify-content:space-between;align-items: center;padding-left:20px;padding-right:20px;}
    .search-box{background-color:#fff;width:620px;border-style:solid;border-width:1px;border-color:#6b6b6b;border-radius:6px;flex-direction:row;align-items:center;justify-content:center;}
    .input{width:550px;font-size:32px;}
    .hot-search-box{flex-direction:row;padding-left:20px;padding-right:20px;padding-top:26px;padding-bottom:12px;}
    .hot-search{flex-direction:row;width:610px;flex-wrap:wrap;}
    .hot-search-item{background-color:#fff;border-style:solid;border-width:1px;border-color:#dfdfdf;border-radius:30px;height:60px;padding-left:20px;padding-right:20px;margin-right:14px;margin-bottom:14px;justify-content: center;}
    .search-history{background-color:#f5f5f5;flex-direction:row;padding-left:20px;padding-right:20px;}
    .search-history-title{padding-top:26px;width:100px;}
    .search-history-item{padding-top:26px;padding-bottom:26px;width:610px;}
    .search-guess{position:absolute;left:0;height:1400px;width:750px;background-color:#f5f5f5;}
    .search-guess-item{height:80px;margin-left:72px;padding-right:20px;justify-content:center;}
</style>
<template>
    <div style="position:relative;">
        <div class="search">
            <div class="border-bottom" :style="{ height: (head.height) + 'px', backgroundColor: '#fff' }">
                <div :style="{ height: (40*rpx) + 'px' }" v-if="ios"></div>
                <div class="head-content" :style="{ height: head.contentHeight*rpx+'px' }">
                    <div class="search-box" :style="{ height:64*rpx+'px'}">
                        <image style="width:30px;height:30px;margin-right:8px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAcCAYAAACQ0cTtAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAACZUlEQVRIx7WWu2tUQRSHv6yPxcZHBIM2ii+IgogxBkllE6JZxUKLFS1SHSGtBGWDa0xE/QMETxtZLOwSXGIau+jiA60CuoVWIvjASnSRtZiZ3bPXm91N9nqquWdmft+cw9w5p4sWpqr7gSHgBLAX2OqnvgJl4CmwICLvWml1NYEMAleBvlYi3l4Bt0VksW2Yqm4ApoFsm5CoPQQmRORnU5iqbgEeAEeMuwIUgXngJfAJSAM9QC8wDJwF1pk9r4FLIvI9FuYjehQBzfrUfGwWiqruBK4BZyLA8zbCtWbypgH9AXIiMtNO3vxhLqvqInALWOO1poArYV3Kn2wQuGD2T7cLikBnPCxY1mvXYcC4SemsiOhKQQZ436cfrzleg6nqQaDff/8G8qsFGct7LYB+zyAFjJhFcyLyuVOS15gzrpEAO2ac8wlEFac1EGB7jHMpQdhbM94dYN3G2XEKl9HqDrCqcVYShP1jKcA+KdsS1O4x428BVjbOwwnCrFY5wJ4b58kEYcNmXAqwonFmVHVHpxRV3Q6cNq7HACkRWQpkXJm4kUBUk9RLTskzam/jHeq3MqOqox1ENQpk/GfVa1ODiUgJKJg9U6o6tgrQGK6sBCt4baCxnuWBA7g6lAJyqnoUmBSRDy0gu4DrNF6KN0Qe9WhbsBnXFtgmpwIsAE+AF7iXYT3uPzrkAUM0tgUAX4BztuuKa3jSuKp9kSbd1zJWxZWWdBywWSs3gCt8x9sEPQPu4lqKArAxCmx5clXtBU7hysQ+YJOf+gG8x/02xXC9/Z6+GODwStPUtsUAc/8NZoD3gF9A9i+YmrjxJaFx6gAAAABJRU5ErkJggg=="></image>
                        <!--native端也必须扩展这个组件才能正常访问-->
                        <searchbox
                                v-if="web"
                                class="input"
                                :style="{ height:60*rpx+'px',borderColor:'#fff'}"
                                :placeholder="page.placeholder"
                                :autofocus="true"
                                @submit="doSearch"
                                @input="getGuess">
                        </searchbox>
                    </div>
                    <div :style="{ width: '70px', alignItems: 'center', justifyContent: 'center', height: head.contentHeight*rpx }" @click="closeSearch"><text style="font-size:32px;color:#6b6b6b;">取消</text></div>
                </div>
            </div>
            <div class="hot-search-box border-bottom" v-if="page.hotSearch.length>0">
                <text class="font-26 grey-6" style="width:120px;padding-top:10px;">热搜：</text>
                <div class="hot-search">
                    <div class="hot-search-item" v-for="h in page.hotSearch" :word="h" @click="jump" :link="'search/' + (h)"><text style="font-size:28px;">{{h}}</text></div>
                </div>
            </div>
            <div class="search-history border-bottom" v-if="page.history.length>0">
                <text class="search-history-title font-26 grey-6">历史：</text>
                <div class="search-history-list">
                    <div class="search-history-item border-bottom" v-for="h in page.history" @click="jump" :link="'search/' + (h)">
                        <text class="font-28">{{h}}</text>
                    </div>
                    <div class="search-history-item clear-search-history" @click="clearHistory()"><text class="font-28 grey-9">清空历史记录</text></div>
                </div>
            </div>
            <div class="search-guess" v-if="page.guess.length>0" :style="{ top: (head.height) + 'px' }">
                <div class="search-guess-item border-bottom" v-for="g in page.guess" @click="jump('search/'+g.name)">
                    <text style="lines:1;text-overflow:ellipsis;font-size:32px;">{{g.name}}</text>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import mixins from '../mixins'
    module.exports = {
        mixins:[mixins],
        data(){
            return{
                head: {
                    height: 88,
                    contentHeight: 88
                },
                page: {
                    placeholder: "",
                    hotSearch: ['111','222','33333'],
                    history: ['111','222','33333'],
                    guess: []
                }
            }
        },
        created(){
            let self = this;
            let rpx = self.rpx;

            if (self.ios) {
                self.head.height = 128 * rpx;
                self.head.contentHeight = 80;
            }
            if (self.android) {
                self.head.height = 112 * rpx;
                self.head.contentHeight = 112;
            }
        },
        methods: {
            closeSearch: function () {
                this.$emit('close');
            },
            getGuess(e){
                let self = this;
                let keyword = e.value;
                if (!keyword) {
                    self.page.guess = [];
                }
                self.request({
                    url: "/data/guess.json",
                    data: {w: keyword}
                }).then(res=>{
                    if (res.status == 1) {
                        self.page.guess = res.data;
                        if (!keyword) {
                            self.page.guess = [];
                        }
                    }
                })
            },
            doSearch: function (e) {
                let self = this;
                let word = e.value;
                if (!word) {
                    word = self.page.placeholder;
                }
                console.log(word)
            },
            clearHistory: function () {
                let self = this;
                self.page.history = [];
            }
        }
    };
</script>