<div class="widget big-stats-container">
                 <form id="edit-employ-form" class="form-horizontal">
                 <input type=hidden name="id" value="{{id}}" />
									<fieldset>
										<br/>
										<div class="control-group">											
											<label class="control-label" for="username">工号</label>
											<div class="controls">
												<input type="text" class="span6 disabled" id="username" name="username" value="{{username}}"{{#if id }} readOnly {{/if}} name="username"  >
												<p class="help-block">工号，保存后不可修改.</p>
											</div> <!-- /controls -->				
										</div> <!-- /control-group -->
										
										
										<div class="control-group">											
											<label class="control-label" for="staffName">姓名</label>
											<div class="controls">
												<input type="text" class="span6" id="staffName" name="staffName" value="{{staffName}}">
											</div> <!-- /controls -->				
										</div> <!-- /control-group -->
										
										 
										<div class="control-group">											
											<label class="control-label">性别</label>
											
                                            
                                            <div class="controls">
                                            <label class="radio inline">
                                              <input type="radio" value="M" name="gender"> 男
                                            </label>
                                            
                                            <label class="radio inline">
                                              <input type="radio" value="F" name="gender"> 女
                                            </label>
                                          </div>	<!-- /controls -->			
										</div> <!-- /control-group --> 
										
										 
										
                                        
                                        <div class="control-group">											
											<label class="control-label" for="radiobtns">职务</label>
											
                                            <div class="controls">
                                               <div class="input-prepend input-append">
                                                 <select name="position" id="sel_position">
													<option value='PN001'>主任</option>
													<option value='PN002'>副主任</option>
													<option value='PN003'>一般设计人员</option>													
												 </select>
                                                </div>
                                              </div>	<!-- /controls -->			
										</div> <!-- /control-group -->
                                        
                                        
                                          
                                        <div class="control-group">											
											<label class="control-label" for="radiobtns">职称</label>
											
                                            <div class="controls">
                                               <div class="input-prepend input-append">
                                                 <select name="jobTitle" id="sel_jobTitle">
													<option value='JT001'>教授级高级工程师</option>
													<option value='JT002'>高级工程师</option>
													<option value='JT003'>工程师</option>													
													<option value='JT004'>助理工程师</option>													
													<option value='JT005'>见习生</option>													
												 </select>
                                                </div>
                                              </div>	<!-- /controls -->			
										</div> <!-- /control-group -->
                                        
                                        
                                        <div class="control-group">											
											<label class="control-label" for="radiobtns">岗位级别</label>
											
                                            <div class="controls">
                                               <div class="input-prepend input-append">
                                               <input type="text" class="span6" id="level" name="level" value="{{level}}">
                                                </div>
                                              </div>	<!-- /controls -->			
										</div> <!-- /control-group --> 
										
										 
										 <br /> 
											
										<div class="form-actions">
											<button type="button" class="btn btn-primary" onclick="employ.save_employ_fn();">保存</button> 
											<a href="javascript:void" onclick="employ.return_cur_index_fn();" class="btn">返回</a>
										</div> <!-- /form-actions -->
									</fieldset>
								</form>
						 
				</div>