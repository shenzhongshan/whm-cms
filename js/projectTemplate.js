 <table class="table table-condensed table-hover ">
  <thead>
	<tr class="success">
	  <th scope="col" width="70px"> {{month}} </th>
	  <th scope="col">项目编号</th>
	  <th scope="col">年月</th>
	  <th scope="col">项目名称</th>
	  <th scope="col">项目标准</th>
	  <th scope="col">项目类型</th> 
	  <th scope="col">项目规模</th> 
	  <th scope="col">最后更新</th> 
	  <th scope="col"><button type="button" onclick="main.edit_project_fn({{id}});" class="btn btn-info">新增</button> {{#if status }}  <button type="button" class="btn btn-success" onclick="main.confirm_prj_fn('{{month}}');">确认</button>{{/if}}</th> 
	</tr>
  </thead>
  <tbody>
	{{#each projects}} 
	<tr>
	  <th scope="row">{{addOne @index}}</th>
	  <td>{{prjId}}</td>
	  <td>{{month}}</td>
	  <td>{{name}}</td>
	  <td>{{standard}}</td> 
	  <td>{{type}}</td>
	  <td>{{scale}}</td> 
	  <td>{{toDateTime updateDate}}</td>
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