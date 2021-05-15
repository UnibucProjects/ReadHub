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
@Table(name="Library")
public class Library {
    @Id
    @GeneratedValue
    private Long id;
    @NonNull
    private String name;
    @OneToOne(cascade=CascadeType.ALL)
    private User owner;
    @OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL)
    private Set<Shelf> shelfList;

}
