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
var main={
	token_flag:'Bearer ',
	contentType:'application/json;charset=utf-8',
	curYear:2010,	curMonth:1,	curSelYearMonth:201010,
	authorization:'',token:'',loginUser:'',curPrj:[],
	api_url:{  
		prj_query:"/whm/prj/list/",// http://120.0.0.1:9400/whm/prj/list/201807
		prj_save:"/whm/prj/save",
		prj_del:"/whm/prj/del/",// http://120.0.0.1:9400/whm/prj/del/201807
		prj_import:"/whm/imp/prj",
		prj_confirm:"/whm/prj/confirm/"// http://120.0.0.1:9400/whm/prj/confirm/201807
	},
	template:{
		projects:function(){ return main.get_template("template/projectTemplate.fl");},
		editProject:function(){return main.get_template("template/editProjectTemplate.fl");}
	},
	get_template:function(path){
		var template = $.ajax({url:path,async:false});  
		return Handlebars.compile(template.responseText);
	}, 
	get_json_data:function(url,param,callback_fn,method){
		$.ajax({
	         url: url,
	         data: param?param:[],  
	         dataType: 'JSON',
	         async:false,
	         beforeSend: function(xhr) { 
	        	 xhr.setRequestHeader("Authorization", main.authorization); 
	        	 xhr.setRequestHeader("Token", main.token); 
	         },
	         contentType: main.contentType,
	         type: method?method:'POST',
	         success: callback_fn,
	         error: main.post_error_fn
	     });
	},
	post_json_data:function(url,param,callback_fn){
		$.ajax({
	         url: url,
	         data: param,  
	         dataType: 'JSON',
	         async:false,
	         beforeSend: function(xhr) { 
	        	 xhr.setRequestHeader("Authorization", main.authorization); 
	        	 xhr.setRequestHeader("Token", main.token); 
	         },
	         contentType: main.contentType,
	         type:'POST',
	         success: callback_fn,
	         error: main.post_error_fn
	     });
	},
	init_fn:function(){
		if(!$.cookie('login_user')){
			alert('未登陆，请登陆后访问该功能');
			main.logout_fn();
		}
		main.loginUser=$.cookie('login_user');
		main.authorization=$.cookie('authorization');
		main.token=$.cookie('token');
		main.init_header_fn(); 
		$("#index_header_logout_li").on({click:main.logout_fn,dblclick:main.logout_fn});
	},
	init_header_fn:function(){ 
		var loginUser = $.cookie('login_user'),userLi = $("#index_header_admin_li");
		$("#index_header_login_user").html("<i class='icon-cog'></i> "+loginUser); 
		main.init_year_fn();		
	},
	init_year_fn:function(){
		var date=new Date,year=date.getFullYear(),month=date.getMonth()+1,navLis=$(".mainnav li"),
		curYearMonthLable=year+"-"+month,yearSelect=$("#index_header_year_select");
		yearSelect.empty();main.curYear = year,main.curMonth=month;
		for(var i=year-3;i<year+3;i++){
			yearSelect.append("<option "+(year==i?"selected":"")+" value='"+i+"'>"+i+"</option>");
		}
		navLis.removeClass("active");
		$(navLis[month]).addClass("active");
		navLis.on({click:main.month_select_fn,dbclick:main.month_select_fn});
	},
	get_local_project_by_id:function(id){
		var ts = null;
		if(!main.curPrj) return ts;
		if(main.curPrj.length<1) return ts;
		
		$.each(main.curPrj,function(i,t){
			if(t.id == id) {ts = t;return false;}
		});
		return ts;
	},
	month_select_fn:function(){
		var year = $("#index_header_year_select").val();
		var month = $(this).attr("m");
		if(!month) return;
		$(".mainnav li").removeClass("active");
		$(this).addClass("active"); 
		main.query_project_fn(year,month);
	},
	query_project_fn:function(year,month){
		if(month==0) return; 
		month = parseInt(month)<10?("0"+parseInt(month)):(""+parseInt(month));
		main.curSelYearMonth =  year+month;
		main.curYear = year;main.curMonth=month;
		var container = $("#index_main_container_div");  
		var template = main.template.projects();
		var callback_fn = function(data, textStatus, request){
			var context = JSON.parse( request.responseText ); 
			var status = false,adpter = {};
			adpter.projects = context;
			adpter.month = main.curSelYearMonth;
			main.curPrj = adpter.projects;
			$.each(adpter.projects,function(i,t){status = (t.status==0);});
			adpter.status = status;
			var html = template(adpter);  
			container.html(html);
		}
		var url=main.api_url.prj_query+main.curSelYearMonth; 
		main.get_json_data(url,null,callback_fn,"GET");
	},
	edit_project_fn:function(prjId){
		var container = $("#index_main_container_div");  
		var template = main.template.editProject();
		var adpter={};
		adpter.month = main.curSelYearMonth;
		adpter.prj = main.get_local_project_by_id(prjId); 
		var html = template(adpter);  
		container.html(html);
		
	},
	save_project_fn:function(){
		var prjData = $("#edit-project-form").serializeObject(); 
		prjData = JSON.stringify( prjData ); 
		var callback_fn = function(data, textStatus, request){
			alert('保存成功');
			main.return_cur_index_fn();
		}
		main.post_json_data( main.api_url.prj_save,prjData,callback_fn); 
		
	},
	del_prj_fn:function(id){
		var url = main.api_url.prj_del+id;
		var callback_fn = function(data, textStatus, request){
			alert('删除成功');
			main.query_project_fn(main.curYear,main.curMonth);
		}
		main.post_json_data( url,null,callback_fn); 
	},
	confirm_prj_fn:function(month){
		var url = main.api_url.prj_confirm+month;
		var callback_fn = function(data, textStatus, request){
			alert('确认成功');
			main.query_project_fn(main.curYear,main.curMonth);
		}
		main.post_json_data( url,null,callback_fn); 
	},
	import_prj_fn:function(){ 
		var prjForm = new FormData();
		prjForm.append("file",$('#import-employ_file')[0].files[0]);
		prjForm.append("month",main.curSelYearMonth);
		$.ajax({
		    url: main.api_url.prj_import,
		    type: 'POST',
		    cache: false,
		    beforeSend: function(xhr) { 
	        	 xhr.setRequestHeader("Authorization", main.authorization); 
	        	 xhr.setRequestHeader("Token", main.token); 
	         },
		    data: prjForm,
		    processData: false,
		    contentType: false
		}).done(function(res) {
			alert('导入成功！');
			$("#main_import_btn_close").click();
		}).fail(function(res) {
			$("#main_import_btn_close").click();
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
		main.query_project_fn(main.curYear,main.curMonth);
	},
	post_error_fn:function(){
		alert("操作失败");
	}
}
$(document).ready(function(){
	main.init_fn();
	main.query_project_fn(main.curYear,main.curMonth);
});