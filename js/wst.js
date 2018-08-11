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
var wst={
	token_flag:'Bearer ',
	contentType:'application/json;charset=utf-8',
	curYear:2010,	curMonth:1,	curSelYearMonth:201010,
	authorization:'',token:'',loginUser:'',curWst:[],
	api_url:{  
		wts_save:"/whm/wts/save",// http://120.0.0.1:9400/whm/wts/report/201807,
		wts_del:"/whm/wts/del/",// http://120.0.0.1:9400/whm/wts/del/1,
		wts_query:"/whm/wts/report/",// http://120.0.0.1:9400/whm/wts/report/201807,
	},
	template:{
		wst:function(){ return wst.get_template("template/wstTemplate.fl");},
		editWst:function(){return wst.get_template("template/editWstAdminTemplate.fl");}
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
	        	 xhr.setRequestHeader("Authorization", wst.authorization); 
	        	 xhr.setRequestHeader("Token", wst.token); 
	         },
	         contentType: wst.contentType,
	         type: method?method:'POST',
	         success: callback_fn,
	         error: wst.post_error_fn
	     });
	},
	post_json_data:function(url,param,callback_fn){
		$.ajax({
	         url: url,
	         data: param,  
	         dataType: 'JSON',
	         async:false,
	         beforeSend: function(xhr) { 
	        	 xhr.setRequestHeader("Authorization", wst.authorization); 
	        	 xhr.setRequestHeader("Token", wst.token); 
	         },
	         contentType: wst.contentType,
	         type:'POST',
	         success: callback_fn,
	         error: wst.post_error_fn
	     });
	},
	init_fn:function(){
		if(!$.cookie('login_user')){
			alert('未登陆，请登陆后访问该功能');
			wst.logout_fn();
		}
		wst.loginUser=$.cookie('login_user');
		wst.authorization=$.cookie('authorization');
		wst.token=$.cookie('token');
		wst.init_header_fn(); 
		$("#index_header_logout_li").on({click:wst.logout_fn,dblclick:wst.logout_fn});
	},
	init_header_fn:function(){ 
		var loginUser = $.cookie('login_user'),userLi = $("#index_header_admin_li");
		$("#index_header_login_user").html("<i class='icon-cog'></i> "+loginUser); 
		wst.init_year_fn();		
	},
	init_year_fn:function(){
		var date=new Date,year=date.getFullYear(),month=date.getMonth()+1,navLis=$(".mainnav li"),
		curYearMonthLable=year+"-"+month,yearSelect=$("#index_header_year_select");
		yearSelect.empty();wst.curYear = year,wst.curMonth=month;
		for(var i=year-3;i<year+3;i++){
			yearSelect.append("<option "+(year==i?"selected":"")+" value='"+i+"'>"+i+"</option>");
		}
		navLis.removeClass("active");
		$(navLis[month]).addClass("active");
		navLis.on({click:wst.month_select_fn,dbclick:wst.month_select_fn});
	},
	get_local_wst_by_id:function(wstId){
		var ts = null;
		if(!wst.curWst) return ts;
		if(wst.curWst.length<1) return ts;
		
		$.each(wst.curWst,function(i,t){
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
		wst.query_wts_fn(year,month);
	},
	query_wts_fn:function(year,month){
		if(month==0) return; 
		month = parseInt(month)<10?("0"+parseInt(month)):(""+parseInt(month));
		wst.curSelYearMonth =  year+month;
		wst.curYear = year;wst.curMonth=month;
		var container = $("#index_main_container_div");  
		var template = wst.template.wst();
		var context = { title: "zhaoshuai", prj: [{prjId:201232,prjPhase:'fef',project:{name:'testprj',standard:5,scale:'sdf',type:'大型'},prjPosition:'研究员',startDate:'2018-01-01',endDate:'2018-08-09',updateTime:'2018-98-04 23:59:23'}]};
		var callback_fn = function(data, textStatus, request){
			var context = JSON.parse( request.responseText );  
			wst.curWst = context[0]?(context[0].worksheets):wst.curWst;
			var html = template(context[0]);  
			container.html(html);
		}
		var url=wst.api_url.wts_query+wst.curSelYearMonth+","; 
		wst.get_json_data(url,null,callback_fn,"GET");
		
	},
	approve_Wst_fn:function(wstId){ 
		var container = $("#index_main_container_div");  
		var template = wst.template.editWst();  
		var curSt =  wst.get_local_wst_by_id(wstId);
		curSt.projectName = curSt.project?curSt.project.name:"";
		var html = template(curSt);  
		container.html(html);
		 
	}, 
	save_wts_fn:function(){ 
		var wstData = $("#edit-wst-form").serializeObject();
		wstData.project={};wstData.project.id=wstData.prjId;
		wstData = JSON.stringify( wstData );
		var callback_fn = function(data, textStatus, request){
			alert('保存成功');
		}
		wst.post_json_data( wst.api_url.wts_save,wstData,callback_fn); 
	},
	del_wts_fn:function(id){
		var url = wst.api_url.wts_del+id;
		var callback_fn = function(data, textStatus, request){
			alert('删除成功');
			wst.query_wts_fn(wst.curYear,wst.curMonth);
		}
		wst.post_json_data( url,null,callback_fn); 
	},
	logout_fn:function(){ 
		$.cookie('authorization', null, { expires: -1, path: '/' });
		$.cookie('token', null, { expires: -1, path: '/' }); 
		$.cookie('login_user', null, { expires: -1, path: '/' });
		document.location.replace("/whm/login.html"); 
	},
	return_cur_index_fn:function(){ 
		wst.query_wts_fn(wst.curYear,wst.curMonth);
	},
	post_error_fn:function(){
		alert("操作失败");
	}
}
$(document).ready(function(){
	wst.init_fn();
	wst.query_wts_fn(wst.curYear,wst.curMonth);
});