package com.fmiunibuc.readhub.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
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
    @OneToMany(mappedBy = "bookType", fetch = FetchType.LAZY, cascade=CascadeType.ALL)
    @JsonIgnoreProperties("bookType")
    private List<BookCopy> copyList;

    public void setCopyList(List<BookCopy> copyList) {
        this.copyList = copyList;
        for(BookCopy child: this.copyList) {
            child.setBookType(this);
        }
    }
}
// TODO: 15.06.2021 cate pagini am citit(din reading)/total pag din toata libraria