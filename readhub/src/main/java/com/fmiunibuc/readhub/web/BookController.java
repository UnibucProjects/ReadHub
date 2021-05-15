package com.fmiunibuc.readhub.web;

import com.fmiunibuc.readhub.model.Book;
import com.fmiunibuc.readhub.model.repositories.BookRepository;
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
public class BookController {
    private final Logger log = LoggerFactory.getLogger(BookController.class);
    private BookRepository bookRepository;

    public BookController(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @GetMapping("/books")
    Collection<Book> books(){
        return bookRepository.findAll();
    }

    @GetMapping("/book/{id}")
    ResponseEntity<?> getBook(@PathVariable Long id) {
        Optional<Book> book = bookRepository.findById(id);
        return book.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/book")
    ResponseEntity<Book> createBook(@Valid @RequestBody Book book) throws URISyntaxException {
        log.info("Request to create book: {}", book);
        Book result = bookRepository.save(book);
        return ResponseEntity.created(new URI("/api/book/" + result.getId()))
                .body(result);
    }

    @PutMapping("/book/{id}")
    ResponseEntity<Book> updateBook(@Valid @RequestBody Book book) {
        log.info("Request to update book: {}", book);
        Book result = bookRepository.save(book);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/book/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable Long id) {
        log.info("Request to delete book: {}", id);
        bookRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }


}
