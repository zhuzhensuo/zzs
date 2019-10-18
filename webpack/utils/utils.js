export function sayHi(name){
	alert(name);
};
export function returnUrl(prefix){
	let testEnv = process.env.MODE,
		BASE_API = '';
	if(testEnv == 'development'){
		BASE_API = prefix +'/hpayWeChatSupport'
	}else{
		BASE_API = '/hpayWeChatSupport'
	}
	return BASE_API;
};
export function request(datas){
	return new Promise((resolve, reject) => {
      datas = $.extend(datas,{
          dataType:'json',
          timeout:60000,
          async: true,
          success(res) {
              resolve(res);
          },
          error(xhr,err,c) {
              reject(c);
          }
      });
    return $.ajax(datas);
  });
};
export function direct(){
	return {
		blur:{
			inserted:function(el){
				el.onblur = function(){
					document.documentElement.scrollTop = document.body.scrollTop = 0;
				}
			}
		}
	}
}