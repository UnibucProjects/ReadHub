package com.fmiunibuc.readhub.web;

import com.fmiunibuc.readhub.model.User;
import com.fmiunibuc.readhub.model.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UserController {
    private final Logger log = LoggerFactory.getLogger(BookController.class);
    private UserRepository userRepository;


    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/users")
    Collection<User> users(){
        List<User> users = userRepository.findAll();
        List<User> usersWithoutAdmin = new ArrayList<>();
        for(User user: users) {
            if(!user.getUsername().equals("admin")) {
                usersWithoutAdmin.add(user);
            }
        }

        return usersWithoutAdmin;
    }

    @GetMapping("/user/{id}")
    ResponseEntity<?> getUser(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/user/{id}")
    ResponseEntity<User> updateUser(@Valid @RequestBody User user) {
        log.info("Request to update book: {}", user);
        User result = userRepository.save(user);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        log.info("Request to delete user: {}", id);
        userRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
