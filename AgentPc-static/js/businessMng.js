function zoomPic({url,width = "200",height = "100"}){
    layer.open({
        type:'1',
        title:'',
        shadeClose:true,
        area:[width + 'px',height + 'px'],
        content:`<img src="images/${url}" style="width:100%" />`
    });
}
layui.use(['layer','form','flow'],function(){
    let layer = layui.layer,
        form = layui.form,
        flow = layui.flow;
    flow.lazyimg();
    form.render();

});

