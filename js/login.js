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

			function loginFunc(username, password) {
				let einfo = JSON.stringify({
					"username": decodeURIComponent(username),
					"password": decodeURIComponent(password),
				});
				$.ajax({
					type: 'POST',
					url: 'https://cloud-api.ifan.dev:8/api/session',
					xhrFields: {
						withCredentials: true
					},
					crossDomain: true,
					headers: {
						'Content-Type': "application/json",
					},
					data: einfo,
					success: function (data, textStatus, XMLHttpRequest) {
						if(XMLHttpRequest.status == 200){
							//('登录成功咯！  正在为您跳转...','/');
							localStorage.setItem("isadmin",true);
							//alert(document.cookie)
							$(location).attr("href", "./mainpage.html");
						}
					},
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						if (XMLHttpRequest.status == 401) {
							show_err_msg('Login failed','/');
						}
						else show_err_msg('Login failed','/');
					}
				})
			}
			
			//提交表单
			$('#submit_btn').click(function(){
				show_loading();
				var myReg = /[A-Za-z0-9_\-\u4e00-\u9fa5]+/; //用户名正则
				if($('#username').val() == ''){
					show_err_msg('Please enter the user name！');	
					$('#username').focus();
				}else if(!myReg.test($('#username').val())){
					show_err_msg('The user name format is incorrect！');
					$('#username').focus();
				}else if($('#password').val() == ''){
					show_err_msg('Please enter your password！');
					$('#password').focus();
				}else{
					username = $('#username').val();
					password = $('#password').val();
					show_msg('Logging in, please wait...','/');
					$.ajax({
						type: 'GET',
						url: 'https://device-api.ifan.dev:8' + '/',
						dataType: 'json',
						success: function (data) {
							localStorage.setItem('uuid', data.id);
							localStorage.setItem('fuuid', data.id);
						}
					})
					loginFunc(username,password);
				}
			});
		});
