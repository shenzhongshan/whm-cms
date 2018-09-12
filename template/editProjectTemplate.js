<div class="widget widget-nopad">
            <div class="widget-header"> <i class="icon-list-ol"></i>
              <h3> {{month}} {{saveBtn}} 项目信息</h3> 
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
												<!--input type="text" class="span4" name="standard" value="{{prj.standard}}"-->
												<select  name="standard" id="sel_standard">
													<option value='铁路专用线'>铁路专用线</option>
													<option value='货运专线120以下'>货运专线120以下</option>
													<option value='客货共线120'>客货共线120</option>
													<option value='客货共线160'>客货共线160</option>
													<option value='客货共线200'>客货共线200</option>
													<option value='客运专线250'>客运专线250</option>
													<option value='客运专线300'>客运专线300</option>
													<option value='客运专线350'>客运专线350</option>
													<option value='城际铁路160'>城际铁路160</option>
													<option value='城际铁路200'>城际铁路200</option>
													<option value='城际铁路250'>城际铁路250</option>
													<option value='市政广场'>市政广场</option>
													<option value='市政规划'>市政规划</option>
													<option value='市政道路'>市政道路</option>
													<option value='公路一级'>公路一级</option>
													<option value='公路二级'>公路二级</option>
													
												</select>
											</div> <!-- /controls -->				
										</div> <!-- /control-group --> 
										
										
										<div class="control-group">											
											<label class="control-label">项目类型</label>
											<div class="controls">
												<!--input type="text" class="span4" name="type" value="{{prj.type}}"-->
												<select  name="type" id="sel_type">
													<option value='院控铁路A类'>院控铁路A类</option>
													<option value='院控铁路B类'>院控铁路B类</option>
													<option value='院控铁路C类'>院控铁路C类</option>
													<option value='自揽铁路A类'>自揽铁路A类</option>
													<option value='自揽铁路B类'>自揽铁路B类</option>
													<option value='自揽铁路C类'>自揽铁路C类</option>
													<option value='自揽市政A类'>自揽市政A类</option>
													<option value='自揽市政B类'>自揽市政B类</option>
													<option value='自揽公路A类'>自揽公路A类</option>
													<option value='自揽公路B类'>自揽公路B类</option>
													<option value='自揽其它A类'>自揽其它A类</option>
													<option value='自揽其它B类'>自揽其它B类</option> 
													<option value='科研业建'>科研业建</option> 
													<option value='助勤或学习'>助勤或学习</option> 
												</select>
											</div> <!-- /controls -->	
										</div> <!-- /control-group --> 
										
										 
										
                                        
                                        <div class="control-group">											
											<label class="control-label" for="radiobtns">项目正线长度 L(km)</label>
											
                                            <div class="controls">
                                               <div class="input-prepend input-append">
                                               <input type="text" class="span4" name="le" value="{{prj.le}}">
                                                </div>
                                              </div>	<!-- /controls -->			
										</div> <!-- /control-group -->
                                        
                                        <div class="control-group">											
											<label class="control-label" for="radiobtns">项目总投资 Co(亿元)</label>
											
                                            <div class="controls">
                                               <div class="input-prepend input-append">
                                               <input type="text" class="span4" name="co" value="{{prj.co}}">
                                                </div>
                                              </div>	<!-- /controls -->			
										</div> <!-- /control-group -->
										
                                        <div class="control-group">											
											<label class="control-label" for="radiobtns">地形等级 Te</label>
											
                                            <div class="controls">
                                               <div class="input-prepend input-append">
                                               <input type="text" class="span4" name="te" value="{{prj.te}}">
                                                </div>
                                              </div>	<!-- /controls -->			
										</div> <!-- /control-group -->
                                        
										 <br /> 
											
										<div class="form-actions">
											<button type="button" onclick="main.save_project_fn()" class="btn btn-primary">保存</button> 											
											<a href="javascript:void" onclick="main.return_cur_index_fn()" class="btn">返回</a>
										</div> <!-- /form-actions -->
									</fieldset>
								</form>
						 
				</div>
                </div>
                <!-- /widget-content --> 
                
              </div>