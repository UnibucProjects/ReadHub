package com.fmiunibuc.readhub.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;

import javax.persistence.*;
import java.util.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name="library")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@JsonIdentityInfo(generator= ObjectIdGenerators.IntSequenceGenerator.class, property="@id")
public class Library {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;
    @NonNull
    private String name;
    @OneToOne(mappedBy = "library", fetch = FetchType.LAZY)
    @JsonIgnoreProperties("library")
    private User owner;
    @OneToMany(mappedBy = "library", fetch = FetchType.EAGER, cascade=CascadeType.ALL)
    private Set<Shelf> shelfList;

    public Library(@NonNull String name) {
        this.name = name;
        Shelf toRead = new Shelf("To Read", this),
                reading = new Shelf("Reading", this),
                read = new Shelf("Read", this);
        List<Shelf> shelves = new ArrayList<>();
        shelves.add(toRead);
        shelves.add(reading);
        shelves.add(read);
        this.shelfList = new HashSet<>(shelves);
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Library library = (Library) o;
        return Objects.equals(id, library.id) && Objects.equals(name, library.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }
}
