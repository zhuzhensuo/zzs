new Vue({
    el:'#app',
    data:{
        step:1,
        formData:{},
        controller:{},
        benefit:{}
    },
    mounted() {
        layui.use(['layer','form'],function(){
            let layer = layui.layer,
                form = layui.form;
            form.val("step1",{
                "companyName": "瀚银科技公司",
                "companyBrief":'瀚银',
                companyType:'私企',
                companyLic:'021992AVGD312112',
                registerCapital:'1000万',
                establishDate:'2009-10-01',
                registerAddress:'中国上海市浦东新区xx路xx号',
                effectDate:'2019-10-01 至 2029-10-01',
                operateCountry:'中国',
                operateProvince:'上海市',
                operateCity:'上海市',
                operateTown:'浦东新区',
                operateAddress:'xx路xx号'
            });
            form.render();
        });
    }
});

