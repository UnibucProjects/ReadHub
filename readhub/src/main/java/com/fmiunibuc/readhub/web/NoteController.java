package com.fmiunibuc.readhub.web;

import com.fmiunibuc.readhub.model.BookCopy;
import com.fmiunibuc.readhub.model.Note;
import com.fmiunibuc.readhub.model.repositories.BookCopyRepository;
import com.fmiunibuc.readhub.model.repositories.NoteRepository;
import com.fmiunibuc.readhub.model.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;
import java.util.Optional;


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

    @PostMapping("/note/{id}")
    ResponseEntity<Note> createNote(@Valid @RequestBody Note note, @PathVariable Long id) {
        Optional<BookCopy> bookCopy = bookCopyRepository.findById(id);
        if (bookCopy.isPresent()) {
            bookCopy.get().getNoteList().add(note);
            note.setBookCopyType(bookCopy.get());
        }
        Note result = noteRepository.save(note);
        return ResponseEntity.ok().body(result);
    }
}
