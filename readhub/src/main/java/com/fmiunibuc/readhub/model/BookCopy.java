package com.fmiunibuc.readhub.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;

import javax.persistence.*;
import java.util.List;
import java.util.Optional;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name="Book_Copy")
public class BookCopy {
    @GeneratedValue
    @Id
    private Long id;
    private String status;
    private Long pagesRead;
    private Integer rating;
    @OneToMany(mappedBy = "bookCopyType", fetch = FetchType.LAZY, cascade=CascadeType.ALL)
    @JsonIgnoreProperties("bookCopyType")
    private List<Note> noteList;
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties("copyList")
    private Book bookType;
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties("books")
    private Shelf shelf;

    public BookCopy(Book book, Shelf shelf, long pages, int rating, String to_read) {
        this.bookType = book;
        this.shelf = shelf;
        this.pagesRead = pages;
        this.rating = rating;
        this.status = to_read;
    }

    public void setNoteList(List<Note> noteList) {
        this.noteList = noteList;
        for (Note child : this.noteList) {
            child.setBookCopyType(this);
        }
    }
}
