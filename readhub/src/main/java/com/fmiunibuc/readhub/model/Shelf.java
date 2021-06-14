package com.fmiunibuc.readhub.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;


@Data
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name="Shelf")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@JsonIdentityInfo(generator= ObjectIdGenerators.IntSequenceGenerator.class, property="@id")
public class Shelf {
    @Id
    @GeneratedValue
    private Long id;
    @NonNull
    private String name;
    @OneToMany(mappedBy = "shelf", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnoreProperties("shelf")
    private Set<BookCopy> books;
    @ManyToOne(cascade=CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("shelfList")
    private Library library;

    public Shelf(@NonNull String name, Library library) {
        this.name = name;
        this.books = new HashSet<>();
        this.library = library;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Shelf shelf = (Shelf) o;
        return Objects.equals(id, shelf.id) && Objects.equals(name, shelf.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }

    public void setBooks(Set<BookCopy> copyList) {
        this.books = copyList;
        for(BookCopy child: this.books) {
            child.setShelf(this);
        }
    }
}
