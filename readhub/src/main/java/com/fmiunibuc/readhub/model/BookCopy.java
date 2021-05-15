package com.fmiunibuc.readhub.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name="Book_Copy")
public class BookCopy {
    @GeneratedValue
    @Id
    private Long id;
    private String status;
    private Long pagesRead;
    private Integer rating;
    @ManyToOne(cascade= CascadeType.PERSIST)
    private Book bookType;
    @ManyToOne(cascade=CascadeType.PERSIST)
    private Shelf shelf;
}
