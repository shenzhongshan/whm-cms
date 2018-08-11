<div class="widget big-stats-container">
                 <form id="edit-wa-form" class="form-horizontal">
                 <input type=hidden id="id" name="id" value="{{id}}" />" 
                 <input type=hidden id="month" name="month" value="{{month}}" />
									<fieldset>
										<br/>
										<div class="control-group">											
											<label class="control-label" for="staffId">工号</label>
											<div class="controls">
												<input type="text" class="span6 disabled"  id="staffId" name="staffId" value="{{staffId}}" readonly>
												<p class="help-block">工号不可修改.</p>
											</div> <!-- /controls -->				
										</div> <!-- /control-group -->
										
										
										<div class="control-group">											
											<label class="control-label" for="firstname">姓名</label>
											<div class="controls">
												<input type="text" class="span4"  id="staffName" name="staffName" value="{{staffName}}" readonly>
											</div> <!-- /controls -->				
										</div> <!-- /control-group --> 
										
										<div class="control-group">											
											<label class="control-label" for="password2">正班人次识别率</label>
											<div class="controls">
												<input type="text" class="span4" id="monthOccurRate" name="monthOccurRate" value="{{monthOccurRate}}">
											</div> <!-- /controls -->				
										</div> <!-- /control-group --> 
										
										
										<div class="control-group">											
											<label class="control-label">工时填报率</label>
											<div class="controls">
												<input type="text" class="span4" id="monthFillRate" name="monthFillRate" value="{{monthFillRate}}">
											</div> <!-- /controls -->	
										</div> <!-- /control-group --> 
										
										 
									 
                                        
                                        
										 <br /> 
											
										<div class="form-actions">
											<button type="button" class="btn btn-primary" onclick="wa.save_wa_fn();" >保存</button> 
											<a href="javascript:void" onclick="wa.return_cur_index_fn();" class="btn">返回</a>
										</div> <!-- /form-actions -->
									</fieldset>
								</form>
						 
				</div>