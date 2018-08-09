<div class="row">
        <div class="span12">
          <div class="widget widget-nopad">
            <div class="widget-header"> <i class="icon-list-ol"></i>
              <h3 > {{month}} 工作月报</h3>  {{#if status }} <h3> 状态: 未提交</h3>  {{/if}}   <a class="btn btn-primary" onclick="whm.edit_Wst_fn('新增',null);"  href="javascript:void" >新增</a>{{#if status }}  <a onclick="whm.submit_wts_fn();" class="btn btn-primary"  href="javascript:void" >提交</a>{{/if}}  
            </div>
            <!-- /widget-header -->
            <div class="widget-content">
              <div class="widget big-stats-container">
                <div class=""> 
					<table class="table table-hover table-striped">
					  <thead>
						<tr class="success">
						  <th scope="col" width="70px">序号</th>
						  <th scope="col">项目编号</th>
						  <th scope="col">项目名称</th>
						  <th scope="col">项目阶段</th>
						  <th scope="col">项目标准</th>
						  <th scope="col">项目规模</th>
						  <th scope="col">项目类型</th>
						  <th scope="col">本人任职</th>
						  <th scope="col">本月起始日期</th>
						  <th scope="col">本月结束日期</th>
						  <th scope="col">更新时间</th>
						  <th scope="col"></th> 
						</tr>
					  </thead>
					  <tbody>
					  	{{#each worksheets}} 
							<tr>
							  <th scope="row">{{addOne @index}}</th>
							  <td>{{prjId}}</td>
							  <td>{{project.name}}</td>
							  <td>{{prjPhase}}</td>
							  <td>{{project.standard}}</td>
							  <td>{{project.scale}}</td>
							  <td>{{project.type}}</td>
							  <td>{{prjPosition}}</td>
							  <td>{{toDate startDate}}</td>
							  <td>{{toDate endDate}}</td>
							  <td>{{toDateTime updateTime}}</td>
							 <td>
							 {{#if status }}
							 	已提交
							 {{else}}
							 	<a class="btn btn-primary"  href="javascript:void" onclick="whm.edit_Wst_fn('编辑',{{id}});" >编辑</a> <a class="btn btn-primary"  href="javascript:void" onclick="whm.del_wts_fn({{id}});" >删除</a>
							 {{/if}}
							 </td>		  
							</tr>
						{{/each}} 
					  </tbody>
					</table>

                </div>
                <!-- /widget-content --> 
                
              </div>
            </div>
          </div>
          <!-- /widget -->
          
          <!-- /widget -->
          
          <!-- /widget --> 
        </div>
        <!-- /span12 --> 
        
      </div>