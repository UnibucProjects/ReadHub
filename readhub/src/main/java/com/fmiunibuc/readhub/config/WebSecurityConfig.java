package com.fmiunibuc.readhub.config;

import com.fmiunibuc.readhub.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
        // securedEnabled = true,
        // jsr250Enabled = true,
        prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    UserDetailsServiceImpl userDetailsService;

    @Autowired
    private AuthEntryPointJwt unauthorizedHandler;

    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }

    @Override
    public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
                .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authorizeRequests().antMatchers("/api/auth/**").permitAll()
                .antMatchers("/myBookCopy/**").permitAll()
                .antMatchers("/addBookToShelf/**").permitAll()
                .antMatchers("/myStats/**").permitAll()
                .antMatchers("/api/myStats/**").permitAll()
                .antMatchers("/api/addBookToShelf/**").permitAll()
                .antMatchers("/api/myBookCopy/**").permitAll()
                .antMatchers("/api/test/**").permitAll()
                .antMatchers("/api/bookCopiesStatus/**").permitAll()
                .antMatchers("/api/libraries/**").permitAll()
                .antMatchers("/api/library/**").permitAll()
                .antMatchers("/myLibrary/**").permitAll()
                .antMatchers("/api/myLibrary/**").permitAll()
                .antMatchers("/api/shelves/**").permitAll()
                .antMatchers("/api/shelf/**").permitAll()
                .antMatchers("/api/books/**").permitAll()
                .antMatchers("/api/book/**").permitAll()
                .antMatchers("/api/bookCopies/**").permitAll()
                .antMatchers("/api/bookCopy/**").permitAll()
                .antMatchers("/api/users/**").permitAll()
                .antMatchers("/api/user/**").permitAll()
                .anyRequest().authenticated();

        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
    }
}
