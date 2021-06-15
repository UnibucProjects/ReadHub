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
@Table(name="note")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@JsonIdentityInfo(generator= ObjectIdGenerators.IntSequenceGenerator.class, property="@id")

public class Note {
    @GeneratedValue
    @Id
    @Column(name = "id")
    private Long id;
    @NonNull
    private String text;
    private String title;
    @NonNull
    private int pageNumber;
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties("noteList")
    private BookCopy bookCopyType;

    public Note(BookCopy bookCopyType, String title, String text, int pageNumber) {
        this.bookCopyType = bookCopyType;
        this.title = title;
        this.text = text;
        this.pageNumber = pageNumber;
    }
}
