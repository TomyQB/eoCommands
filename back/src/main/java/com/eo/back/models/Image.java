package com.eo.back.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "image")
@Setter
@Getter
public class Image {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String image;
    private String category;
    
}
