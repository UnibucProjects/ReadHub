package com.fmiunibuc.readhub.model;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User {
    @Id
    private Long id;
    @NotNull
    private String name;
    private String email;
    @ManyToMany(fetch = FetchType.EAGER)
    private List<Library> libraryList;
}
