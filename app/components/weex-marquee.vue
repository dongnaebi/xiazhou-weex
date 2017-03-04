<style scoped>
    .marquee-box{overflow:hidden;}
    .ani {position:absolute;transform:translateY(0) translateZ(0);}
</style>
<template>
    <div class="relative marquee-box" @appear="appeared" @disappear="disappeared">
        <div ref="ani" class="ani">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            step: 0,
            count: 0,
            duration: 0,
            interval: 0,
        },
        data(){
            return{
                index: 1,
                outofview: false
            }
        },
        mounted: function () {
            if (this.interval > 0
                && this.step > 0
                && this.duration > 0) {
                this.nextTick();
            }
        },
        methods: {
            nextTick: function() {
                var self = this;
                if (this.outofview) {
                    setTimeout(self.nextTick.bind(self), self.interval);
                } else {
                    setTimeout(function() {
                        self.animation(self.nextTick.bind(self));
                    }, self.interval);
                }
            },
            animation: function(cb) {
                var self = this;
                var offset = -self.step * self.index;
                var $animation = weex.requireModule('animation');
                $animation.transition(this.$refs.ani, {
                    styles: {
                        transform: 'translateY(' + String(offset) + 'px) translateZ(0)'
                    },
                    timingFunction: 'ease',
                    duration: self.duration
                }, function() {
                    self.index = (self.index + 1) % (self.count);
                    self.$emit('change', {
                        index: self.index,
                        count: self.count
                    });
                    cb && cb();
                });
            },
            appeared: function() {
                this.outofview = false;
            },
            disappeared: function() {
                this.outofview = true;
            }
        }
    }
</script>