<div class="row">
	    
		 
        <div class="span12">
          <div class="widget widget-nopad">
            <div class="widget-header"> <i class="icon-list-ol"></i>
              <h3>评定项目信息</h3> 
            </div>
            <!-- /widget-header -->
            <div class="widget-content">
              <div class="widget big-stats-container">
                 <form id="edit-wst-form" class="form-horizontal">
                 	<input type=hidden name='id' value="{{id}}"/>
                	<input type=hidden name='staffId' value="{{staffId}}"/>
                		<input type=hidden name='prjId' value="{{prjId}}"/>
                			<input type=hidden name='month' value="{{month}}"/>
									<fieldset>
										<br/>
										<div class="control-group">											
											<label class="control-label" for="password1">项目</label>
                                            <div class="controls">
                                               <div class="input-prepend input-append">
                                            <input type="text" name="sel_prjId" id="sel_prjId" value="{{projectName}}" readOnly /> 
                                                </div>
                                              </div>	<!-- /controls -->					
										</div> <!-- /control-group -->
										
										<br/>
										<div class="control-group">											
											<label class="control-label" for="password2">项目阶段</label>
											<div class="controls">
                                               <div class="input-prepend input-append">
                                                 <input type="text" name=prjPhase id="sel_prjPhase" value="{{prjPhase}}" readOnly/>
													 
                                                </div>
                                              </div>	<!-- /controls -->				
										</div> <!-- /control-group --> 
										
										<br/>										
										<div class="control-group">											
											<label class="control-label">项目中本人任职</label>
											<div class="controls">
                                               <div class="input-prepend input-append">
                                               <input type="text" name=prjPosition id="sel_prjPosition" value="{{prjPosition}}" readOnly/> 
                                                </div>
                                              </div>	<!-- /controls -->	
										</div> <!-- /control-group --> 
                                        <div class="control-group">											
											<label class="control-label" for="radiobtns">本月工作起始日期</label>
											<div class="controls">
                                               <div class="input-prepend input-append">
                                               <input type="text" name=startDate id="sel_startDate" value="{{toDate startDate}}" readOnly/> 
                                                 
                                                </div>
                                              </div>	<!-- /controls -->				
										</div> <!-- /control-group -->
                                        
                                         <div class="control-group">											
											<label class="control-label" for="radiobtns">本月工作结束日期</label>
											<div class="controls">
                                               <div class="input-prepend input-append">
                                               <input type="text" name=endDate id="sel_endDate" value="{{toDate endDate}}" readOnly/> 
                                                  
                                                </div>
                                              </div>	<!-- /controls -->			
										</div> <!-- /control-group -->
										
										 <div class="control-group">											
											<label class="control-label" for="radiobtns">工效认定</label>
											<div class="controls">
                                            <div class="input-prepend input-append">
                                            <input type="text" name="workComfirm" id="workComfirm" value="{{ workComfirm}}" /> 
                                               
                                             </div>
                                           </div>	<!-- /controls -->			
										</div> <!-- /control-group -->
										
										 <div class="control-group">											
											<label class="control-label" for="radiobtns">本工作积点</label>
											<div class="controls">
                                            <div class="input-prepend input-append">
                                            <input type="text" name="points" id="points" value="{{ points}}" onblur="wst.eval_wts_fn();"/> 
                                               <button type="button" onclick="wst.eval_wts_fn('calc');" class="btn btn-primary">计算</button> 
                                             </div>
                                           </div>	<!-- /controls -->			
										</div> <!-- /control-group -->
										 <br /> 
											
										<div class="form-actions">
											<button type="button" onclick="wst.save_wts_fn();" class="btn btn-primary">评定</button> 
											<a href="javascript:void" onclick="wst.return_cur_index_fn();" class="btn">取消</a>
										</div> <!-- /form-actions -->
									</fieldset>
								</form>
						 
				</div>
                </div>
                <!-- /widget-content --> 
                
              </div>
            </div>
          </div>