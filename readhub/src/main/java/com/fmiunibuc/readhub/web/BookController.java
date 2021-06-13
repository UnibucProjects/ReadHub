package com.fmiunibuc.readhub.web;

import com.fmiunibuc.readhub.model.Book;
import com.fmiunibuc.readhub.model.BookCopy;
import com.fmiunibuc.readhub.model.Shelf;
import com.fmiunibuc.readhub.model.User;
import com.fmiunibuc.readhub.model.repositories.BookCopyRepository;
import com.fmiunibuc.readhub.model.repositories.BookRepository;
import com.fmiunibuc.readhub.model.repositories.UserRepository;
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
public class BookController {
    private final Logger log = LoggerFactory.getLogger(BookController.class);
    private BookRepository bookRepository;
    private UserRepository userRepository;
    private BookCopyRepository bookCopyRepository;

    public BookController(BookRepository bookRepository, UserRepository userRepository, BookCopyRepository bookCopyRepository) {
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
        this.bookCopyRepository = bookCopyRepository;
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

    @PostMapping("/addBookToShelf/{userId}/{bookId}")
    ResponseEntity<BookCopy> addBookToShelf(@PathVariable Long userId, @PathVariable Long bookId) throws URISyntaxException {
        Optional<User> user = userRepository.findById(userId);
        Optional<Book> book = bookRepository.findById(bookId);
        BookCopy bookCopy = null;
        BookCopy result = null;
        if(user.isPresent() && book.isPresent()) {
            Set<Shelf> shelves = user.get().getLibrary().getShelfList();
            for(Shelf shelf : shelves)
            {
                if(shelf.getName().equals("To Read"))
                {
                    Set<BookCopy> bookCopies = shelf.getBooks();
                    bookCopy = new BookCopy(book.get(), shelf, 0L, 0, "To Read");
                    bookCopies.add(bookCopy);
                    result = bookCopyRepository.save(bookCopy);
                }
            }
        }
        return ResponseEntity.ok().body(result);
    }


}
