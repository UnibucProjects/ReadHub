package com.fmiunibuc.readhub.model.repositories;

import com.fmiunibuc.readhub.model.BookCopy;
import com.fmiunibuc.readhub.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NoteRepository extends JpaRepository<Note, Long> {
    //List<Note> findByBookCopyType(Optional<BookCopy> bookCopy);
    Note findByTitle(String title);
}
