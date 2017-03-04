<style scoped>
    .input{width:100%;height:100%;border:inherit;font:inherit;color:inherit;}
</style>
<template>
    <form @submit="submit" action="javascript:;">
        <html:input class="input" type="search" :placeholder="placeholder" :value="value" :autofocus="autofocus" @input="input($event)" />
    </form>
</template>
<script>
    export default {
        props:{
            placeholder:{
                type: [String],
                default:"输入文字搜索..."
            },
            autofocus:{
                type: [Boolean],
                default:true
            }
        },
        data(){
            return {value:""}
        },
        methods:{
            input(e){
                this.value = e.target.value;
                this.$emit('input',{value:e.target.value});
            },
            submit(){
                this.$emit('submit',{value:this.value});
                return false;
            }
        }
    }
</script>