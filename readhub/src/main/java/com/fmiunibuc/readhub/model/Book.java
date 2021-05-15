package com.fmiunibuc.readhub.model;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    @NotNull
    private String name;
    private String author;
    @OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL)
    private List<BookCopy> copyList;
}
