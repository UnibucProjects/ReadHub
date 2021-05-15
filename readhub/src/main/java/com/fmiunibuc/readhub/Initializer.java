package com.fmiunibuc.readhub;

import com.fmiunibuc.readhub.model.*;
import com.fmiunibuc.readhub.model.repositories.LibraryRepository;
import com.fmiunibuc.readhub.model.repositories.ShelfRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;


import java.util.Collections;
import java.util.stream.Stream;

/*
@Component
public class Initializer implements CommandLineRunner {
    private final LibraryRepository libraryRepository;
    private final ShelfRepository shelfRepository;

    public Initializer(LibraryRepository repository, ShelfRepository shelfRepository) {
        this.libraryRepository = repository;
        this.shelfRepository = shelfRepository;
    }

    @Override
    public void run(String ... strings){
        Stream.of("Diana's math books", "Ioana's math books", "Delia's math books", "Alex's math books",
                "Stefan's math books'").forEach(name -> shelfRepository.save(new Shelf(name)));
        Stream.of("Alex's Library", "Delia's library", "Diana's Library",  "Ioana's library",
                "Stefan's Library")
                .forEach(name -> libraryRepository.save(new Library(name)));
        Book algebraBook = Book.builder().name("Linear algebra done right").author("Sheldon Axler").build();
        Book geometryBook = Book.builder().name("Euclid's elements of geometry").author("Euclid").build();
        BookCopy algebraBookCopy = BookCopy.builder().bookType(algebraBook).build();
        BookCopy geometryBookCopy = BookCopy.builder().bookType(geometryBook).build();
        Shelf dianaShelf = shelfRepository.findByName("Diana's math books");
        Shelf ioanaShelf = shelfRepository.findByName("Ioana's math books");
        dianaShelf.setBooks(Collections.singleton(algebraBookCopy));
        ioanaShelf.setBooks(Collections.singleton(geometryBookCopy));
        shelfRepository.save(dianaShelf);
        shelfRepository.save(ioanaShelf);
        Library dianaLibrary = libraryRepository.findByName("Diana's Library"); //aici e NPE
        Library ioanaLibrary = libraryRepository.findByName("Ioana's library");
        dianaLibrary.setShelfList(Collections.singleton(dianaShelf));
        ioanaLibrary.setShelfList(Collections.singleton(ioanaShelf));
        libraryRepository.save(dianaLibrary);
        libraryRepository.save(ioanaLibrary);
        libraryRepository.findAll().forEach(System.out::println);
        shelfRepository.findAll().forEach(System.out::println);
    }
}
*/

