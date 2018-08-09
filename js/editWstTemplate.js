<div class="row">
	    
		 
        <div class="span12">
          <div class="widget widget-nopad">
            <div class="widget-header"> <i class="icon-list-ol"></i>
              <h3>{{month}} 编辑项目信息</h3> 
            </div>
            <!-- /widget-header -->
            <div class="widget-content">
              <div class="widget big-stats-container">
                 <form id="edit-wst-form" class="form-horizontal">
                 	<input type=hidden name='id' value="{{ts.id}}"/>
                	<input type=hidden name='staffId' value="{{ts.staffId}}"/>
									<fieldset>
										<br/>
										<div class="control-group">											
											<label class="control-label" for="password1">项目</label>
                                            <div class="controls">
                                               <div class="input-prepend input-append">
                                                 <select name=prjId id="sel_prjId">
                                                 {{#each project}} 
													<option value={{id}}>{{name}}</option>
												 {{/each}} 											
												 </select>
                                                </div>
                                              </div>	<!-- /controls -->					
										</div> <!-- /control-group -->
										
										<br/>
										<div class="control-group">											
											<label class="control-label" for="password2">项目阶段</label>
											<div class="controls">
                                               <div class="input-prepend input-append">
                                                 <select name=prjPhase id="sel_prjPhase">
													<option value='规划研究'>规划研究</option>
													<option value='预可行性研究'>预可行性研究</option>
													<option value='可行性研究'>可行性研究</option>	
													<option value='初步设计'>初步设计</option>
													<option value='施工图设计'>施工图设计</option>
													<option value='配合施工'>配合施工</option>
													<option value='变更设计'>变更设计</option>
													<option value='初测'>初测</option>
													<option value='定测'>定测</option>	
												 </select>
                                                </div>
                                              </div>	<!-- /controls -->				
										</div> <!-- /control-group --> 
										
										<br/>										
										<div class="control-group">											
											<label class="control-label">项目中本人任职</label>
											<div class="controls">
                                               <div class="input-prepend input-append">
                                                 <select name=prjPosition id="sel_prjPosition">
													<option value='总体'>总体</option>
													<option value='副总体'>副总体</option>
													<option value='专业设计负责人'>专业设计负责人</option>
													<option value='一般设计人员'>一般设计人员</option>
													<option value='技术队长'>技术队长</option>
													<option value='内业组长'>内业组长</option>
													<option value='一般外业人员'>一般外业人员</option>
												 </select>
                                                </div>
                                              </div>	<!-- /controls -->	
										</div> <!-- /control-group --> 
                                        <div class="control-group">											
											<label class="control-label" for="radiobtns">本月工作起始日期</label>
											<div class="controls">
                                               <div class="input-prepend input-append">
                                                 <select name=startDate id="sel_startDate">
                                                 {{#each days}} 
													<option value={{date}}>{{day}}</option>
													 {{/each}} 			 
												 </select>
                                                </div>
                                              </div>	<!-- /controls -->				
										</div> <!-- /control-group -->
                                        
                                         <div class="control-group">											
											<label class="control-label" for="radiobtns">本月工作结束日期</label>
											<div class="controls">
                                               <div class="input-prepend input-append">
                                                 <select name=endDate id="sel_endDate">
                                                 {{#each days}} 
													<option value={{date}}>{{day}}</option>
													 {{/each}} 			 
												 </select>
												 </select>
                                                </div>
                                              </div>	<!-- /controls -->			
										</div> <!-- /control-group -->
										 <br /> 
											
										<div class="form-actions">
											<button type="button" onclick="whm.save_wts_fn();" class="btn btn-primary">{{saveBtn}}</button> 
											<a href="javascript:void" onclick="whm.return_cur_index_fn();" class="btn">取消</a>
										</div> <!-- /form-actions -->
									</fieldset>
								</form>
						 
				</div>
                </div>
                <!-- /widget-content --> 
                
              </div>
            </div>
          </div>