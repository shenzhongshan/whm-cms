  <table class="table table-condensed table-hover ">
					  <thead>
						<tr class="success">
						  <th scope="col" width="70px"> #</th>
						  <th scope="col">工号</th>
						  <th scope="col">姓名</th>
						  <th scope="col">性别</th>
						  <th scope="col">职务</th>
						  <th scope="col">职称</th>
						  
						  <th scope="col">岗位级别</th> 
						  <th scope="col">操作</th> 
						</tr>
					  </thead>
					  <tbody>
					  {{#each employees }} 
						<tr>
						<th scope="row">{{addOne @index}}</th>
						  <td>{{username}}</td>
						  <td>{{staffName}}</td>
						  <td>{{toGender gender}}</td>
						  <td>{{toPosition position}}</td>
						   
						  <td>{{toJobTitle jobTitle}}</td>
						  <td>{{level}}</td>
						  
						  <td>
						  <button type="button" class="btn btn-primary " onclick="employ.edit_employ_fn({{id}});">编辑</button> <button type="button" class="btn btn-warning " onclick="employ.reset_password_fn('{{username}}');">重置密码</button>  <button type="button" class="btn btn-primary " onclick="employ.del_employ_fn({{id}});">删除</button>
						  </td>						  
						</tr>
						{{/each}} 
					  </tbody>
					</table>
					 