var employ={
	curEmploys:[],
	api_url:{  
		employ_save:"/whm/users/save",// http://120.0.0.1:9400/whm/wts/report/201807,
		employ_del:"/whm/users/del/",// http://120.0.0.1:9400/whm/wts/del/1,
		employ_import:"/whm/imp/staff",// http://120.0.0.1:9400/whm/wts/del/1,
		employ_query:"/whm/users/list/",// http://120.0.0.1:9400/whm/wts/list/1,9999
		employ_resetPwd:"/whm/users/resetPwd"
	},
	template:{
		employ:function(){ return base.get_template("template/employTemplate.js");},
		editEmploy:function(){return base.get_template("template/editEmployTemplate.js");}
	}, 
	init_fn:function(){
		base.init_sys();
		employ.init_header_fn(); 
		$("#index_header_logout_li").on({click:base.logout_fn,dblclick:base.logout_fn});
		var fileBtn = $("input[type=file]");
		fileBtn.on("change", function(){
		    var index = $(this).val().lastIndexOf("\\");
		    var sFileName = $(this).val().substr((index+1));
		    $("#rightText").html(sFileName);
		});
	},
	init_header_fn:function(){ 
		base.init_header_fn(); 
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
		var url=employ.api_url.employ_query+"0,9999"; 
		base.get_json_data(url,data,callback_fn,"POST");
		
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
			$.success('保存成功',function(){employ.query_employ_fn(employ.curYear,employ.curMonth);}); 
		}
		base.post_json_data( employ.api_url.employ_save,emData,callback_fn); 
	},
	del_employ_fn:function(id){
		var url = employ.api_url.employ_del+id;
		var del = function(){
			var callback_fn = function(data, textStatus, request){
				$.alert('删除成功',function(){employ.query_employ_fn(employ.curYear,employ.curMonth);}); 
			}
			base.post_json_data( url,null,callback_fn); 
		}
		$.confirm("是否删除该数据?",del);
	},
	reset_password_fn:function(username){
		var url = employ.api_url.employ_resetPwd;
		var reset = function(){
			var callback_fn = function(data, textStatus, request){
				$.success('重置成功'); 
			}
			var emData = {};
			emData.username=username;
			emData = JSON.stringify( emData );
			base.post_json_data( url,emData,callback_fn); 
		}
		$.confirm("是否重置该员工的密码?",reset);
	},
	import_empoly_fn:function(){ 
		$.ajax({
		    url: employ.api_url.employ_import,
		    type: 'POST',
		    cache: false,
		    beforeSend: function(xhr) { 
	        	 xhr.setRequestHeader("Authorization", base.authorization); 
	        	 xhr.setRequestHeader("Token", base.token); 
	         },
		    data: new FormData($('#uploadForm')[0]),
		    processData: false,
		    contentType: false
		}).done(function(res) { 
			$("#employ_import_btn_close").click();
			$.success('导入成功！',function(){employ.query_employ_fn(employ.curYear,employ.curMonth);});
		}).fail(function(res) {
			$("#employ_import_btn_close").click();
			$.error('导入失败！')
		}); 
	}, 
	return_cur_index_fn:function(){ 
		employ.query_employ_fn();
	}
}
$(document).ready(function(){
	employ.init_fn();
	employ.query_employ_fn(employ.curYear,employ.curMonth);
});