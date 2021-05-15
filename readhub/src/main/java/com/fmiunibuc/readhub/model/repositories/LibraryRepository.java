package com.fmiunibuc.readhub.model.repositories;

import com.fmiunibuc.readhub.model.Library;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LibraryRepository extends JpaRepository<Library, Long> {
    Library findByName(String name);
}
