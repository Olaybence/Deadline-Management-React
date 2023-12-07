package com.rest.webservice.deadlinemanagementwebservice;

import org.springframework.web.bind.annotation.RestController;

@RestController
public class TaskController {
	
	private tasks: String[] = ["1","2","3"];
	
	@RequestMapping(method = RequestMethod.GET, path="/task-array")
	public String[] TaskArray() {
		return ;
	}
	
}
