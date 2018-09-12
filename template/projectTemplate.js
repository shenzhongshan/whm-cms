 <div class="widget-header"> <i class="icon-list-ol"></i>
     <h3 >项目导入</h3> {{#if status }}
     <button class="btn btn-info" style="float:right;margin-top:6px;margin-right:5%;" data-toggle="modal" data-target="#importModal">导入</button>
     <button type="button" style="float:right;margin-top:6px;margin-right:5px;" onclick="main.edit_project_fn({{id}});" class="btn btn-info">新增</button>  
     <button type="button" style="float:right;margin-top:6px;margin-right:5px;" class="btn btn-success" onclick="main.confirm_prj_fn('{{month}}');">确认</button>{{/if}}
 </div>
 <table class="table table-condensed table-hover ">
  <thead>
	<tr class="success">
	  <th scope="col" width="70px"> {{month}} </th>
	  <th scope="col">项目编号</th>
	  <th scope="col">项目名称</th>
	  <th scope="col">项目标准</th>
	  <th scope="col">项目类型</th> 
	  <th scope="col">正线长度L(km)</th> 
	  <th scope="col">总投资Co(亿元)</th> 
	  <th scope="col">地形等级Te</th> 
	  <th scope="col"></th> 
	</tr>
  </thead>
  <tbody>
	{{#each projects}} 
	<tr>
	  <th scope="row">{{addOne @index}}</th>
	  <td>{{prjId}}</td>
	  <td>{{name}}</td>
	  <td>{{standard}}</td> 
	  <td>{{type}}</td>
	  <td>{{le}}</td> 
	  <td>{{co}}</td> 
	  <td>{{te}}</td> 
	  <td>
	  {{#if status }}
	  	已确认
		 {{else}}
		 <button type="button" class="btn btn-primary " onclick="main.edit_project_fn({{id}});">编辑</button>  <button type="button" class="btn btn-primary " onclick="main.del_prj_fn({{id}});">删除</button>
		{{/if}}
	  </td>						  
	</tr>
	{{/each}} 
  </tbody>
</table>