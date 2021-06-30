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

@Entity
@Table(name = "plate")
public class Plate {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;
    private String description;
    private double prive;

    @OneToOne(mappedBy = "plate")
    private Amount amount;

    @ManyToOne
    @JoinColumn(name = "idMenu")
    private Menu menu;
    
    @ManyToOne
    @JoinColumn(name = "idCategory")
    private Category category;

    @OneToMany(mappedBy = "plate")
    private List<Additional> additionals;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrive() {
        return prive;
    }

    public void setPrive(double prive) {
        this.prive = prive;
    }

    public Amount getAmount() {
        return amount;
    }

    public void setAmount(Amount amount) {
        this.amount = amount;
    }

    public Menu getMenu() {
        return menu;
    }

    public void setMenu(Menu menu) {
        this.menu = menu;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public List<Additional> getAdditionals() {
        return additionals;
    }

    public void setAdditionals(List<Additional> additionals) {
        this.additionals = additionals;
    }

    

}
