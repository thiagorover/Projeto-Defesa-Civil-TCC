package com.defesacivil.api.domain;

import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public class Mail { 


	private final String from = "Defesa Civil De Joinville <defesacivil@org.com>"; 
	private String to; 
	private String subject; 
	private String content; 
	public Mail() { 

	} 
	public Mail(String from, String to, String subject, String content) {
		 this.to = to; this.subject = subject; this.content = content; 
	} 
	public String getFrom() {
		return from;
	} 
	
	public String getTo() { 
		return to; 
	}
	public void setTo(String to) { 
		this.to = to; 
	}
	public String getSubject() {
		return subject; 
	}
	public void setSubject(String subject) { 
		this.subject = subject;
	}
	public String getContent() { 
		return content; 
	}
	public void setContent(String content) {
		this.content = content; 
	}
	
	
	@Override 
	public String toString() {
		return "Mail{" + "from='" + from + '\'' + ", to='" + to + '\'' + ", subject='" + subject + '\'' + ", content='" + content + '\'' + '}'; 
	}
	

}
