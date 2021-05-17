package com.fmiunibuc.readhub.config;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Serializable;

/*
* handle exceptions and whenever JWT token is not validated it throws Unauthorised exception.
* */
@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint, Serializable {
    @Override
    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException authException) throws IOException, IOException {
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED,         "Unauthorized");
    }
}
