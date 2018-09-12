<div class="row">
        <div class="span12">
          <div class="widget widget-nopad">
            <div class="widget-header"> <i class="icon-list-ol"></i>
              <h3 > {{month}} 工作月报</h3>    
            </div>
            <!-- /widget-header -->
            <div class="widget-content">
              <div class="widget">
                <div class=""> 
					<table class="table table-hover table-striped" id="wst-table-report-list">
					  <thead>
						<tr class="success">
						  <th scope="col" >序号</th>
						  <th scope="col" >工号</th>
						  <th scope="col">姓名</th>
						  <th scope="col">性别</th>
						  <th scope="col">年龄</th>
						  <th scope="col">职务</th>
						  <th scope="col">职称</th>
						  <th scope="col">岗位层级</th>
						  <th scope="col">本月工时识别率</th>
						  <th scope="col">本月工时填报率</th>
						  <th scope="col">本月总积点</th>
						  <th scope="col">本月室排名</th> 
						</tr>
						<tr>
							<th>项目编号</th>
							<th>项目名称</th>
							<th>项目阶段</th>
							<th>项目标准</th>
							<th>项目规模</th>
							<th>项目类型</th>
							<th>本人任职</th>
							<th>本月开始日期</th>
							<th>本月结束日期</th>
							<th>工交认定</th>
							<th>本工作积点</th>
							<th></th>
							
						</tr>
					  </thead>
					  <tbody>
					  	{{#each report}} 
							<tr>
							  <th >{{addOne @index}}</th>
							  <td>{{staff.username}}</td>
							  <td>{{staff.staffName}}</td>
							  <td>{{toGender staff.gender}}</td>
							  <td>{{toAge staff.birthDate}}</td>
							  <td>{{toJobTitle staff.jobTitle}}</td>
							  <td>{{toPosition staff.position}}</td>
							  <td>{{staff.level}}</td>
							  <td>{{monthOccurRate}}</td>
							  <td>{{monthFillRate}}</td>
							  <td>{{sumOfPoints}}</td>
							  <td>{{addOne @index}} / {{../sumCount}}</td> 
							</tr>
							{{#each worksheets}} 
							<tr>
							  <th >{{project.prjId}}</th>
							  <th >{{project.name}}</th>
							  <th >{{project.prjPhase}}</th>
							  <th >{{project.standard}}</th>
							  <th >{{project.co}}</th>
							  <th >{{project.type}}</th>
							  <td>{{prjPosition}}</td>
							  <td>{{toDate startDate}}</td>
							  <td>{{toDate endDate}}</td>
							  <td>{{workComfirm}}</td>
							  <td>{{points}}</td>
							  <td> <button class="btn btn-primary"  href="javascript:void" onclick="wst.approve_Wst_fn({{id}});" >评定</button> </td>  
							 
							</tr>
							{{/each}} 
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