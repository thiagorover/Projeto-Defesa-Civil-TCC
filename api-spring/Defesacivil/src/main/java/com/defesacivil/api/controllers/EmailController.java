package com.defesacivil.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.defesacivil.api.domain.Mail;
import com.defesacivil.api.domain.User;
import com.defesacivil.api.services.EmailService;

@Component
public class EmailController {


	@Autowired
	private EmailService emailService;

	public void enviarEmail(User user, String newPassword) {

		Mail mail = new Mail();
		mail.setSubject("Alteração de senha para o email " + user.getEmail());
		mail.setTo(user.getEmail());
		
		StringBuilder html = new StringBuilder();
		
		html.append(" <!DOCTYPE html> ");
		html.append(" <html> ");
		html.append(" <head> ");
		html.append(" <title>Defesa Civil De Joinville</title> ");
		html.append(" <style> h4 { color: rgb(30,30,30);  font-family: Calibri; } ");
		html.append(" p { color: rgb(30,30,30); font-family: Calibri;  } </style>");
		html.append(" </head> ");
		html.append(" <body> ");
		html.append(" <h4>Olá ");
		html.append( user.getNome());
		html.append("!</h4><br>");
		html.append(" <p>Sua senha foi redefinida através do aplicativo da <b>Defesa Civil de Joinville,</b></p>");
		html.append(" <p>Agora sua senha é: <b>");
		html.append( newPassword );
		html.append(" </b></p>");
		
		html.append("</body>");
		html.append("</html>");
		 
		mail.setContent(html.toString());
	
				emailService.sendMessage(mail);
			
	   
	}

}


