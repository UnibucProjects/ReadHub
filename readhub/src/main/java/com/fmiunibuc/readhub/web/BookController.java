package com.fmiunibuc.readhub.web;

import com.fmiunibuc.readhub.model.Book;
import com.fmiunibuc.readhub.model.BookCopy;
import com.fmiunibuc.readhub.model.Shelf;
import com.fmiunibuc.readhub.model.User;
import com.fmiunibuc.readhub.model.repositories.BookCopyRepository;
import com.fmiunibuc.readhub.model.repositories.BookRepository;
import com.fmiunibuc.readhub.model.repositories.UserRepository;
import com.fmiunibuc.readhub.service.LoggerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api")
public class BookController {
    private final LoggerService loggerService = new LoggerService();
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
        loggerService.info("Request to get all books");
        return bookRepository.findAll();
    }

    @GetMapping("/books/ratings")
    Collection<Double> ratings() {
        Collection<Book> books = bookRepository.findAll();
        Collection<Double> ratings = new ArrayList<>();

        for(Book book: books) {
            double rating = 0.0;
            int rates = 0;

            for(BookCopy bookCopy : book.getCopyList()) {
                if(bookCopy.getRating() != 0) {
                    rating += bookCopy.getRating();
                    rates++;
                }
            }

            if(rates > 0) {
                ratings.add(rating / rates);
            } else {
                ratings.add(null);
            }
        }

        return ratings;
    }

    @GetMapping("/book/{id}")
    ResponseEntity<?> getBook(@PathVariable Long id) {
        loggerService.info("Request to get book " + id);
        Optional<Book> book = bookRepository.findById(id);
        return book.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/book")
    ResponseEntity<Book> createBook(@Valid @RequestBody Book book) throws URISyntaxException {
        loggerService.info("Request to create book");
        Book result = bookRepository.save(book);
        return ResponseEntity.created(new URI("/api/book/" + result.getId()))
                .body(result);
    }

    @PutMapping("/book/{id}")
    ResponseEntity<Book> updateBook(@Valid @RequestBody Book book) {
        loggerService.info("Request to update book " + book.getId());
        Book result = bookRepository.save(book);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/book/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable Long id) {
        loggerService.info("Request to delete book " + id);
        bookRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/addBookToShelf/{userId}/{bookId}")
    ResponseEntity<BookCopy> addBookToShelf(@PathVariable Long userId, @PathVariable Long bookId) throws URISyntaxException {
        loggerService.info("Request to add book " + bookId + " to library of user " + userId);
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
