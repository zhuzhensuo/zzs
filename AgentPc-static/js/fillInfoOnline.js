require('../css/normalize.css');
require('../css/index.less');
require('../css/flex.css');
import { request } from '../utils/index'

layui.use(['layer','form','table'],function(){
    let layer = layui.layer,
        form = layui.form,
        table = layui.table;
        form.render();
        table.render({
            elem:'#result',
            method:'post',
            url:'/mock/agentPc/sendVerifyCode.action',
            cols:[[
                {field:'id',title:'序号',width:10+'%'},
                {field:'jgName',title:'机构名称',width:10+'%'},
                {field:'jgNo',title:'机构号',width:10+'%'},
                {field:'merchantName',title:'商户名称',width:10+'%'},
                {field:'productChannel',title:'产品渠道',width:10+'%'},
                {field:'mobile',title:'联系人手机号',width:200},
                {field:'signDate',title:'签约日期',width:10+'%'},
                {field:'updateDate',title:'更新日期',width:10+'%'},
                {field:'status',title:'状态',width:10+'%'},
                {toolbar:'#operate',width:10+'%'},
            ]]
        });
});

