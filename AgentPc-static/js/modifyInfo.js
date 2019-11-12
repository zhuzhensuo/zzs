layui.use(['layer','form'],function(){
    let layer = layui.layer,
        form = layui.form;
        new Vue({
            el:'#app',
            data:{
                step:1,
                form:{},
                controller:{},
                benefit:{}
            }
        });
        form.render();
});