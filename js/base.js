$.fn.serializeObject = function()
{
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};

jQuery.extend({ 
	show:function(source,msg, callback, options,opt){
		var fn = callback; 
			var $template = Handlebars.compile(source);
			var context = opt?opt:{"msg": (msg || "确定是否继续？"), "yes": "确定"};  
			$.blockUI({ 
				message: $template(context)	
	        }); 
			$("#com_estarfog_platform_success_yes_btn").click(function() {
				if(fn){
					fn();
				}
				$.unblockUI();
			});
	},
 
	alert: function(msg, callback, options) { 
		var source   = $("<div ><p style='float:left;font-family: Arial, sans-serif;font-size:16px;color: #fff;background-color:#F4D03F;" +
				"font-weight:600;float:left;padding-left:2%;width:98%;height:40px;line-height:40px;text-align:left;margin-bottom:0;'>提示</p>" +
				"<p style='margin-bottom:0;float:left;min-height:20px;color:#222!important;font-size: 15px;color:#2b9bc5;word-break:break-all;width:95%;padding:15px 0;margin:0 10px;'>"+
				"<img src='img/ui-message-icon-warning.png' style='PADDING:3PX;float:left;height:45PX;width:45PX;margin-right:15px;'/>"+
				"{{msg}}</p>"+
				"<p style='margin: 5px;display: inline-block;'><button style='border-radius:4px;padding:2px 15px;background:#72D1FF;color:white;' id='com_estarfog_platform_success_yes_btn' class='btn btn-primary btn-lights'>{{yes}}</button></p>" +
				"</div>").html();
			$.show(source,msg, callback, options); 
		},
	success: function(msg, callback, options) {
		var source   = $("<div ><p style='float:left;font-family: Arial, sans-serif;font-size:16px;color: #fff;background-color:#8AF063;" +
				"font-weight:600;float:left;padding-left:2%;width:98%;height:40px;line-height:40px;text-align:left;margin-bottom:0;'>成功</p>" +
				"<p style='margin-bottom:0;float:left;min-height:20px;color:#222!important;font-size: 15px;color:#2b9bc5;word-break:break-all;width:95%;padding:15px 0;margin:0 10px;'>"+
				"<img src='img/ui-message-icon-success.png' style='PADDING:3PX;float:left;height:45PX;width:45PX;margin-right:15px;'/>"+
				"{{msg}}</p>"+
				"<p style='margin: 5px;display: inline-block;'><button style='border-radius:4px;padding:2px 15px;background:#72D1FF;color:white;' id='com_estarfog_platform_success_yes_btn' class='btn btn-success btn-lights'>{{yes}}</button></p>" +
				"</div>").html();
			$.show(source,msg, callback, options); 
		}, 
	info: function(msg, callback, options) {
		var source   = $("<div ><p style='float:left;font-family: Arial, sans-serif;font-size:16px;color: #fff;background-color:#96BFFE;" +
				"font-weight:600;float:left;padding-left:2%;width:98%;height:40px;line-height:40px;text-align:left;margin-bottom:0;'>信息</p>" +
				"<p style='margin-bottom:0;float:left;min-height:20px;color:#222!important;font-size: 15px;color:#2b9bc5;word-break:break-all;width:95%;padding:15px 0;margin:0 10px;'>"+
				"<img src='img/ui-message-icon-info.png' style='PADDING:3PX;float:left;height:45PX;width:45PX;margin-right:15px;'/>"+
				"{{msg}}</p>"+
				"<p style='margin: 5px;display: inline-block;'><button style='border-radius:4px;padding:2px 15px;background:#72D1FF;color:white;' id='com_estarfog_platform_success_yes_btn' class='btn btn-primary btn-lights'>{{yes}}</button></p>" +
				"</div>").html();
			$.show(source,msg, callback, options); 
	},
	confirm: function(msg, callback, options) {
		var opt = {"msg": (msg || "确定是否继续？"), "yes": "确定", "no": "取消", "cancel": "$.unblockUI();"};
		var source   = $("<div ><p style='float:left;font-family: Arial, sans-serif;font-size:16px;color: #fff;background-color:#FFC300;" +
				"font-weight:600;float:left;padding-left:2%;width:98%;height:40px;line-height:40px;text-align:left;margin-bottom:0;'>选择</p>" +
				"<p style='margin-bottom:0;float:left;min-height:20px;color:#222!important;font-size: 15px;color:#2b9bc5;word-break:break-all;width:95%;padding:15px 0;margin:0 10px;'>"+
				"<img src='img/ui-message-icon-asking.png' style='PADDING:3PX;float:left;height:45PX;width:45PX;margin-right:15px;'/>"+
				"{{msg}}</p>"+
				"<p style='margin: 5px;display: inline-block;'><button style='border-radius:4px;padding:2px 12px;background:#72D1FF;color:white;' id='com_estarfog_platform_success_yes_btn' class='btn btn-warning btn-lights'>{{yes}}</button>&nbsp;&nbsp;&nbsp;<button style='border-radius:4px;padding:2px 12px;background:#72D1FF;color:white;margin-left:18px;' onclick='{{cancel}}' class='btn  btn-lights'>{{no}}</button></p>" +
				"</div>").html();
			$.show(source,msg, callback, options,opt); 
		 
	}, 
	error: function(msg, callback, options) {
		var source   = $("<div ><p style='float:left;font-family: Arial, sans-serif;font-size:16px;color: #fff;background-color:#EC7063;" +
				"font-weight:600;float:left;padding-left:2%;width:98%;height:40px;line-height:40px;text-align:left;margin-bottom:0;'>错误</p>" +
				"<p style='margin-bottom:0;float:left;min-height:20px;color:#222!important;font-size: 15px;color:#2b9bc5;word-break:break-all;width:95%;padding:15px 0;margin:0 10px;'>"+
				"<img src='img/ui-message-icon-error.png' style='PADDING:3PX;float:left;height:45PX;width:45PX;margin-right:15px;'/>"+
				"{{msg}}</p>"+
				"<p style='margin: 5px;display: inline-block;'><button style='border-radius:4px;padding:2px 15px;background:#72D1FF;color:white;' id='com_estarfog_platform_success_yes_btn' class='btn btn-danger btn-lights'>{{yes}}</button></p>" +
				"</div>").html();
			$.show(source,msg, callback, options); 
	},
	loading: function(msg) {
		$.blockUI({
		 	blockMsgClass: 'block',
		 	css: {"border": "none"},
		 	"message": "<p><img src=\"img/loading.gif\"/ style='margin-right:15px;'>" + (msg || "  处理中,请稍候...") + "</p>",
		 	//onOverlayClick: $.unblockUI
        });
	} 
});
var base = {
		token_flag:'Bearer ',
		contentType:'application/json;charset=utf-8',
		uploadContentType:'application/x-www-form-urlencoded',
		authorization:'',token:'',loginUser:'',loginStaffId:804019,
		get_template:function(path){
			var template = $.ajax({url:path,async:false});  
			return Handlebars.compile(template.responseText);
		}, 
		call_json_data:function(url,param,callback_fn,method,contentType,async){ 
			$.loading();
			
			$.ajax({
		         url: url,
		         data: param?param:[],  
		         dataType: 'JSON',
		         async:async,
		         beforeSend: function(xhr) { 
		        	 xhr.setRequestHeader("Authorization", base.authorization); 
		        	 xhr.setRequestHeader("Token", base.token); 
		         },
		         contentType: contentType?contentType:base.contentType,
		         type: method?method:'POST',
		         success: callback_fn,
		         error: base.post_error_fn
		     });
		},
		get_json_data:function(url,param,callback_fn,method,async){
			var cb = function(data, textStatus, request){ 
				if(callback_fn){
					callback_fn(data, textStatus, request);
				}
				$.unblockUI();				
			}
			base.call_json_data(url,param,cb,method,base.contentType,async);
		},
		post_json_data:function(url,param,callback_fn,async){ 
			base.call_json_data(url,param,callback_fn,"POST",base.contentType,async);
		},
		init_sys:function(){
			if(!$.cookie('login_user')){
				$.error('未登陆，请登陆后访问该功能',function(){base.logout_fn();}); 
			}
			base.loginUser=$.cookie('login_user');
			base.authorization=$.cookie('authorization');
			base.token=$.cookie('token');
		},
		logout_fn:function(){ 
			$.cookie('authorization', null, { expires: -1, path: '/' });
			$.cookie('token', null, { expires: -1, path: '/' }); 
			$.cookie('login_user', null, { expires: -1, path: '/' });
			document.location.replace("/whm/login.html"); 
		},
		post_error_fn:function(){
			$.error("操作失败");
			$.unblockUI;
		}
}