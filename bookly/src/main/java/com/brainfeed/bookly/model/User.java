package com.brainfeed.bookly.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.NaturalId;

import javax.persistence.GenerationType;

@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userid;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "username", nullable = false, unique = true)
    private String username;

    public User() {
    }

    public User(Long userid, String name, String email, String username) {
        this.userid = userid;
        this.name = name;
        this.email = email;
        this.username = username;
    }

    @Override
    public String toString() {
        return "User [userid=" + userid + ", name=" + name + ", email=" + email + ", username=" + username + "]";
    }

    public void setUserId(Long userid) {
        this.userid = userid;
    }

    public void setName(String name) {
        this.name = name;
    }

    @NaturalId
    public void setEmail(String email) {
        this.email = email;
    }

    @NaturalId
    public void setUsername(String username) {
        this.username = username;
    }

    public Long getUserId() {
        return userid;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getUsername() {
        return username;
    }

}
