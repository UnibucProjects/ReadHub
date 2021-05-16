package com.fmiunibuc.readhub.web;

import com.fmiunibuc.readhub.model.Library;
import com.fmiunibuc.readhub.model.Shelf;
import com.fmiunibuc.readhub.model.repositories.LibraryRepository;
import com.fmiunibuc.readhub.model.repositories.ShelfRepository;
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


@RestController
@RequestMapping("/api")
public class ShelfController {
    private final Logger log = LoggerFactory.getLogger(ShelfController.class);
    private ShelfRepository shelfRepository;

    public ShelfController(ShelfRepository shelfRepository) {
        this.shelfRepository = shelfRepository;
    }

    @GetMapping("/shelves")
    Collection<Shelf> shelves(){
        return shelfRepository.findAll();
    }

    @GetMapping("/shelf/{id}")
    ResponseEntity<?> getShelf(@PathVariable Long id) {
        Optional<Shelf> shelf = shelfRepository.findById(id);
        return shelf.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/shelf")
    ResponseEntity<Shelf> createLibrary(@Valid @RequestBody Shelf shelf) throws URISyntaxException {
        log.info("Request to create shelf: {}", shelf);
        Shelf result = shelfRepository.save(shelf);
        return ResponseEntity.created(new URI("/api/shelf/" + result.getId()))
                .body(result);
    }

    @PutMapping("/shelf/{id}")
    ResponseEntity<Shelf> updateShelf(@Valid @RequestBody Shelf shelf) {
        log.info("Request to update shelf: {}", shelf);
        Shelf result = shelfRepository.save(shelf);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/shelf/{id}")
    public ResponseEntity<?> deleteShelf(@PathVariable Long id) {
        log.info("Request to delete shelf: {}", id);
        shelfRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
