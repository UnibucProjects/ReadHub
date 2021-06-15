package com.fmiunibuc.readhub.app.src.components;

import com.fmiunibuc.readhub.model.BookCopy;
import com.fmiunibuc.readhub.model.Shelf;
import com.fmiunibuc.readhub.model.User;
import com.fmiunibuc.readhub.model.repositories.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UserControllerHelp {
    private UserRepository userRepository;

    public UserControllerHelp(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @GetMapping("/users/pagesRead/{id}")
    Integer pagesRead(@PathVariable Long id) {
        Optional<User> currentUser = userRepository.findById(id);
        User user = null;
        int pagesRead = 0;

        if(currentUser.isPresent()) {
            user = currentUser.get();
        }
        assert user != null;
        for(Shelf shelf : user.getLibrary().getShelfList()) {
            for(BookCopy bookCopy : shelf.getBooks()) {
                pagesRead += bookCopy.getPagesRead();
            }
        }

        return pagesRead;
    }

    @GetMapping("/users/totalPages/{id}")
    Integer totalPages(@PathVariable Long id) {
        Optional<User> currentUser = userRepository.findById(id);
        User user = null;
        int pagesRead = 0;

        if(currentUser.isPresent()) {
            user = currentUser.get();
        }
        assert user != null;
        for(Shelf shelf : user.getLibrary().getShelfList()) {
            for(BookCopy bookCopy : shelf.getBooks()) {
                pagesRead += bookCopy.getBookType().getPages();
            }
        }

        return pagesRead;
    }
}
