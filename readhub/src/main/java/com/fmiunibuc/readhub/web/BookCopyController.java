package com.fmiunibuc.readhub.web;

import com.fmiunibuc.readhub.model.Book;
import com.fmiunibuc.readhub.model.BookCopy;
import com.fmiunibuc.readhub.model.Shelf;
import com.fmiunibuc.readhub.model.User;
import com.fmiunibuc.readhub.model.repositories.BookCopyRepository;
import com.fmiunibuc.readhub.model.repositories.ShelfRepository;
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
import java.util.Set;

@RestController
@RequestMapping("/api")
public class BookCopyController {
    private final Logger log = LoggerFactory.getLogger(BookCopyController.class);
    private BookCopyRepository bookCopyRepository;
    private ShelfRepository shelfRepository;

    public BookCopyController(BookCopyRepository bookCopyRepository, ShelfRepository shelfRepository) {
        this.bookCopyRepository = bookCopyRepository;
        this.shelfRepository = shelfRepository;
    }

    @GetMapping("/bookCopies")
    Collection<BookCopy> bookCopies(){
        return bookCopyRepository.findAll();
    }

    @GetMapping("/myBookCopy/{id}")
    ResponseEntity<?> getBookCopy(@PathVariable Long id) {
        Optional<BookCopy> bookCopy = bookCopyRepository.findById(id);
        return bookCopy.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/bookCopy")
    ResponseEntity<BookCopy> createBookCopy(@Valid @RequestBody BookCopy bookCopy) throws URISyntaxException {
        log.info("Request to create book copy: {}", bookCopy);
        BookCopy result = bookCopyRepository.save(bookCopy);
        return ResponseEntity.created(new URI("/api/bookCopy/" + result.getId()))
                .body(result);
    }

    @PutMapping("/bookCopy/{id}")
    ResponseEntity<BookCopy> updateBookCopy(@Valid @RequestBody BookCopy bookCopy) {
        log.info("Request to update book copy: {}", bookCopy);
        BookCopy result = bookCopyRepository.save(bookCopy);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/bookCopy/{id}")
    public ResponseEntity<?> deleteBookCopy(@PathVariable Long id) {
        log.info("Request to delete book copy: {}", id);
        bookCopyRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/moveBookToShelf/{bookCopyId}/{shelfId}")
    ResponseEntity<BookCopy> addBookToShelf(@PathVariable Long bookCopyId, @PathVariable Long shelfId) throws URISyntaxException {
        Optional<BookCopy> bookCopy = bookCopyRepository.findById(bookCopyId);
        Optional<Shelf> shelf = shelfRepository.findById(shelfId);
        BookCopy result = null;
        if(bookCopy.isPresent() && shelf.isPresent()) {
           bookCopy.get().setShelf(shelf.get());
           shelf.get().getBooks().add(bookCopy.get());
           result = bookCopyRepository.save(bookCopy.get());
           shelfRepository.save(shelf.get());
        }
        return ResponseEntity.ok().body(result);
    }


}
