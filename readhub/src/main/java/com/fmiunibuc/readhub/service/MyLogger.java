package com.fmiunibuc.readhub.service;

import org.springframework.stereotype.Component;

import javax.annotation.PreDestroy;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Date;

@Component
public class MyLogger {
    private static MyLogger myLoggerInstance = null;
    private static BufferedWriter bufferedWriter;
    private static final String LOG_NAME = "./readhub/logger.csv";

    public MyLogger(){
        try {
            bufferedWriter = new BufferedWriter(new FileWriter(LOG_NAME, true));
        } catch (IOException e){
            System.out.println(e.getMessage());
        }
    }

    public static MyLogger getInstance(){
        if (myLoggerInstance == null){
            myLoggerInstance = new MyLogger();
        }
        return myLoggerInstance;
    }

    public void log(String message){
        Date currentDate = new Date();
        try {
            bufferedWriter.write(message + ", " + currentDate + "\n");
        } catch (IOException e){
            System.out.println(e.getMessage());
        }

    }

    public void close(){
        try{
            bufferedWriter.flush();
            bufferedWriter.close();
        } catch (IOException e){
            System.out.println(e.getMessage());
        }

    }
}
