package com.fmiunibuc.readhub.model.repositories;

import com.fmiunibuc.readhub.model.Book;
import com.fmiunibuc.readhub.model.BookCopy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookCopyRepository extends JpaRepository<BookCopy, Long> {
    BookCopy findByBookType(Book book);
}
