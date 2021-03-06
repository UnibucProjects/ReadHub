package com.fmiunibuc.readhub.model.repositories;

import com.fmiunibuc.readhub.model.Shelf;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShelfRepository extends JpaRepository<Shelf, Long> {
    Shelf findByName(String name);
}
