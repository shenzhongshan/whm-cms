
var wst={ 
	curYear:2010,	curMonth:1,	curSelYearMonth:201010, curWst:[],
	api_url:{  
		wts_save:"/whm/wts/save",// http://120.0.0.1:9400/whm/wts/report/201807,
		wts_del:"/whm/wts/del/",// http://120.0.0.1:9400/whm/wts/del/1,
		wts_export:"/whm/imp/excelReport/",// http://120.0.0.1:9400/whm/wts/del/1,
		wts_query:"/whm/wts/report/",// http://120.0.0.1:9400/whm/wts/report/201807,
	},
	template:{
		wst:function(){ return base.get_template("template/wstTemplate.js");},
		editWst:function(){return base.get_template("template/editWstAdminTemplate.js");}
	}, 
	init_fn:function(){
		base.init_sys();
		wst.init_header_fn(); 
		$("#index_header_logout_li").on({click:base.logout_fn,dblclick:base.logout_fn});
	},
	init_header_fn:function(){ 
		var loginUser = base.loginUser,userLi = $("#index_header_admin_li");
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
		if(wst.curWst.sumCount<1) return ts; 
		$.each(wst.curWst.report,function(i,t){
			$.each(t.worksheets,function(k,y){ 
				console.log(y.id);
				if(y.id == wstId) {ts = y;return false;}
			});
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
			var wstList = {};
			wstList.report = context;
			wstList.sumCount = (context&&context.length>0)?context.length:0;
			wst.curWst = wstList;
			var html = template(wstList);  
			container.html(html);
		}
		var url=wst.api_url.wts_query+wst.curSelYearMonth+","; 
		base.get_json_data(url,null,callback_fn,"GET");
		
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
			$.success('保存成功',wst.return_cur_index_fn);
		}
		base.post_json_data( wst.api_url.wts_save,wstData,callback_fn); 
	},
	del_wts_fn:function(id){
		var url = wst.api_url.wts_del+id;
		var del = function(){
			var callback_fn = function(data, textStatus, request){
				$.alert('删除成功',function(){wst.query_wts_fn(wst.curYear,wst.curMonth);}); 
			}
			base.post_json_data( url,null,callback_fn); 
		}
		$.confirm("是否删除该数据?",del);
	},
	export_report_fn:function(){ 
		wst.tmpExcel("wst-table-report-list");
	},
	tmpExcel:function(tableId){
		var tmpExcelFilter = function(value){
			var reg = /<[^>]*>/gi;
			return value ? value.replace(/评定/g,"") : "";
		}
		var excelData = $("#"+tableId).html(); 
		excelData = "<table border=1>"+tmpExcelFilter(excelData)+"</table>"
		var url='data:application/vnd.ms-excel,' + encodeURIComponent(excelData) ;
		location.href=url;
	}, 
	return_cur_index_fn:function(){ 
		wst.query_wts_fn(wst.curYear,wst.curMonth);
	} 
}
$(document).ready(function(){
	wst.init_fn();
	wst.query_wts_fn(wst.curYear,wst.curMonth);
});