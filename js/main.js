var main={ 
	curYear:2010,	curMonth:1,	curSelYearMonth:201010, curPrj:[],
	api_url:{  
		prj_query:"/whm/prj/list/",// http://120.0.0.1:9400/whm/prj/list/201807
		prj_save:"/whm/prj/save",
		prj_del:"/whm/prj/del/",// http://120.0.0.1:9400/whm/prj/del/201807
		prj_import:"/whm/imp/prj",
		prj_confirm:"/whm/prj/confirm/"// http://120.0.0.1:9400/whm/prj/confirm/201807
	},
	template:{
		projects:function(){ return base.get_template("template/projectTemplate.js");},
		editProject:function(){return base.get_template("template/editProjectTemplate.js");}
	}, 
	init_fn:function(){
		base.init_sys();
		main.init_header_fn(); 
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
		main.init_year_fn();		
	},
	init_year_fn:function(){
		var date=new Date,year=date.getFullYear(),month=date.getMonth()+1,navLis=$(".mainnav li"),
		curYearMonthLable=year+"-"+month,yearSelect=$("#index_header_year_select");
		yearSelect.empty();main.curYear = year,main.curMonth=month;
		for(var i=year-3;i<year+3;i++){
			yearSelect.append("<option "+(year==i?"selected":"")+" value='"+i+"'>"+i+"</option>");
		}
		yearSelect.on({change:main.year_select_fn}); 
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
	year_select_fn:function(){
		var yearSelect=$("#index_header_year_select"); 
		main.query_project_fn(yearSelect.val(),main.curMonth);
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
		base.get_json_data(url,null,callback_fn,"GET");
	},
	edit_project_fn:function(prjId){
		var container = $("#index_main_container_div");  
		var template = main.template.editProject();
		var adpter={};
		adpter.month = main.curSelYearMonth;
		adpter.prj = main.get_local_project_by_id(prjId); 
		var html = template(adpter);  
		container.html(html);
		if(!adpter.prj) return;
		$("#sel_standard").val(adpter.prj.standard);
		$("#sel_type").val(adpter.prj.type);
	},
	save_project_fn:function(){
		var prjData = $("#edit-project-form").serializeObject(); 
		prjData = JSON.stringify( prjData );  
		var callback_fn = function(data, textStatus, request){ 
			$.success('保存成功',function(){main.query_project_fn(main.curYear,main.curMonth);}); 
		} 
		base.post_json_data( main.api_url.prj_save,prjData,callback_fn); 
		
	},
	del_prj_fn:function(id){
		var url = main.api_url.prj_del+id;
		var del = function(){ 
			var callback_fn = function(data, textStatus, request){
				$.alert('删除成功',function(){main.query_project_fn(main.curYear,main.curMonth);}); 
			}
			base.post_json_data( url,null,callback_fn); 
		}
		$.confirm("是否删除该数据?",del);
	},
	confirm_prj_fn:function(month){
		var url = main.api_url.prj_confirm+month;
		var confirm = function(){
			var callback_fn = function(data, textStatus, request){
				$.success('确认成功',function(){main.query_project_fn(main.curYear,main.curMonth);}); 
			}
			base.post_json_data( url,null,callback_fn); 
		}
		$.confirm("是否确认该月项目数据?确认后将不可修改.",confirm);
		
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
	        	 xhr.setRequestHeader("Authorization", base.authorization); 
	        	 xhr.setRequestHeader("Token", base.token); 
	         },
		    data: prjForm,
		    processData: false,
		    contentType: false
		}).done(function(res) {
			$("#main_import_btn_close").click();
			$.success('导入成功！',function(){main.query_project_fn(main.curYear,main.curMonth);});
			
		}).fail(function(res) { 
			$("#main_import_btn_close").click();
			$.error('导入失败！',function(){main.query_project_fn(main.curYear,main.curMonth);})
		}); 
	}, 
	return_cur_index_fn:function(){ 
		main.query_project_fn(main.curYear,main.curMonth);
	} 
}
$(document).ready(function(){
	main.init_fn();
	main.query_project_fn(main.curYear,main.curMonth);
});