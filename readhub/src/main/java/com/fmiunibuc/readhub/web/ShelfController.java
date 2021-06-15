package com.fmiunibuc.readhub.web;

import com.fmiunibuc.readhub.model.Library;
import com.fmiunibuc.readhub.model.Shelf;
import com.fmiunibuc.readhub.model.User;
import com.fmiunibuc.readhub.model.repositories.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    private final Logger log = LoggerFactory.getLogger(ShelfController.class);
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
        return shelfRepository.findAll();
    }

    @GetMapping("/shelf/{id}")
    ResponseEntity<?> getShelf(@PathVariable Long id) {
        Optional<Shelf> shelf = shelfRepository.findById(id);
        return shelf.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/myShelves/{userId}/{bookId}")
    Collection<Shelf> myShelves(@PathVariable Long userId, @PathVariable Long bookId) {
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
        Optional<User> user = userRepository.findById(id);
        Library library = null;
        if(user.isPresent()) {
            library = user.get().getLibrary();
        }
        if (library != null)
        {
            shelf.setLibrary(library);
            library.getShelfList().add(shelf);
        }
        Shelf result = shelfRepository.save(shelf);
        return ResponseEntity.created(new URI("/api/shelf/" + result.getId()))
                .body(result);
    }

    @PutMapping("/shelf/{id}")
    ResponseEntity<Shelf> updateShelf(@Valid @RequestBody Shelf shelf) {
        log.info("Request to update shelf: {}", shelf);
        System.out.println("\n\n\n\n\n\n\n\n\n");
        System.out.println("s-a ajuns la PUT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        System.out.println("\n\n\n\n\n\n\n\n\n");
        Shelf result = shelfRepository.save(shelf);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/shelf/{id}")
    public ResponseEntity<?> deleteShelf(@PathVariable Long id) {
        log.info("Request to delete shelf: {}", id);
        shelfRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
