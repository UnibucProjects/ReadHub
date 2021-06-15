package com.fmiunibuc.readhub.service;

public class LoggerService {
    public void info(String message){
        MyLogger logger = new MyLogger();
        logger.log(message);
        logger.close();
    }
}
