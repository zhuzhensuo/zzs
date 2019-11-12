layui.use(['layer','form'],function(){
    let layer = layui.layer,
        form = layui.form,
        $ = layui.$;
    form.render();
    form.verify({
       text:function(text,item){
           if(text !== 'abc'){
               return '验证码错误';
           }
       },
        agreement:function(text,item){
           if(!item.checked){
               return '请勾选协议';
           }
        }
    });
    form.on('submit(submits)',function(data){
        location.href = 'businessMng.html'
    });
    let done = true;
    function countDown(btn){
        let t = btn.text(),
            second = 3;
        let timer = setInterval(function(){
            second--;
            if(second < 0){
                clearInterval(timer);
                btn.removeClass('layui-disabled').text(t);
                done = true;
                return;
            }
            btn.text(`${second}秒后重新点击发送`);
        },1000)
    }
    $('#LAY-get-checkCode').on('click',function(){
        let mobile = $('.mobile').val();
        if(mobile === ''){
            layer.msg('请输入手机号');
            return;
        }
        if(done === false) return;
        request({
            jquery:$,
            type:'post',
            url:baseUrl +'/sendVerifyCode.action',
            data:{
                mobile:mobile
            }
        }).then(data => {
            if(data.code == 200){
                layer.msg(data.msg);
                $(this).addClass('layui-disabled');
                countDown($(this));
            }
        }).catch(err => {
            done = true;
        });
        done = false;
    });
});