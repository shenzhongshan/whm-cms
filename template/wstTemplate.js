<div class="row">
        <div class="span9">
          <div class="widget widget-nopad">
            <div class="widget-header"> <i class="icon-list-ol"></i>
              <h3 > {{month}} 工作月报</h3>    
            </div>
            <!-- /widget-header -->
            <div class="widget-content">
              <div class="widget">
                <div class=""> 
					<table class="table table-hover table-striped" width="600">
					  <thead>
						<tr class="success">
						  <th scope="col" width="40px">序号</th>
						  <th scope="col">项目编号</th>
						  <th scope="col">项目名称</th>
						  <th scope="col">参与人员</th>
						  <th scope="col">任职</th>
						  <th scope="col">起始日期</th> 
						  <th scope="col">结束日期</th>
						  <th scope="col">更新时间</th>
						  <th scope="col">工效认定</th> 
						  <th scope="col">分数</th> 
						  <th scope="col"></th> 
						</tr>
					  </thead>
					  <tbody>
					  	{{#each worksheets}} 
							<tr>
							  <th scope="row">{{addOne @index}}</th>
							  <td>{{prjId}}</td>
							  <td>{{project.name}}</td>
							  <td>{{staffId}}</td>
							  <td>{{prjPosition}}</td>
							  <td>{{toDate startDate}}</td>
							  <td>{{toDate endDate}}</td>
							  <td>{{toDateTime updateTime}}</td>
							  <td>{{workComfirm}}</td>
							  <td>{{points}}</td>
							 <td> <a class="btn btn-primary"  href="javascript:void" onclick="wst.approve_Wst_fn({{id}});" >评定</a> </td>		  
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