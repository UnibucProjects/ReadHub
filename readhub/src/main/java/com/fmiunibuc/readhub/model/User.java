package com.fmiunibuc.readhub.model;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="User")
public class User {
    @Id
    private Long id;
    @NotNull
    private String name;
    private String email;
    @OneToOne(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
    private Library library;
}
