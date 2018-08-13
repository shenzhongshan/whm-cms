 
					
					 <table class="table table-condensed table-hover ">
					  <thead>
						<tr class="success">
						  <th scope="col" width="70px"> {{month}} </th>
						  <th scope="col">工号</th>
						  <th scope="col">姓名</th>
						  <th scope="col">正班人次识别率</th>
						  <th scope="col">工时填报率</th>
						 
						  <th scope="col"> <button class="btn btn-info" data-toggle="modal" data-target="#importModal">导入考勤</button></th> 
						   
						</tr>
					  </thead>
					  <tbody>
						{{#each was}} 
						<tr>
						  <th scope="row">{{addOne @index}}</th>
						  <td>{{staffId}}</td>
						  <td>{{staffName}}</td>
						 
						  <td>{{monthOccurRate}}</td>
						  <td>{{monthFillRate}}</td> 
						  <td>
						  {{#if status }}
						  	已确认
							 {{else}}
							 <button type="button" class="btn btn-primary " onclick="wa.edit_wa_fn({{id}});">编辑</button>  <button type="button" class="btn btn-primary " onclick="wa.del_wa_fn({{id}});">删除</button>
							{{/if}}
						  </td>						  
						</tr>
						{{/each}} 
					  </tbody>
					</table>