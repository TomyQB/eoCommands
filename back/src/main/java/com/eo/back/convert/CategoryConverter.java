package com.eo.back.convert;

import com.eo.back.dto.CategoryDTO;
import com.eo.back.models.Category;
import com.eo.back.services.RestaurantServices;

import org.springframework.beans.factory.annotation.Autowire;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryConverter extends AbstractConverter<Category, CategoryDTO> {

    @Autowired
    private RestaurantServices restaurantServices;

    @Override
    public Category fromDTO(CategoryDTO dto) {
        Category category = new Category();

        category.setName(dto.getName());
        category.setRestaurant(restaurantServices.getRestaurantById(dto.getRestaurant()));

        return category;
    }

    @Override
    public CategoryDTO toDTO(Category entity) {
        // TODO Auto-generated method stub
        return null;
    }
    

}
