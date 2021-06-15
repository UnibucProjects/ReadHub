package com.fmiunibuc.readhub.web;

import com.fasterxml.jackson.annotation.OptBoolean;
import com.fmiunibuc.readhub.model.BookCopy;
import com.fmiunibuc.readhub.model.Note;
import com.fmiunibuc.readhub.model.repositories.BookCopyRepository;
import com.fmiunibuc.readhub.model.repositories.NoteRepository;
import com.fmiunibuc.readhub.model.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.*;


@RestController
@RequestMapping("/api")
public class NoteController {
    private NoteRepository noteRepository;
    private BookCopyRepository bookCopyRepository;
    private UserRepository userRepository;


    public NoteController(NoteRepository noteRepository, BookCopyRepository bookCopyRepository, UserRepository userRepository) {
        this.noteRepository = noteRepository;
        this.bookCopyRepository = bookCopyRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/myNotes/{id}")
    Collection<Note> myNotes(@PathVariable Long id) {
        /*Optional<BookCopy> bookCopy = bookCopyRepository.findById(id);
        return noteRepository.findByBookCopyType(bookCopy);*/
        Optional<BookCopy> bookCopy = bookCopyRepository.findById(id);
        if (bookCopy.isPresent()) {
            return bookCopy.get().getNoteList();
        }
        return null;
        //return noteRepository.findAll();
    }

    @GetMapping("/note/{id}")
    ResponseEntity<?> getNote(@PathVariable Long id) {
        Optional<Note> note = noteRepository.findById(id);
        return note.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /*@PostMapping("/note")
    ResponseEntity<Note> createNote(@Valid @RequestBody Note note) throws URISyntaxException {
        Note result = noteRepository.save(note);
        return ResponseEntity.created(new URI("/api/notes/" + result.getId()))
                .body(result);
    }*/

    @PostMapping("/note/{id1}/{id2}")
    ResponseEntity<Note> createNote(@Valid @RequestBody Note note, @PathVariable Long id1, @PathVariable Long id2) {
        Optional<BookCopy> bookCopy = bookCopyRepository.findById(id2);
        Note result = noteRepository.save(note);
        if (bookCopy.isPresent()) {
            bookCopy.get().getNoteList().add(note);
            note.setBookCopyType(bookCopy.get());
        }
        return ResponseEntity.ok().body(result);
    }
}
