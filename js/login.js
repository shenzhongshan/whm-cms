var whm={ 
	login_url:'/whm/login',
	login_fn:function(){
		 $.ajax({
	         url: whm.login_url,
	         data: whm.login_para(),  
	         dataType: 'JSON',
	         contentType: base.contentType,
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
		var isAdmin = request.getResponseHeader("is_admin");
		isAdmin = eval(isAdmin);
		var token = authorization.replace(whm.token_flag,"");
		$.cookie('authorization', authorization, { expires: 1, path: '/' });
		$.cookie('token', token, { expires: 1, path: '/' }); 
		$.cookie('isAdmin', isAdmin, { expires: 1, path: '/' }); 
		$.cookie('login_user', $("#username").val(), { expires: 1, path: '/' });
		console.log(authorization);
		document.location.replace(isAdmin?"/whm/main.html":"/whm/index.html"); 
	},
	login_error_fn:function(){
		$.error("登陆失败,用户名或密码错误,请重新输入后再尝试");
	}
}

$("#btn_login").on({click:whm.login_fn,dblclick:whm.login_fn});