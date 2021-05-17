package com.fmiunibuc.readhub.web;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class HelloWorldController {

	@RequestMapping("/dashboard")
	public String firstPage() {
		return "success";
	}
}