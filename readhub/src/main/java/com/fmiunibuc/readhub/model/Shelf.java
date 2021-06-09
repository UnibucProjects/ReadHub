package com.fmiunibuc.readhub.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;

import javax.persistence.*;
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
@JsonIdentityInfo(generator= ObjectIdGenerators.IntSequenceGenerator.class)
public class Shelf {
    @Id
    @GeneratedValue
    private Long id;
    @NonNull
    private String name;
    @OneToMany(mappedBy = "id", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnoreProperties("shelf")
    private Set<BookCopy> books;
    @ManyToOne(cascade=CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("shelfList")
    private Library library;

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
}
