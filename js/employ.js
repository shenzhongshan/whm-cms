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
var employ={
	token_flag:'Bearer ',
	contentType:'application/json;charset=utf-8',
	uploadContentType:'application/x-www-form-urlencoded',
	authorization:'',token:'',loginUser:'',curEmploys:[],
	api_url:{  
		employ_save:"/whm/users/save",// http://120.0.0.1:9400/whm/wts/report/201807,
		employ_del:"/whm/users/del/",// http://120.0.0.1:9400/whm/wts/del/1,
		employ_import:"/whm/imp/staff",// http://120.0.0.1:9400/whm/wts/del/1,
		employ_query:"/whm/users/list/",// http://120.0.0.1:9400/whm/wts/list/1,9999
	},
	template:{
		employ:function(){ return employ.get_template("template/employTemplate.js");},
		editEmploy:function(){return employ.get_template("template/editEmployTemplate.js");}
	},
	get_template:function(path){
		var template = $.ajax({url:path,async:false});  
		return Handlebars.compile(template.responseText);
	}, 
	call_json_data:function(url,param,callback_fn,method,contentType){
		$.ajax({
	         url: url,
	         data: param?param:[],  
	         dataType: 'JSON',
	         async:false,
	         beforeSend: function(xhr) { 
	        	 xhr.setRequestHeader("Authorization", employ.authorization); 
	        	 xhr.setRequestHeader("Token", employ.token); 
	         },
	         contentType: contentType?contentType:employ.contentType,
	         type: method?method:'POST',
	         success: callback_fn,
	         error: employ.post_error_fn
	     });
	},
	get_json_data:function(url,param,callback_fn,method){
		employ.call_json_data(url,param,callback_fn,method,employ.contentType);
	},
	post_json_data:function(url,param,callback_fn){
		employ.get_json_data(url,param,callback_fn,"POST");
	},
	init_fn:function(){
		if(!$.cookie('login_user')){
			alert('未登陆，请登陆后访问该功能');
			employ.logout_fn();
		}
		employ.loginUser=$.cookie('login_user');
		employ.authorization=$.cookie('authorization');
		employ.token=$.cookie('token');
		employ.init_header_fn(); 
		$("#index_header_logout_li").on({click:employ.logout_fn,dblclick:employ.logout_fn});
	},
	init_header_fn:function(){ 
		var loginUser = $.cookie('login_user'),userLi = $("#index_header_admin_li");
		$("#index_header_login_user").html("<i class='icon-cog'></i> "+loginUser); 
		 
	}, 
	get_local_employ_by_id:function(wstId){
		var ts = null;
		if(!employ.curEmploys) return ts;
		if(employ.curEmploys.length<1) return ts;
		
		$.each(employ.curEmploys,function(i,t){
			if(t.id == wstId) {ts = t;return false;}
		});
		return ts;
	}, 
	query_employ_fn:function(){ 
		var container = $("#index_main_container_div");  
		var template = employ.template.employ();
		var context = {};
		var callback_fn = function(data, textStatus, request){
			var context = JSON.parse( request.responseText );  
			employ.curEmploys = context; 
			var list = {};
			list.employees = context;
			var html = template(list);  
			 
			container.html(html);
		}
		var data = {},condition = $("#staffid_search_input").val();
		if(condition){data.staffName = condition;}
		data = JSON.stringify( data );
		var url=employ.api_url.employ_query+"1,9999"; 
		employ.get_json_data(url,data,callback_fn,"POST");
		
	},
	edit_employ_fn:function(employId){ 
		var container = $("#index_main_container_div");  
		var template = employ.template.editEmploy();  
		var curSt =  employ.get_local_employ_by_id(employId); 
		var html = template(curSt);  
		container.html(html);
		if(curSt){
			$("input[name='gender'][value="+curSt.gender+"]").attr("checked",true); 
			$("#sel_position").val(curSt.position);
			$("#sel_jobTitle").val(curSt.jobTitle);
		}		
	}, 
	save_employ_fn:function(){ 
		var emData = $("#edit-employ-form").serializeObject(); 
		emData = JSON.stringify( emData );
		var callback_fn = function(data, textStatus, request){
			alert('保存成功');
		}
		employ.post_json_data( employ.api_url.employ_save,emData,callback_fn); 
	},
	del_employ_fn:function(id){
		var url = employ.api_url.employ_del+id;
		var callback_fn = function(data, textStatus, request){
			alert('删除成功');
			employ.query_employ_fn(employ.curYear,employ.curMonth);
		}
		employ.post_json_data( url,null,callback_fn); 
	},
	import_empoly_fn:function(){ 
		$.ajax({
		    url: employ.api_url.employ_import,
		    type: 'POST',
		    cache: false,
		    beforeSend: function(xhr) { 
	        	 xhr.setRequestHeader("Authorization", employ.authorization); 
	        	 xhr.setRequestHeader("Token", employ.token); 
	         },
		    data: new FormData($('#uploadForm')[0]),
		    processData: false,
		    contentType: false
		}).done(function(res) {
			alert('导入成功！');
			$("#employ_import_btn_close").click();
		}).fail(function(res) {
			$("#employ_import_btn_close").click();
			alert('导入失败！')
		}); 
	},
	logout_fn:function(){ 
		$.cookie('authorization', null, { expires: -1, path: '/' });
		$.cookie('token', null, { expires: -1, path: '/' }); 
		$.cookie('login_user', null, { expires: -1, path: '/' });
		document.location.replace("/whm/login.html"); 
	},
	return_cur_index_fn:function(){ 
		employ.query_employ_fn();
	},
	post_error_fn:function(){
		alert("操作失败");
	}
}
$(document).ready(function(){
	employ.init_fn();
	employ.query_employ_fn(employ.curYear,employ.curMonth);
});