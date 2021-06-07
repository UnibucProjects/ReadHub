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
@Table(name="library")
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
    @OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL)
    @JsonIgnoreProperties("library")
    private Set<Shelf> shelfList;

}
