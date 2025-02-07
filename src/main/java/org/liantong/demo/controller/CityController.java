package org.liantong.demo.controller;

import org.liantong.demo.entity.CityEntity;
import org.liantong.demo.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/city")
public class CityController {

    @Autowired
    private CityService cityService;

    @GetMapping("/all")
    public List<CityEntity> getAll() {
        return cityService.list();
    }

    @PostMapping("/add")
    public boolean add(@RequestBody CityEntity entity) {
        return cityService.save(entity);
    }

    @PutMapping("/update")
    public boolean update(@RequestBody CityEntity entity) {
        return cityService.updateById(entity);
    }

    @DeleteMapping("/delete/{id}")
    public boolean delete(@PathVariable Integer id) {
        return cityService.removeById(id);
    }
}