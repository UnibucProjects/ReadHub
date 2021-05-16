package com.fmiunibuc.readhub.model;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name="Books")
public class Book {
    @Id
    @GeneratedValue
    private Long id;
    @NonNull
    private String name;
    @NonNull
    private String author;
    @NonNull
    private int pages;
    @OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL)
    private List<BookCopy> copyList;
}
