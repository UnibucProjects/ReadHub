package com.fmiunibuc.readhub.web;

import com.fmiunibuc.readhub.model.BookCopy;
import com.fmiunibuc.readhub.model.repositories.BookCopyRepository;
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
public class BookCopyController {
    private final Logger log = LoggerFactory.getLogger(BookCopyController.class);
    private BookCopyRepository bookCopyRepository;

    public BookCopyController(BookCopyRepository bookCopyRepository) {
        this.bookCopyRepository = bookCopyRepository;
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


}
