layui.use(['layer'],function(){
    let layer = layui.layer,
        $ = layui.$;
    //let load = layer.load(1);
    // request({
    //     url:'/css/index.less',
    //     type:'get',
    //     dataType:'text/css'
    // }).then(data => {
    //     $('.loading').remove();
    //     layer.close(load);
    // }).catch(err=>{
    //     $('.loading').remove();
    //     layer.close(load);
    // });
    new Vue({
        el:'#app',
        data:{
            mobile:'13002172132',
            type:0
        },
        methods:{
            getType(val){
                this.type = val;
            },
            noticeShow(){
                layer.open({
                    title:'',
                    type:1,
                    shadeClose:true,
                    area: ['700px', '700px'], //宽高
                    content:$('.notice')
                });
            }
        }
    });
});

