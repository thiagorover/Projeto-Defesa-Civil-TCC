package com.defesacivil.api.services;

import java.util.Date;

import javax.mail.Message.RecipientType;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import com.defesacivil.api.domain.Mail;

@Component
public class EmailService {

	@Autowired
	private JavaMailSender mailSender;

	public void sendMessage(Mail mail) {
		
		MimeMessage message = mailSender.createMimeMessage();
		try {
			message.addRecipients(RecipientType.TO, mail.getTo());
			message.setContent(mail.getContent(), "text/html");
			message.setSubject(mail.getSubject());
			message.setSentDate(new Date());
			message.setFrom(mail.getFrom());
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}			
				mailSender.send(message);
	}
}
