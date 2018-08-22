var wa={ 
	curYear:2010,	curMonth:1,	curSelYearMonth:201010,curwa:[],
	api_url:{  
		wa_save:"/whm/wa/save",// http://120.0.0.1:9400/whm/wts/report/201807,
		wa_del:"/whm/wa/del/",// http://120.0.0.1:9400/whm/wts/del/1,
		wa_import:"/whm/imp/wa",
		wa_query:"/whm/wa/list/",// http://120.0.0.1:9400/whm/wts/list/1,9999
	},
	template:{
		wa:function(){ return base.get_template("template/waTemplate.js");},
		editWa:function(){return base.get_template("template/editWaTemplate.js");}
	}, 
	init_fn:function(){
		base.init_sys();
		wa.init_header_fn(); 
		$("#index_header_logout_li").on({click:base.logout_fn,dblclick:base.logout_fn});
		var fileBtn = $("input[type=file]");
		fileBtn.on("change", function(){
		    var index = $(this).val().lastIndexOf("\\");
		    var sFileName = $(this).val().substr((index+1));
		    $("#rightText").html(sFileName);
		});
	},
	init_header_fn:function(){ 
		var loginUser = base.loginUser,userLi = $("#index_header_admin_li");
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
		yearSelect.on({change:wa.year_select_fn}); 
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
	year_select_fn:function(){
		var yearSelect=$("#index_header_year_select"); 
		wa.query_wa_fn(yearSelect.val(),wa.curMonth);
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
		base.get_json_data(url,data,callback_fn,"POST");
		
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
			$.success('保存成功',function(){wa.query_wa_fn(wa.curYear,wa.curMonth);}); 
		}
		base.post_json_data( wa.api_url.wa_save,waData,callback_fn); 
	},
	del_wa_fn:function(id){
		var url = wa.api_url.wa_del+id;
		var del = function(){
			var callback_fn = function(data, textStatus, request){
				alert('删除成功');
				wa.query_wa_fn(wa.curYear,wa.curMonth);
			}
			base.post_json_data( url,null,callback_fn); 
		}
		$.confirm("是否删除该数据?",del);
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
			$("#wa_import_btn_close").click();
			$.success('导入成功！',function(){wa.query_wa_fn(wa.curYear,wa.curMonth);});
		}).fail(function(res) {
			$("#wa_import_btn_close").click();
			$.error('导入失败！')
		}); 
	}, 
	return_cur_index_fn:function(){ 
		wa.query_wa_fn(wa.curYear,wa.curMonth);
	} 
}
$(document).ready(function(){
	wa.init_fn();
	wa.query_wa_fn(wa.curYear,wa.curMonth);
});