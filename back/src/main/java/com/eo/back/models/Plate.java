package com.eo.back.models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.springframework.data.relational.core.mapping.Embedded.Nullable;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "plate")
@Setter
@Getter
public class Plate {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;
    private String description;
    private double price;
    @Nullable
    private boolean drink;

    @OneToOne(mappedBy = "plate")
    @JsonIgnore
    private Amount amount;
    
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "idCategory")
    private Category category;

    @OneToMany(mappedBy = "plate")
    private List<Additional> additionals;

    @Override
    public String toString() {
        return "Plate [additionals=" + additionals + ", amount=" + amount + ", category=" + category + ", description="
                + description + ", id=" + id + ", name=" + name + ", price=" + price + "]";
    }

    
}
