let $ = layui.$,
    baseUrl = 'http://localhost:9528';
function removeLoading(){
    $('body').addClass('oh');
    $.ajax({
        url:'./layui/css/index.less',
        type:'get',
        success:function(){
            $('body').removeClass('oh');
            $('.loading').fadeOut(function(){
                $(this).remove();
            });
        },
        error:function(){
            $('body').removeClass('oh');
            $('.loading').fadeOut(function(){
                $(this).remove();
            });
        }
    });
}
removeLoading();

function countDown(btn,wrap = false){
    let t = btn.text(),
        second = 120;
    let timer = setInterval(function(){
        second--;
        if(second < 0){
            clearInterval(timer);
            btn.removeClass('layui-disabled').text(t);
            done = true;
            return;
        }
        if(!wrap){
            btn.html(`${second}秒后重发`);
        }else{
            btn.html(`${second}秒后<br>重新点击发送`);
        }

    },1000)
}

function setDisabled(el,status){
    if(status){
        $(el).children('i').show().end().addClass('layui-disabled').attr('disabled',true)
    }else{
        $(el).children('i').hide().end().removeClass('layui-disabled').attr('disabled',false)
    }
}