require('../css/normalize.css');
require('../css/flex.css');
require('../css/main.css');
require('../css/index.less');

import Vue from 'vue';
import { sayHi,returnUrl,request,direct } from '../utils/utils.js';
import ElementUI  from 'element-ui';
Vue.use(ElementUI);
new Vue({
	el:'#app',
	data:{
		form:{
			personal:true,
			personBlock:true,
			companyBlock:true
		}
	},
	directives:direct(),
	methods:{
		removeLoad(){
			this.$refs.isLoading.style['display'] = 'none';
		},
		bindMail:function(){
			request({
				type:'post',
				url:returnUrl('xwa') + '/agent_agentBindMail.action',
				data:{
					type:'bind'
				}
			}).then(data => {
				console.log(data);
				if(data.productType == 'XWCF'){
				   this.form.xwcf = true;
				}else if(data.productType == 'HFT'){
					this.form.xwcf = false;
				}
				if(data.agentType == 'L1'){
					this.form.personal = false;
					this.form.personBlock = false;
				}
				this.$set(this.form,"mobile",data.message);
			});
		},
		uploads:function(ele){
			this.$refs[ele].click();
		},
		uploadEvent:function(event){
			console.log(event);
		}
	},
	created:function(){
		this.bindMail();
	},
	mounted:function(){
		this.removeLoad();
		$("#distpicker").distpicker({
            autoSelect: false
        });
	},
	watch:{
		
	}
})