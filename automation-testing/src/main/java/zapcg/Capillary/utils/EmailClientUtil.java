package zapcg.Capillary.utils;

import java.util.List;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.*;
import javax.mail.internet.*;

public class EmailClientUtil {
	 private String smtpHost;
	    private String smtpPort;
	    private String fromEmail;
	    private String emailPassword;

	    public EmailClientUtil(String smtpHost, String smtpPort, String fromEmail, String emailPassword) {
	        this.smtpHost = smtpHost;
	        this.smtpPort = smtpPort;
	        this.fromEmail = fromEmail;
	        this.emailPassword = emailPassword;
	    }

	    public void sendEmail(List<String> toEmails, String subject, String body, String attachmentPath) {
	        Properties properties = new Properties();
	        properties.put("mail.smtp.host", smtpHost);
	        properties.put("mail.smtp.port", smtpPort);
	        properties.put("mail.smtp.auth", "true");
	        properties.put("mail.smtp.starttls.enable", "true");
	        //properties.put("mail.smtp.ssl.enable", "true");

	        
	        Session session = Session.getInstance(properties, new javax.mail.Authenticator() {
	            protected PasswordAuthentication getPasswordAuthentication() {
	                return new PasswordAuthentication(fromEmail, emailPassword);
	            }
	        });

	        try {
	            Message message = new MimeMessage(session);
	            message.setFrom(new InternetAddress(fromEmail));
	          
	         // Add multiple recipients
	            for (String toEmail : toEmails) {
	                message.addRecipient(Message.RecipientType.TO, new InternetAddress(toEmail));
	            }

	            //message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail));
	            message.setSubject(subject);

	            // Create the message part
	            BodyPart messageBodyPart = new MimeBodyPart();
	            messageBodyPart.setText(body);

	            // Create a multipart message
	            Multipart multipart = new MimeMultipart();
	            multipart.addBodyPart(messageBodyPart);

	            // Attach the file
	            if (attachmentPath != null) {
	                messageBodyPart = new MimeBodyPart();
	                DataSource source = new FileDataSource(attachmentPath);
	                messageBodyPart.setDataHandler(new DataHandler(source));
	                messageBodyPart.setFileName(attachmentPath);
	                multipart.addBodyPart(messageBodyPart);
	            }

	            // Send the complete message parts
	            message.setContent(multipart);

	            // Send the message
	            Transport.send(message);
	            System.out.println("Email sent successfully to " + toEmails);
	        } catch (MessagingException e) {
	            e.printStackTrace();
	        }
	    }

}
