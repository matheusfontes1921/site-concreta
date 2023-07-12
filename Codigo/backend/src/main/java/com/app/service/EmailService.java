package com.app.service;

import com.app.config.Initialize;
import jakarta.mail.Message;
import jakarta.mail.Multipart;
import jakarta.mail.Transport;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeBodyPart;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.MimeMultipart;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    public void sendMessage(String destinatario, String mensagem){

        try{

            Message message = new MimeMessage(Initialize.retornaSession());
            message.setFrom(new InternetAddress("no-reply-concreta-consultoria@outlook.com"));
            message.setRecipients(
                    Message.RecipientType.TO, InternetAddress.parse(destinatario));
            message.setSubject("Registro");

            MimeBodyPart mimeBodyPart = new MimeBodyPart();
            mimeBodyPart.setContent(mensagem, "text/html; charset=utf-8");

            Multipart multipart = new MimeMultipart();
            multipart.addBodyPart(mimeBodyPart);

            message.setContent(multipart);

            Transport.send(message);

        }catch (Exception e){
            System.out.println("ERRO AO ENVIAR EMAIL: " + e.getMessage());
        }
    }

}