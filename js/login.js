//var token = 'Bearer ' + currUser.token;
var whm={
	token_flag:'Bearer ',
	contentType:'application/json;charset=utf-8',
	login_url:'http://127.0.0.1:9400/whm/login',
	login_fn:function(){
		 $.ajax({
	         url: whm.login_url,
	         data: whm.login_para(),  
	         dataType: 'JSON',
	         contentType: whm.contentType,
	         type: 'POST',
	         success: whm.login_success_fn,
	         error: whm.login_error_fn
	     });
	},
	login_para:function(){
		var param = {
	    		username:$("#username").val(),
	    		password:$("#password").val()	
	      } 
		return JSON.stringify( param );
	},
	login_success_fn:function(data, textStatus, request){
		var authorization = request.getResponseHeader("Authorization"); 
		var token = authorization.replace(whm.token_flag,"");
		$.cookie('authorization', authorization, { expires: 1, path: '/' });
		$.cookie('token', token, { expires: 1, path: '/' }); 
		$.cookie('login_user', $("#username").val(), { expires: 1, path: '/' });
		console.log(authorization);
		document.location.replace("/whm/index.html"); 
	},
	login_error_fn:function(){
		alert("登陆失败");
	}
}

$("#btn_login").on({click:whm.login_fn,dblclick:whm.login_fn});