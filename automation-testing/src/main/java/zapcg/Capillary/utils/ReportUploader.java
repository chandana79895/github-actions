 
package zapcg.Capillary.utils;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.auth.profile.ProfileCredentialsProvider;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.simpleemail.AmazonSimpleEmailService;
import com.amazonaws.services.simpleemail.AmazonSimpleEmailServiceClientBuilder;
import com.amazonaws.services.simpleemail.model.RawMessage;
import com.amazonaws.services.simpleemail.model.SendRawEmailRequest;

import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.PrintStream;
import java.net.URL;
import java.nio.ByteBuffer;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Properties;

public class ReportUploader {

   
    // S3 bucket details
    private static final String BUCKET_NAME = "chandana-poc";
    private static final String FILE_PATH = "Reports/index.html";
    private static final String KEY_NAME = Paths.get(FILE_PATH).getFileName().toString();

    // SES details
    private static final String SENDER = "mani.chandana@zapcg.com";
    private static final String RECIPIENT = "kajal.sharma@zapcg.com";
    private static final String SUBJECT = "Fortress Test Execution Report " + LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS);
    private static final String BODY_TEXT = "Please click on this latest Test Execution Report link:";

    public static void sendTestNGReports() throws IOException, MessagingException {

        // Instantiate an Amazon S3 client
        final AmazonS3 s3 = AmazonS3ClientBuilder.standard()
                .withCredentials(new ProfileCredentialsProvider())
                .withRegion(Regions.AP_SOUTH_1)
                .build();

        // Upload the report to S3 bucket
        try {
            s3.putObject(new PutObjectRequest(BUCKET_NAME, KEY_NAME, new File(FILE_PATH)));
        } catch (AmazonServiceException e) {
            System.err.println(e.getErrorMessage());
            System.exit(1);
        }

        // Generate the S3 Pre-signed URL of the Test Execution Report
        GeneratePresignedUrlRequest request = new GeneratePresignedUrlRequest(BUCKET_NAME, KEY_NAME, HttpMethod.GET);
        request.setExpiration(new Date(new Date().getTime() + 86400000));
        URL url = s3.generatePresignedUrl(request);

        // Send out the Report URL using Simple Email Service (SES)
        Session session = Session.getDefaultInstance(new Properties());
        MimeMessage message = new MimeMessage(session);

        try {
            // Configure the email details
            message.setSubject(SUBJECT, "UTF-8");
            message.setFrom(new InternetAddress(SENDER));
            message.setRecipients(javax.mail.Message.RecipientType.TO, InternetAddress.parse(RECIPIENT));
            message.setText("\n" + BODY_TEXT + "\n" + url.toString());
            javax.mail.Transport.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
      //Instantiate an Amazon SES client, which will make the service call with the supplied AWS credentials.
      //Replace AP_SOUTH_1 with the AWS Region you're using for Amazon SES.
        try {
            AmazonSimpleEmailService client = AmazonSimpleEmailServiceClientBuilder.standard()
                    .withRegion(Regions.AP_SOUTH_1)
                    .build();

            // Print the raw email content on the console
            PrintStream out = System.out;
            message.writeTo(out);

            // Send the email
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            message.writeTo(outputStream);
            RawMessage rawMessage = new RawMessage(ByteBuffer.wrap(outputStream.toByteArray()));
            SendRawEmailRequest rawEmailRequest = new SendRawEmailRequest(rawMessage);
            client.sendRawEmail(rawEmailRequest);
            System.out.println("Email sent!");
        } catch (Exception ex) {
            System.out.println("Email Failed");
            System.err.println("Error message: " + ex.getMessage());
            ex.printStackTrace();
        }
    }
}
