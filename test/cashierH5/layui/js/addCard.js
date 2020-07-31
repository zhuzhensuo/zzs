let form = layui.form,
    layer = layui.layer;
form.verify({
   'isBankNo':function(val){
       val = val.replace(/\s/g,'');
       if(!/^([1-9]{1})(\d{15}|\d{18})$/.test(val)){
           layer.msg('请输入正确的银行卡号');
           return false;
       }else{
           form.on('submit(nextStep)',function(data){
               setDisabled('.nextStep',true);
               $.ajax({
                   url:baseUrl + '/addNewCard',
                   type:'post',
                   data:data.field,
                   success:function(res){
                       if(res.code == '0000'){
                           location.href = 'fastpay.html';
                       }
                   },
                   error:function(){
                       setDisabled('.nextStep',false);
                       layer.msg('系统错误',{
                           icon:2
                       });
                   }
               })
           });
       }
   }
});
$('.bankNo').on('input',function(){
    let value = this.value;
    value = value.replace(/\s+/g,'').replace(/(\d{4})/g,'$1 ').replace(/\s+$/,'');
    $(this).val(value);
});