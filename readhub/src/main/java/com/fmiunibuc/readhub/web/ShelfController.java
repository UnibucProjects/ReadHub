package com.fmiunibuc.readhub.web;

import com.fmiunibuc.readhub.model.Library;
import com.fmiunibuc.readhub.model.Shelf;
import com.fmiunibuc.readhub.model.User;
import com.fmiunibuc.readhub.model.repositories.*;
import com.fmiunibuc.readhub.service.LoggerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;


@RestController
@RequestMapping("/api")
public class ShelfController {
    private final LoggerService loggerService = new LoggerService();
    private ShelfRepository shelfRepository;
    private BookCopyRepository bookCopyRepository;
    private BookRepository bookRepository;
    private UserRepository userRepository;
    private LibraryRepository libraryRepository;

    public ShelfController(ShelfRepository shelfRepository, BookCopyRepository bookCopyRepository, UserRepository userRepository, LibraryRepository libraryRepository) {
        this.shelfRepository = shelfRepository;
        this.bookCopyRepository = bookCopyRepository;
        this.userRepository = userRepository;
        this.libraryRepository = libraryRepository;
    }

    @GetMapping("/shelves")
    Collection<Shelf> shelves(){
        loggerService.info("Request to get all shelves");
        return shelfRepository.findAll();
    }

    @GetMapping("/shelf/{id}")
    ResponseEntity<?> getShelf(@PathVariable Long id) {
        loggerService.info("Request to get shelf " + id);
        Optional<Shelf> shelf = shelfRepository.findById(id);
        return shelf.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/myShelves/{userId}/{bookId}")
    Collection<Shelf> myShelves(@PathVariable Long userId, @PathVariable Long bookId) {
        loggerService.info("Request to get all shelves of user " + userId);
        Optional<User> user = userRepository.findById(userId);
        Library library = null;
        if(user.isPresent()) {
            library = user.get().getLibrary();
        }

        if(library != null) {
            return library.getShelfList();
        }

        return null;
    }

    @PostMapping("/shelf/{id}")
    ResponseEntity<Shelf> createShelf(@Valid @RequestBody Shelf shelf, @PathVariable Long id) throws URISyntaxException {
        loggerService.info("Request to create shelf");
        Optional<User> user = userRepository.findById(id);
        Library library = null;
        Shelf result = shelfRepository.save(shelf);
        if(user.isPresent()) {
            library = user.get().getLibrary();
        }
        if (library != null)
        {
            shelf.setLibrary(library);
            library.getShelfList().add(shelf);
        }
        return ResponseEntity.created(new URI("/api/shelf/" + result.getId()))
                .body(result);
    }

    @PutMapping("/shelf/{id}")
    ResponseEntity<Shelf> updateShelf(@Valid @RequestBody Shelf shelf) {
        loggerService.info("Request to update shelf " + shelf.getId());
        Shelf result = shelfRepository.save(shelf);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/shelf/{id}")
    public ResponseEntity<?> deleteShelf(@PathVariable Long id) {
        loggerService.info("Request to delete shelf " + id);
        Optional<Shelf> tbd = shelfRepository.findById(id);
        tbd.get().getLibrary().getShelfList().remove(tbd.get());
        shelfRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
