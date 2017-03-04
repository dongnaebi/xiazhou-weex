<template>
    <div style="position: absolute;top:0;right:0;bottom:0;left:0;background-color:#ff6700;justify-content: center;align-items: center;">
        <text style="font-size:48px;color:#fff;">Detail page</text>
        <text style="font-size:24px;color:#fff;">{{route}}</text>
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
        }
    };
</script>