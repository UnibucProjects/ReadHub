package com.fmiunibuc.readhub.web;

import com.fmiunibuc.readhub.model.BookCopy;
import com.fmiunibuc.readhub.model.Library;
import com.fmiunibuc.readhub.model.Shelf;
import com.fmiunibuc.readhub.model.User;
import com.fmiunibuc.readhub.model.repositories.LibraryRepository;
import com.fmiunibuc.readhub.model.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.*;

@RestController
@RequestMapping("/api")
public class LibraryController {
    private final Logger log = LoggerFactory.getLogger(LibraryController.class);
    private LibraryRepository libraryRepository;
    private UserRepository userRepository;

    public LibraryController(LibraryRepository libraryRepository, UserRepository userRepository) {
        this.libraryRepository = libraryRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/libraries")
    Collection<Library> libraries(){
        return libraryRepository.findAll();
    }

    @GetMapping("/myStats/{id}")
    Collection<BookCopy> getStats(@PathVariable Long id){
        Optional<User> user = userRepository.findById(id);
        Set<Shelf> shelves = user.get().getLibrary().getShelfList();
        List<BookCopy> books = new ArrayList<>();
        for (Shelf shelf : shelves){
            books.addAll(shelf.getBooks());
        }
        int mostPages = 0, leastPages = 100000, maxRate = -1, minRate = 11;
        BookCopy longestBook = null;
        BookCopy shortestBook = null;
        BookCopy bestBook = null;
        BookCopy worstBook = null;
        for (BookCopy bookCopy : books){
            if (bookCopy.getBookType().getPages() > mostPages){
                mostPages = bookCopy.getBookType().getPages();
                longestBook = bookCopy;
            }
            if (bookCopy.getBookType().getPages() < leastPages){
                leastPages = bookCopy.getBookType().getPages();
                shortestBook = bookCopy;
            }
            if (bookCopy.getRating() > maxRate){
                maxRate = bookCopy.getRating();
                bestBook = bookCopy;
            }
            if (bookCopy.getRating() < minRate && bookCopy.getRating() > 0){
                minRate = bookCopy.getRating();
                worstBook = bookCopy;
            }
        }
        List<BookCopy> stats = new ArrayList<>();
        if (longestBook != null){
            stats.add(longestBook);
            stats.add(shortestBook);
            stats.add(bestBook);
            stats.add(worstBook);
        }
        return stats;

    }

    @GetMapping("/myLibrary/{id}")
    ResponseEntity<?> getMyLibrary(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.map(response -> ResponseEntity.ok().body(response.getLibrary().getShelfList()))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    @GetMapping("/library/{id}")
    ResponseEntity<?> getLibrary(@PathVariable Long id) {
        Optional<Library> library = libraryRepository.findById(id);
        return library.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/library")
    ResponseEntity<Library> createLibrary(@Valid @RequestBody Library library) throws URISyntaxException {
        log.info("Request to create library: {}", library);
        Library result = libraryRepository.save(library);
        return ResponseEntity.created(new URI("/api/library/" + result.getId()))
                .body(result);
    }

    @PutMapping("/library/{id}")
    ResponseEntity<Library> updateLibrary(@Valid @RequestBody Library library) {
        log.info("Request to update library: {}", library);
        Library result = libraryRepository.save(library);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/library/{id}")
    public ResponseEntity<?> deleteLibrary(@PathVariable Long id) {
        log.info("Request to delete library: {}", id);
        libraryRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }


}
