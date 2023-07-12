package com.app.config;

import com.squareup.okhttp.*;
import org.springframework.boot.context.event.ApplicationStartedEvent;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;

import java.io.IOException;


@Configuration
public class IntegrationConfiguration {

    private final Metadado METADADO;

    public static String ACESS_TOKEN;

    public IntegrationConfiguration(Metadado metadado){
        this.METADADO = metadado;
    }


    @EventListener(ApplicationStartedEvent.class)
    public void generateAcessToken(){

        System.out.println(METADADO.getClient_id());
        System.out.println(METADADO.getClient_secret());
        System.out.println(METADADO.getCode());

        OkHttpClient client = new OkHttpClient();

        String application = "application/json";

        MediaType mediaType = MediaType.parse(application);

        RequestBody body = RequestBody.create(mediaType,
                "{" +
                        "\"client_id\" : \" " + METADADO.getClient_id() + "\", " +
                        "\"client_secret\" : \" " + METADADO.getClient_secret() + "\", " +
                        "\"code\" : \" " + METADADO.getCode() + "\" " +
                        "}");


        Request request = new Request.Builder()
                .url("https://api.rd.services/auth/token")
                .post(body)
                .addHeader("accept", application)
                .addHeader("content-type", application)
                .build();

        try {

            Response response = client.newCall(request).execute();

            ACESS_TOKEN = response.body().toString();

            System.out.println(response.body().toString());


        } catch (IOException e) {
            System.out.println("Erro ao pegar acess token: " + e.getMessage());
        }



    }


}
