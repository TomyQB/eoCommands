package com.eo.back.services;

import java.util.ArrayList;
import java.util.List;

import com.eo.back.models.Category;
import com.eo.back.repositories.CategoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryServices {
    
    @Autowired
    private CategoryRepository repository;

    public List<Category> getAllCategories(long id) {
        return repository.getCategoryByRestaurantId(id);
        // List<String> categoriesList = getNames(repository.findAll());
        // return categoriesList;
    }

    private List<String> getNames(List<Category> categories) {
        List<String> categoriesNames = new ArrayList<String>();
        for (Category c : categories) {
            categoriesNames.add(c.getName());
        }
        return categoriesNames;
    }
}
