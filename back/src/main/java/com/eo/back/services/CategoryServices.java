package com.eo.back.services;

import java.util.List;

import com.eo.back.models.Category;
import com.eo.back.repositories.CategoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryServices {
    
    @Autowired
    private CategoryRepository repository;

    public List<Category> getAllCategories(String restaurantName) {
        return repository.getCategoryByRestaurantNameOrderByName(restaurantName);
    }

    public Category getCategoryById(long id) {
        return repository.getById(id);
    }

    public void saveCategory(Category category) {
        repository.save(category);
    }

    public void deleteCategory(long id) {
        repository.deleteById(id);
    }
}
