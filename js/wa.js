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
var wa={
	token_flag:'Bearer ',
	contentType:'application/json;charset=utf-8',
	curYear:2010,	curMonth:1,	curSelYearMonth:201010,
	authorization:'',token:'',loginUser:'',curwa:[],
	api_url:{  
		wa_save:"/whm/wa/save",// http://120.0.0.1:9400/whm/wts/report/201807,
		wa_del:"/whm/wa/del/",// http://120.0.0.1:9400/whm/wts/del/1,
		wa_import:"/whm/imp/wa",
		wa_query:"/whm/wa/list/",// http://120.0.0.1:9400/whm/wts/list/1,9999
	},
	template:{
		wa:function(){ return wa.get_template("js/waTemplate.js");},
		editWa:function(){return wa.get_template("js/editWaTemplate.js");}
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
	        	 xhr.setRequestHeader("Authorization", wa.authorization); 
	        	 xhr.setRequestHeader("Token", wa.token); 
	         },
	         contentType: wa.contentType,
	         type: method?method:'POST',
	         success: callback_fn,
	         error: wa.post_error_fn
	     });
	},
	post_json_data:function(url,param,callback_fn){
		$.ajax({
	         url: url,
	         data: param,  
	         dataType: 'JSON',
	         async:false,
	         beforeSend: function(xhr) { 
	        	 xhr.setRequestHeader("Authorization", wa.authorization); 
	        	 xhr.setRequestHeader("Token", wa.token); 
	         },
	         contentType: wa.contentType,
	         type:'POST',
	         success: callback_fn,
	         error: wa.post_error_fn
	     });
	},
	init_fn:function(){
		if(!$.cookie('login_user')){
			alert('未登陆，请登陆后访问该功能');
			wa.logout_fn();
		}
		wa.loginUser=$.cookie('login_user');
		wa.authorization=$.cookie('authorization');
		wa.token=$.cookie('token');
		wa.init_header_fn(); 
		$("#index_header_logout_li").on({click:wa.logout_fn,dblclick:wa.logout_fn});
	},
	init_header_fn:function(){ 
		var loginUser = $.cookie('login_user'),userLi = $("#index_header_admin_li");
		$("#index_header_login_user").html("<i class='icon-cog'></i> "+loginUser); 
		wa.init_year_fn();		
	},
	init_year_fn:function(){
		var date=new Date,year=date.getFullYear(),month=date.getMonth()+1,navLis=$(".mainnav li"),
		curYearMonthLable=year+"-"+month,yearSelect=$("#index_header_year_select");
		yearSelect.empty();wa.curYear = year,wa.curMonth=month;
		for(var i=year-3;i<year+3;i++){
			yearSelect.append("<option "+(year==i?"selected":"")+" value='"+i+"'>"+i+"</option>");
		}
		navLis.removeClass("active");
		$(navLis[month]).addClass("active");
		navLis.on({click:wa.month_select_fn,dbclick:wa.month_select_fn});
	},
	get_local_wa_by_id:function(wstId){
		var ts = null;
		if(!wa.curwa) return ts;
		if(wa.curwa.length<1) return ts;
		
		$.each(wa.curwa,function(i,t){
			if(t.id == wstId) {ts = t;return false;}
		});
		return ts;
	},
	month_select_fn:function(){
		var year = $("#index_header_year_select").val();
		var month = $(this).attr("m");
		if(!month) return;
		$(".mainnav li").removeClass("active");
		$(this).addClass("active"); 
		wa.query_wa_fn(year,month);
	},
	query_wa_fn:function(year,month){
		if(month==0) return; 
		month = parseInt(month)<10?("0"+parseInt(month)):(""+parseInt(month));
		wa.curSelYearMonth =  year+month;
		wa.curYear = year;wa.curMonth=month;
		var container = $("#index_main_container_div");  
		var template = wa.template.wa();
		var context = {};
		var callback_fn = function(data, textStatus, request){
			var context = JSON.parse( request.responseText );  
			wa.curwa = context;
			var adpter ={month:wa.curSelYearMonth,was:context}
			var html = template(adpter);  
			container.html(html);
		}
		var data = {month:wa.curSelYearMonth};
		data = JSON.stringify( data );
		var url=wa.api_url.wa_query+"1,9999"; 
		wa.get_json_data(url,data,callback_fn,"POST");
		
	},
	edit_wa_fn:function(waId){ 
		var container = $("#index_main_container_div");  
		var template = wa.template.editWa();  
		var curSt =  wa.get_local_wa_by_id(waId); 
		var html = template(curSt);  
		container.html(html);
		 
	}, 
	save_wa_fn:function(){ 
		var waData = $("#edit-wa-form").serializeObject();
		waData.project={};waData.project.id=waData.prjId;
		waData = JSON.stringify( waData );
		var callback_fn = function(data, textStatus, request){
			alert('保存成功');
		}
		wa.post_json_data( wa.api_url.wa_save,waData,callback_fn); 
	},
	del_wa_fn:function(id){
		var url = wa.api_url.wa_del+id;
		var callback_fn = function(data, textStatus, request){
			alert('删除成功');
			wa.query_wa_fn(wa.curYear,wa.curMonth);
		}
		wa.post_json_data( url,null,callback_fn); 
	},
	import_wa_fn:function(){ 
		var waForm = new FormData();
		waForm.append("file",$('#import-employ_file')[0].files[0]);
		waForm.append("month",wa.curSelYearMonth);
		$.ajax({
		    url: wa.api_url.wa_import,
		    type: 'POST',
		    cache: false,
		    beforeSend: function(xhr) { 
	        	 xhr.setRequestHeader("Authorization", wa.authorization); 
	        	 xhr.setRequestHeader("Token", wa.token); 
	         },
		    data: waForm,
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
		wa.query_wa_fn(wa.curYear,wa.curMonth);
	},
	post_error_fn:function(){
		alert("操作失败");
	}
}
$(document).ready(function(){
	wa.init_fn();
	wa.query_wa_fn(wa.curYear,wa.curMonth);
});