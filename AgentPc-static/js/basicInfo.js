new Vue({
    el:'#app',
    data:{
        step:1,
        step1:{
            idCardFront:false,//是否上传身份证正面照
            idCardBack:false,//是否上传身份证反面照
            fixDate:false,//法人身份证证件过期日期是否是固定日期
            control:'legal',//实际控制人身份是否是法定代表人
            controlFront:false,//实际控制人身份证正面照
            controlBack:false,//实际控制人身份证反面照
            controlFixedTime:false,//实际控制人身份证证件日期是否是固定日期
            benefit:false//受益人身份
        },
        step2:{
            toPerson:'true'
        },
        controller:{},
        benefit:{}
    },
    methods:{
        zoomPic({url,width,height}){
            layer.open({
                type:1,
                title:'',
                shadeClose:true,
                area:['500','400'],
                content:`<img src="images/${url}" width="${width}" height="${height}" />`
            });
        },
        initLayui(){
            layui.use(['layer','form','upload','laydate'],() => {
                let layer = layui.layer,
                    form = layui.form,
                    upload = layui.upload,
                    laydate = layui.laydate;
                $('#province,#city').change(function(){
                    form.render('select');
                });
                form.on('select(province)',function(){
                    $('#province').trigger('change');
                });
                form.on('select(city)',function(){
                    $('#city').trigger('change');
                });
                form.on('submit(step1)',function(data){
                    console.log(data);
                });
                form.on('radio(longTime)',(data) => {
                    if(data.value === 'longTime'){
                        this.step1.fixDate = false;
                    }
                });
                form.on('radio(pastDate)',(data) => {
                    if(data.value !== 'longTime'){
                        this.step1.fixDate = true;
                        this.$nextTick(()=>{
                            laydate.render({
                                elem: '#date'
                            });
                        });
                    }
                });
                form.on('radio(legalControl)',(data) => {
                    if(data.value === 'legal'){
                        this.step1.control = 'legal';
                    }
                });
                form.on('radio(unLegalControl)',(data) => {
                    if(data.value !== 'legal'){
                        this.step1.control = 'unLegal';
                    }
                });
                form.on('radio(controlLong)',(data) => {
                    if(data.value === 'longTime'){
                        this.step1.controlFixedTime = false;
                    }
                });
                form.on('radio(controlFixed)',(data) => {
                    if(data.value !== 'longTime'){
                        this.step1.controlFixedTime = true;
                        this.$nextTick(()=>{
                            laydate.render({
                                elem: '#controlDate'
                            });
                        });
                    }
                });
                let uploadImage = {},
                    uploadList = [{
                        name:'license',
                        id:'#license1',
                        preview:'#license2',
                        demoText:'#license3'
                    },{
                        name:'idCardFront',
                        id:'#idCardFront1',
                        preview:'#idCardFront2',
                        demoText:'#idCardFront3'
                    },{
                        name:'idCardBack',
                        id:'#idCardBack1',
                        preview:'#idCardBack2',
                        demoText:'#idCardBack3'
                    },{
                        name:'controllerFront',
                        id:'#controllerFront1',
                        preview:'#controllerFront2',
                        demoText:'#controllerFront3'
                    },{
                        name:'controllerBack',
                        id:'#controllerBack1',
                        preview:'#controllerBack2',
                        demoText:'#controllerBack3'
                    }];
                uploadList.forEach(v => {
                    let uploadInst = upload.render({
                        elem: v.id
                        ,accept:'images'
                        ,acceptMime:'images/'
                        ,url: baseUrl + '/hpayWeChatSupport/agent_authImageUpload.action'
                        ,before: function(obj){
                            //预读本地文件示例，不支持ie8
                            obj.preview(function(index, file, result){
                                $(v.preview).attr('src', result); //图片链接（base64）
                            });
                        }
                        ,done:res => {
                            //如果上传失败
                            if(res.code > 0){
                                uploadImage[v.name] = '';
                                return layer.msg('上传失败');
                            }else{
                                uploadImage[v.name] = res.filePath;
                                if(v.name === 'idCardFront'){
                                    this.step1.idCardFront = true;
                                    this.$set(this.step1,'legalName',res.legalName);
                                    this.$set(this.step1,'legalId',res.idCardNo);
                                }else if(v.name === 'idCardBack'){
                                    this.step1.idCardBack = true;
                                    let date = res.dateType;
                                    if(isNaN(date)){
                                        this.step1.fixDate = false;
                                    }else{
                                        this.step1.fixDate = true;
                                        let dateObj = new Date(date - 0),
                                            ymd = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`;
                                        this.$set(this.step1,'date',ymd);
                                        this.$nextTick(()=>{
                                            form.render('radio');
                                            laydate.render({
                                                elem: '#date'
                                            });
                                        });
                                    }

                                }else if(v.name === 'controllerFront'){
                                    this.step1.controlFront = true;
                                    this.$set(this.step1,'controlName',res.legalName);
                                    this.$set(this.step1,'controlId',res.idCardNo);
                                }else if(v.name === 'controllerBack'){
                                    this.step1.controlBack = true;
                                    let date = res.dateType;
                                    if(isNaN(date)){
                                        this.step1.controlFixedTime = false;
                                    }else{
                                        this.step1.controlFixedTime = true;
                                        let dateObj = new Date(date - 0),
                                            ymd = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`;
                                        this.$set(this.step1,'controlDate',ymd);
                                        this.$nextTick(()=>{
                                            form.render('radio');
                                            laydate.render({
                                                elem: '#controlDate',
                                                value:ymd
                                            });
                                        });
                                    }
                                }
                            }
                            //上传成功
                        }
                        ,error: function(){
                            //演示失败状态，并实现重传
                            let demoText = $(v.demoText);
                            demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
                            demoText.find('.demo-reload').on('click', function(){
                                uploadInst.upload();
                            });
                        }
                    });
                });
                let uploadFunc = function({el,preview,demoText}){
                    let uploadInst = upload.render({
                        elem:el
                        ,url: '/upload/'
                        ,accept:'images'
                        ,acceptMime:'images/'
                        ,before: function(obj){
                            //预读本地文件示例，不支持ie8
                            obj.preview(function(index, file, result){
                                $(preview).attr('src', result); //图片链接（base64）
                            });
                        }
                        ,done: function(res){
                            //如果上传失败
                            if(res.code > 0){
                                return layer.msg('上传失败');
                            }
                            //上传成功
                        }
                        ,error: function(){
                            //演示失败状态，并实现重传
                            let demoText = $(demoText);
                            demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
                            demoText.find('.demo-reload').on('click', function(){
                                uploadInst.upload();
                            });
                        }
                    });
                };

                form.on('submit(step1)',(data) => {
                    if(!uploadImage['license']){
                        layer.msg('请上传营业执照图片',{
                            icon:2
                        });
                        return false;
                    }
                    if(!uploadImage['idCardFront']){
                        layer.msg('请上传身份证正面照',{
                            icon:2
                        });
                        return false;
                    }
                    if(!uploadImage['idCardBack']){
                        layer.msg('请上传身份证反面照',{
                            icon:2
                        });
                        return false;
                    }
                    if(this.step1.control === 'unLegal' && !uploadImage['controllerFront']){
                        layer.msg('请上传实际控制人身份证正面照',{
                            icon:2
                        });
                        return false;
                    }
                    if(this.step1.control === 'unLegal' && !uploadImage['controllerBack']){
                        layer.msg('请上传实际控制人身份证反面照',{
                            icon:2
                        });
                        return false;
                    }
                    this.step = 2;
                    console.log(uploadImage);
                });
            });
        }
    },
    mounted(){
        this.initLayui();
        $("#distpicker").distpicker({
            autoSelect: false
        });
    }
});


