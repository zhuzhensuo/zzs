let form = layui.form,
    layer = layui.layer;

$('#tips').on('mouseover',function(){
   layer.tips('最大额度：10万',this,{
        tips:1
    });
});

form.verify({
    'agreement':function(val,el){
        if(!el.checked){
            return '请勾选协议';
        }
    }
});

let done = true;
$('.sendYZM').on('click',function(){
    let mobile = $('.mobile').val();
    if(!/^1[3456789]\d{9}$/.test(mobile)){
        layer.msg('请输入正确的手机号格式');
        return false;
    }
    if(!done) return;

    $.ajax({
        type:'post',
        url:baseUrl +'/verifyCodeAndSendMsg',
        data:{
            mobile
        },
        success:(data) => {
            layer.msg(data.msg);
            if(data.code === '000102'){
                $(this).addClass('layui-disabled');
                countDown($(this));
            } else {
                done = true;
            }
        },
        error:() => {
            done = true;
        }
    });
    done = false;
});

form.on('submit(agreePay)',function(data){
    setDisabled('.agreePay',true);
    $.ajax({
        type:'post',
        url:baseUrl + '/fastPay',
        data:data.field,
        success(res){
            let mock = false;
            if(res.code == '0000' && mock){
                location.replace('success.html');
            }else{
                location.replace('fail.html');
            }
        }
    })
});