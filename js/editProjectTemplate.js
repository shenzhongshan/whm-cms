<div class="widget widget-nopad">
            <div class="widget-header"> <i class="icon-list-ol"></i>
              <h3> {{month}}编辑项目信息</h3> 
            </div>
            <!-- /widget-header -->
            <div class="widget-content">
              <div class="widget big-stats-container">
                 <form id="edit-project-form" class="form-horizontal">
                 <input type=hidden id="id" name ="id" value="{{prj.id}}" />
									<fieldset>
										<br/>
										<div class="control-group">											
											<label class="control-label" for="username">项目编号</label>
											<div class="controls">
												<input type="text" class="span6 disabled" id="prjId"  {{#if prj.prjId }} readOnly {{/if}}name="prjId" value="{{prj.prjId}}" >
												<p class="help-block">项目编号，保存后不可修改.</p>
											</div> <!-- /controls -->				
										</div> <!-- /control-group -->
										
										
										<div class="control-group">											
											<label class="control-label" for="firstname">年月</label>
											<div class="controls">
												<input type="text" readOnly name="month" value='{{#if prj.month }} {{prj.month}}  {{else}}  {{month}}	{{/if}}'/>
												<!--select><option>201801</option><option>201802</option><option>201803</option><option>201804</option></select-->
											</div> <!-- /controls -->				
										</div> <!-- /control-group -->
										
										<div class="control-group">											
											<label class="control-label" for="password1">项目名称</label>
											<div class="controls">
												<input type="text" class="span4" name="name" value="{{prj.name}}">
											</div> <!-- /controls -->				
										</div> <!-- /control-group -->
										
										
										<div class="control-group">											
											<label class="control-label" for="password2">项目标准</label>
											<div class="controls">
												<input type="text" class="span4" name="standard" value="{{prj.standard}}">
											</div> <!-- /controls -->				
										</div> <!-- /control-group --> 
										
										
										<div class="control-group">											
											<label class="control-label">项目类型</label>
											<div class="controls">
												<input type="text" class="span4" name="type" value="{{prj.type}}">
											</div> <!-- /controls -->	
										</div> <!-- /control-group --> 
										
										 
										
                                        
                                        <div class="control-group">											
											<label class="control-label" for="radiobtns">项目规模</label>
											
                                            <div class="controls">
                                               <div class="input-prepend input-append">
                                               <input type="text" class="span4" name="scale" value="{{prj.scale}}">
                                                </div>
                                              </div>	<!-- /controls -->			
										</div> <!-- /control-group -->
                                        
                                        
                                        
										 <br /> 
											
										<div class="form-actions">
											<button type="submit" onclick="main.save_project_fn()" class="btn btn-primary">保存</button> 											
											<a href="javascript:void" onclick="main.return_cur_index_fn()" class="btn">返回</a>
										</div> <!-- /form-actions -->
									</fieldset>
								</form>
						 
				</div>
                </div>
                <!-- /widget-content --> 
                
              </div>