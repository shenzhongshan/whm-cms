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
var whm={
	token_flag:'Bearer ',
	contentType:'application/json;charset=utf-8',
	curYear:2010,	curMonth:1,	curSelYearMonth:201010,
	authorization:'',token:'',loginUser:'',loginStaffId:804019,
	curWstList:[],
	api_url:{ 
		wts_submit:"/whm/wts/submit/",// http://120.0.0.1:9400/whm/wts/submit/month,staffId
		wts_save:"/whm/wts/save",// http://120.0.0.1:9400/whm/wts/report/201807,
		wts_del:"/whm/wts/del/",// http://120.0.0.1:9400/whm/wts/del/1,
		wts_query:"/whm/wts/report/",// http://120.0.0.1:9400/whm/wts/report/201807,
		prj_query:"/whm/prj/list/"// http://120.0.0.1:9400/whm/prj/list/201807
	},
	template:{
		index:function(){ return whm.get_template("template/indexTemplate.js");},
		editWst:function(){return whm.get_template("template/editWstTemplate.js");}
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
	        	 xhr.setRequestHeader("Authorization", whm.authorization); 
	        	 xhr.setRequestHeader("Token", whm.token); 
	         },
	         contentType: whm.contentType,
	         type: method?method:'POST',
	         success: callback_fn,
	         error: whm.post_error_fn
	     });
	},
	post_json_data:function(url,param,callback_fn){
		$.ajax({
	         url: url,
	         data: param,  
	         dataType: 'JSON',
	         async:false,
	         beforeSend: function(xhr) { 
	        	 xhr.setRequestHeader("Authorization", whm.authorization); 
	        	 xhr.setRequestHeader("Token", whm.token); 
	         },
	         contentType: whm.contentType,
	         type:'POST',
	         success: callback_fn,
	         error: whm.post_error_fn
	     });
	},
	get_local_wst_by_id:function(wstId){
		var ts = null;
		if(!whm.curWstList) return ts;
		if(whm.curWstList.length<1) return ts;
		
		$.each(whm.curWstList,function(i,t){
			if(t.id == wstId) {ts = t;return false;}
		});
		return ts;
	},
	init_fn:function(){
		if(!$.cookie('login_user')){
			alert('未登陆，请登陆后访问该功能');
			whm.logout_fn();
		}
		whm.loginUser=$.cookie('login_user');
		whm.authorization=$.cookie('authorization');
		whm.token=$.cookie('token');
		whm.init_header_fn(); 
		$("#index_header_logout_li").on({click:whm.logout_fn,dblclick:whm.logout_fn});
	},
	init_year_fn:function(){
		var date=new Date,year=date.getFullYear(),month=date.getMonth()+1,navLis=$(".mainnav li"),
		curYearMonthLable=year+"-"+month,yearSelect=$("#index_header_year_select");
		yearSelect.empty();whm.curYear = year,whm.curMonth=month;
		for(var i=year-3;i<year+3;i++){
			yearSelect.append("<option "+(year==i?"selected":"")+" value='"+i+"'>"+i+"</option>");
		}
		navLis.removeClass("active");
		$(navLis[month]).addClass("active");
		navLis.on({click:whm.month_select_fn,dbclick:whm.month_select_fn});
	},
	init_header_fn:function(){ 
		var loginUser = $.cookie('login_user'),userLi = $("#index_header_admin_li");
		$("#index_header_login_user").html("<i class='icon-cog'></i> "+loginUser);
		if(loginUser=="admin"){
			userLi.html("<a href=\"main.html\"><i class=\"icon-star\"></i> 管理员</a>"); 
		}
		whm.init_year_fn();		
	},
	logout_fn:function(){ 
		$.cookie('authorization', null, { expires: -1, path: '/' });
		$.cookie('token', null, { expires: -1, path: '/' }); 
		$.cookie('login_user', null, { expires: -1, path: '/' });
		document.location.replace("/whm/login.html"); 
	},
	month_select_fn:function(){
		var year = $("#index_header_year_select").val();
		var month = $(this).attr("m");
		$(".mainnav li").removeClass("active");
		$(this).addClass("active"); 
		whm.query_wts_fn(year,month);
	},
	query_wts_fn:function(year,month){
		if(month==0) return; 
		month = parseInt(month)<10?("0"+parseInt(month)):(""+parseInt(month));
		whm.curSelYearMonth =  year+month;
		whm.curYear = year;whm.curMonth=month;
		var container = $("#index_main_container_div");  
		var template = whm.template.index();
		var context = { title: "zhaoshuai", prj: [{prjId:201232,prjPhase:'fef',project:{name:'testprj',standard:5,scale:'sdf',type:'大型'},prjPosition:'研究员',startDate:'2018-01-01',endDate:'2018-08-09',updateTime:'2018-98-04 23:59:23'}]};
		var callback_fn = function(data, textStatus, request){
			var context = JSON.parse( request.responseText );  
			var status = false,adpter = "";
			if(context[0]) { 
				adpter = context[0];
				whm.curWstList = adpter.worksheets;
				$.each(adpter.worksheets,function(i,t){status = (t.status==0);});
				adpter.status = status;
				debugger;
			}else {
				adpter = {status:status,month:whm.curSelYearMonth};
			} 
			var html = template(adpter);  
			container.html(html);
		}
		var url=whm.api_url.wts_query+whm.curSelYearMonth+","; 
		whm.get_json_data(url,null,callback_fn,"GET");
		
	},
	edit_Wst_fn:function(lable,wstId){ 
		var container = $("#index_main_container_div");  
		var template = whm.template.editWst();
		var date = new Date(), y = whm.curYear, m = whm.curMonth,lastDay = new Date(y, m, 0);
		var status=false,days=[],ym = y +"-"+ whm.curMonth;
		for(var i=1;i<=lastDay.getDate();i++){
			var value= ym +'-'+(i<10?("0"+i):(""+i));
			days.push({date:value,day:i});
		}
		var prj = whm.query_prj_fn(whm.curSelYearMonth); 
		var curSt =  whm.get_local_wst_by_id(wstId);
		var html = template({project:prj,days:days,month:whm.curSelYearMonth,saveBtn:lable,ts:curSt});  
		container.html(html);
		var toDate = function(date){ date =(date+"").split("T")[0];  return date; }
		if(!curSt.project) return;
		$("#sel_prjId").val(curSt.project.id);
		$("#sel_prjPhase").val(curSt.prjPhase);
		$("#sel_prjPosition").val(curSt.prjPosition);
		$("#sel_startDate").val(toDate(curSt.startDate));
		$("#sel_endDate").val(toDate(curSt.endDate));
	}, 
	save_wts_fn:function(){ 
		var wstData = $("#edit-wst-form").serializeObject();
		wstData.project={};wstData.project.id=wstData.prjId;
		wstData = JSON.stringify( wstData );
		var callback_fn = function(data, textStatus, request){
			alert('保存成功');
		}
		whm.post_json_data( whm.api_url.wts_save,wstData,callback_fn); 
	},
	del_wts_fn:function(id){
		var url = whm.api_url.wts_del+id;
		var callback_fn = function(data, textStatus, request){
			alert('删除成功');
			whm.query_wts_fn(whm.curYear,whm.curMonth);
		}
		whm.post_json_data( url,null,callback_fn); 
	},
	submit_wts_fn:function(){ 
		var url = whm.api_url.wts_submit+whm.curSelYearMonth;
		var callback_fn = function(data, textStatus, request){
			alert('提交成功');
			whm.query_wts_fn(whm.curYear,whm.curMonth);
		}
		whm.post_json_data( url,null,callback_fn); 
	},
	query_prj_fn:function(ym){
		var url=whm.api_url.prj_query+ym,prj;
		var callback_fn = function(data, textStatus, request){
			var context = JSON.parse( request.responseText ); 
			prj = context; 
		}
		whm.get_json_data(url,null,callback_fn,"POST");
		return prj;
	},
	return_cur_index_fn:function(){ 
		whm.query_wts_fn(whm.curYear,whm.curMonth);
	},
	post_error_fn:function(){
		alert("操作失败");
	}
}
 
$(document).ready(function(){
	whm.init_fn();
	whm.query_wts_fn(whm.curYear,whm.curMonth);
});