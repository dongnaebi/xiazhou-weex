<template>
    <div style="position: absolute;top:0;right:0;bottom:0;left:0;background-color:#ff6700;justify-content: center;align-items: center;">
        <text style="font-size:48px;color:#fff;">List page</text>
        <text style="font-size:24px;color:#fff;">{{route}}</text>
        <div @click="jump('/product/54562?from=list#3')" style="background-color:#fff;width:400px;height:120px;justify-content: center;align-items: center;">
            <text style="font-size:40px;">Go to detail >></text>
        </div>
    </div>
</template>
<script>
    import mixins from '../../mixins'
    module.exports = {
        mixins:[mixins],
        data(){
            return {
                route:{}
            }
        },
        created: function () {
            this.route=this.$route;
        },
        methods:{
            jump(url) {
                this.$router.push(url)
            }
        }
    };
</script>