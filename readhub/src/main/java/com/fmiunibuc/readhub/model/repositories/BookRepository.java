package com.fmiunibuc.readhub.model.repositories;

import com.fmiunibuc.readhub.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    Book findByName(String name);
}
