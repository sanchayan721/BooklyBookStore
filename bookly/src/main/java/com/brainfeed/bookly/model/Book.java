package com.brainfeed.bookly.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.GenerationType;

@Entity
@Table(name = "books")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude="authors")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_id", updatable = false, nullable = false)
    private Long bookId;

    @Column(name = "title")
    private String title;

    @Column(name = "volume")
    private int volume;

    @Column(name = "price")
    private Double price;

    @Column(name = "publisher")
    private String publisher;

    @Column(name = "pubdate")
    private String pubdate;

    @Column(name = "description", length = 5000)
    private String description;

    @Column(name = "genere")
    private String genere;

    @Column(name = "binding")
    private String binding;

    @Column(name = "language")
    private String language;

    @Column(name = "cover_image_path", length = 500)
    private String coverImagePath;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinTable(name = "book_author", 
        joinColumns = { 
            @JoinColumn(name = "book_id", referencedColumnName = "book_id") 
        }, 
        inverseJoinColumns = { 
            @JoinColumn(name = "author_id", referencedColumnName = "author_id") 
        }
    )
    @JsonIgnoreProperties("books")
    private List<Author> authors = new ArrayList<>();

    public void addAuthor(Author author) {
        authors.add(author);
        author.getBooks().add(this);
    }

    public void removeAuthor(Author author) {
        authors.remove(author);
        author.getBooks().remove(this);
    }
}
