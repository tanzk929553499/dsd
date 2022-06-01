// JavaScript Document
//支持Enter键登录
document.onkeydown = function(e){
    if($(".bac").length==0)
    {
        if(!e) e = window.event;
        if((e.keyCode || e.which) == 13){
            var obtnLogin=document.getElementById("submit_btn")
            obtnLogin.focus();
        }
    }
}

$(function(){
    
    //提交表单
    $('#submit_btn').click(function(){
        show_loading();
        //var myReg = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i; //uuidv4正则
        var myReg = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i; //uuidv4正则
        if($('#DeviceId').val() == ''){
            show_err_msg('Enter the device ID！');	
            $('#DeviceId').focus();
        }else if(!myReg.test($('#DeviceId').val())){
            show_err_msg('The format of the device ID is incorrect！');
            $('#DeviceId').focus();
        }else{
            //ajax提交表单，#login_form为表单的ID。 如：$('#login_form').ajaxSubmit(function(data) { ... });
            $.ajax({
                type: 'GET',
                url: 'https://device.pigeonhole.fun' + '/',
                dataType: 'json',
                success: function (data) {
                    localStorage.setItem('uuid', data.id);
                }
            })
            if($('#DeviceId').val() == localStorage.getItem("uuid")){
                show_msg('Login successful, jumping...','/');
                localStorage.setItem("isadmin",false);
                $(location).attr("href", "./mainpage.html");
            }else{
                show_err_msg('Device uuid is wrong!');
                $('#DeviceId').focus();
            }
            //show_msg('Login successful, jumping...','/');
            //localStorage.setItem("uuid",$('#DeviceId').val());
            //localStorage.setItem("isadmin",false);
            //$(location).attr("href", "./mainpage.html");
        }
    });
});
