var whm={ 
	curYear:2010,	curMonth:1,	curSelYearMonth:201010, 
	curWstList:[],
	api_url:{ 
		wts_submit:"/whm/wts/submit/",// http://120.0.0.1:9400/whm/wts/submit/month,staffId
		wts_save:"/whm/wts/save",// http://120.0.0.1:9400/whm/wts/report/201807,
		wts_del:"/whm/wts/del/",// http://120.0.0.1:9400/whm/wts/del/1,
		wts_query:"/whm/wts/listByCurrentUser/",// http://120.0.0.1:9400/whm/wts/report/201807,
		prj_query:"/whm/prj/list/"// http://120.0.0.1:9400/whm/prj/list/201807
	},
	template:{
		index:function(){ return base.get_template("template/indexTemplate.js");},
		editWst:function(){return base.get_template("template/editWstTemplate.js");}
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
		base.init_sys();
		whm.init_header_fn(); 
		$("#index_header_logout_li").on({click:base.logout_fn,dblclick:base.logout_fn}); 
	},
	init_year_fn:function(){
		var date=new Date,year=date.getFullYear(),month=date.getMonth()+1,navLis=$(".mainnav li"),
		curYearMonthLable=year+"-"+month,yearSelect=$("#index_header_year_select");
		yearSelect.empty();whm.curYear = year,whm.curMonth=month;
		for(var i=year-3;i<year+3;i++){
			yearSelect.append("<option "+(year==i?"selected":"")+" value='"+i+"'>"+i+"</option>");
		}
		yearSelect.on({change:whm.year_select_fn}); 
		navLis.removeClass("active");
		$(navLis[month]).addClass("active");
		navLis.on({click:whm.month_select_fn,dbclick:whm.month_select_fn});
	},
	init_header_fn:function(){ 
		var loginUser = $.cookie('login_user'),userLi = $("#index_header_admin_li");
		$("#index_header_login_user").html("<i class='icon-cog'></i> "+loginUser+" <b class=\"caret\"></b>");
		if(eval(base.isAdmin)){ 
			$(" <li class='li-preilve-a'><a href=\"index.html\"><i class=\"icon-signal\"></i>个人日志填报</a></li> ").insertAfter(userLi);
			$(" <li class='li-preilve-a'><a href=\"projectWorkSheet.html\"><i class=\"icon-user\"></i> 员工管理</a></li> ").insertAfter(userLi); 
			$(" <li class='li-preilve-a'><a href=\"main.html\"><i class=\"icon-group\"></i> 考勤考入</a></li> ").insertAfter(userLi); 
			$(" <li class='li-preilve-a'><a href=\"wa.html\"><i class=\"icon-table\"></i> 项目导入</a></li> ").insertAfter(userLi); 
			$(" <li class='li-preilve-a'><a href=\"employ.html\"><i class=\"icon-signal\"></i> 项目负荷排名</a></li> ").insertAfter(userLi); 
			 
		} 
		whm.init_year_fn();		
	}, 
	year_select_fn:function(){
		var yearSelect=$("#index_header_year_select"); 
		whm.query_wts_fn(yearSelect.val(),whm.curMonth);
	},
	month_select_fn:function(){
		var year = $("#index_header_year_select").val();
		var month = $(this).attr("m");
		if(!month) return;
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
			var status = false,adpter = {};
			if(context) { 
				adpter.worksheets = context;
				whm.curWstList = adpter.worksheets;
				$.each(adpter.worksheets,function(i,t){status = (t.status!=0 && t.status != null);});
				adpter.status = status; 
			}else {
				adpter = {status:status,month:whm.curSelYearMonth};
			} 
			var html = template(adpter);  
			container.html(html);
		}
		var url=whm.api_url.wts_query+whm.curSelYearMonth; 
		base.get_json_data(url,null,callback_fn,"GET");
		
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
		if(curSt) {if(!curSt.project) return;} else {return;} 
		$("#sel_prjId").val(curSt.prjId);
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
			$.success('保存成功',function(){whm.query_wts_fn(whm.curYear,whm.curMonth);});
		}
		base.post_json_data( whm.api_url.wts_save,wstData,callback_fn); 
	},
	del_wts_fn:function(id){
		var url = whm.api_url.wts_del+id;
		
		var del = function(){
			base.post_json_data( url,null,function(data, textStatus, request){
				$.alert('删除成功',function(){whm.query_wts_fn(whm.curYear,whm.curMonth);}); 
			}); 
		}
		$.confirm("是否删除该数据?",del);
		
	},
	submit_wts_fn:function(){ 
		var url = whm.api_url.wts_submit+whm.curSelYearMonth;
		var submit = function(){
			var callback_fn = function(data, textStatus, request){
				$.success('提交成功',function(){whm.query_wts_fn(whm.curYear,whm.curMonth);}); 
			}
			base.post_json_data( url,null,callback_fn); 
		}
		$.confirm("是否提交该月数据,提交后该月数据将不可修改?",submit);
	},
	query_prj_fn:function(ym){
		var url=whm.api_url.prj_query+ym,prj=[];
		var callback_fn = function(data, textStatus, request){
			var context = JSON.parse( request.responseText );
			$.each(context,function(i,t){if(t.status==1) prj.push(t);}); 
		}
		base.get_json_data(url,null,callback_fn,"POST",false);
		return prj;
	},
	return_cur_index_fn:function(){ 
		whm.query_wts_fn(whm.curYear,whm.curMonth);
	} 
}
 
$(document).ready(function(){
	whm.init_fn();
	whm.query_wts_fn(whm.curYear,whm.curMonth);
});