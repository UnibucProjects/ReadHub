package com.fmiunibuc.readhub.model;

import lombok.*;

import javax.persistence.*;
import java.util.Set;


@Data
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Shelf {
    @Id
    @GeneratedValue
    private Long id;
    @NonNull
    private String name;
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<BookCopy> books;
    @ManyToOne(cascade=CascadeType.PERSIST)
    private Library library;
}
