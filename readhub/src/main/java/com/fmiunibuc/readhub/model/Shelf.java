package com.fmiunibuc.readhub.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.util.Set;


@Data
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name="Shelf")
public class Shelf {
    @Id
    @GeneratedValue
    private Long id;
    @NonNull
    private String name;
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnoreProperties("shelf")
    private Set<BookCopy> books;
    @ManyToOne(cascade=CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("shelfList")
    private Library library;
}
