package com.fmiunibuc.readhub.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="User")
public class User {
    @Id
    private Long id;
    @NonNull
    private String name;
    private String email;
    @OneToOne(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
    private Library library;
}
