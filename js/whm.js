var whm={
	token_flag:'Bearer ',
	contentType:'application/json;charset=utf-8',
	curYear:2010,	curMonth:1,	curSelYearMonth:201010,
	authorization:'',token:'',loginUser:'',
	api_url:{ 
		wts_query:"/whm/wts/report/"// http://120.0.0.1:9400/whm/wts/report/201807,
	},
	template:{
		index:function(){ return whm.get_template("js/indexTemplate.js");},
		editWst:function(){return whm.get_template("js/editWstTemplate.js");}
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
		month = month<10?"0"+month:""+month;
		whm.curSelYearMonth =  year+month;
		whm.curYear = year;whm.curMonth=month;
		var container = $("#index_main_container_div");  
		var template = whm.template.index();
		var context = { title: "zhaoshuai", prj: [{prjId:201232,prjPhase:'fef',project:{name:'testprj',standard:5,scale:'sdf',type:'大型'},prjPosition:'研究员',startDate:'2018-01-01',endDate:'2018-08-09',updateTime:'2018-98-04 23:59:23'}]};
		var callback_fn = function(data, textStatus, request){
			var context = JSON.parse( request.responseText );  
			var html = template(context[0]?context[0]:{month:whm.curSelYearMonth});  
			container.html(html);
		}
		var url=whm.api_url.wts_query+whm.curSelYearMonth+","; 
		whm.get_json_data(url,null,callback_fn,"GET");
		
	},
	edit_Wst_fn:function(){
		var container = $("#index_main_container_div");  
		var template = whm.template.editWst();
		var html = template({month:whm.curSelYearMonth});  
		container.html(html);
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