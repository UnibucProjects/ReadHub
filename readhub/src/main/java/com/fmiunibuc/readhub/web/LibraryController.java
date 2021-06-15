package com.fmiunibuc.readhub.web;

import com.fmiunibuc.readhub.model.BookCopy;
import com.fmiunibuc.readhub.model.Library;
import com.fmiunibuc.readhub.model.Shelf;
import com.fmiunibuc.readhub.model.User;
import com.fmiunibuc.readhub.model.repositories.LibraryRepository;
import com.fmiunibuc.readhub.model.repositories.UserRepository;
import com.fmiunibuc.readhub.service.LoggerService;
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
    private final LoggerService loggerService = new LoggerService();
    private LibraryRepository libraryRepository;
    private UserRepository userRepository;

    public LibraryController(LibraryRepository libraryRepository, UserRepository userRepository) {
        this.libraryRepository = libraryRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/libraries")
    Collection<Library> libraries(){
        loggerService.info("Request to get all libraries");
        return libraryRepository.findAll();
    }

    @GetMapping("/librariesOwners")
    Collection<String> librariesOwners() {
        Collection<Library> libraries = libraryRepository.findAll();
        Collection<String> owners = new ArrayList<>();

        for(Library library : libraries) {
            String name = library.getOwner().getUsername();
            owners.add(name);
        }

        return owners;
    }

    @GetMapping("/myStats/{id}")
    Collection<BookCopy> getStats(@PathVariable Long id){
        loggerService.info("Request to get stats of user " + id);
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
        loggerService.info("Request to get library of current user");
        Optional<User> user = userRepository.findById(id);
        return user.map(response -> ResponseEntity.ok().body(response.getLibrary().getShelfList()))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    @GetMapping("/library/{id}")
    ResponseEntity<?> getLibrary(@PathVariable Long id) {
        loggerService.info("Request to get library " + id);
        Optional<Library> library = libraryRepository.findById(id);
        return library.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/library")
    ResponseEntity<Library> createLibrary(@Valid @RequestBody Library library) throws URISyntaxException {
        loggerService.info("Request to create library");
        Library result = libraryRepository.save(library);
        return ResponseEntity.created(new URI("/api/library/" + result.getId()))
                .body(result);
    }

    @PutMapping("/library/{id}")
    ResponseEntity<Library> updateLibrary(@Valid @RequestBody Library library) {
        loggerService.info("Request to update library " + library.getId());
        Library result = libraryRepository.save(library);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/library/{id}")
    public ResponseEntity<?> deleteLibrary(@PathVariable Long id) {
        loggerService.info("Request to delete library " + id);
        libraryRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }


}
