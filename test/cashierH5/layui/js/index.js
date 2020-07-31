let form = layui.form,
    layer = layui.layer;
$('.payList').on('click','a',function(){
    $(this).siblings('.layui-form-radio').trigger('click');
});
let cardType = '';
form.on('radio(payType)',function(val){
    cardType = val;
});
form.on('submit(pay)',function(data){
    if(!cardType){
        layer.msg('请选择支付方式');
    }
    console.log(data.field);
});