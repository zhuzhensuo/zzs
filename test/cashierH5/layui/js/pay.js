let done = true,
    verifyCode = -1,
    form = layui.form;
$('.sendYZM').on('click',function(){
    let mobile = '13002172132';
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
                verifyCode = data.verifyCode;
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

form.on('submit(pay)',function(data){
    setDisabled('.btn',true);
    // $.ajax({
    //     type:'post',
    //     url:baseUrl + '/fastPay',
    //     data:data.field,
    //     success(res){
    //         let mock = false;
    //         if(res.code == '0000' && mock){
    //             location.replace('success.html');
    //         }else{
    //             location.replace('fail.html');
    //         }
    //     }
    // })
});