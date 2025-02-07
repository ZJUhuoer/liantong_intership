package org.liantong.demo.controller;

import org.liantong.demo.entity.CountyEntity;
import org.liantong.demo.service.CountyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/county")
public class CountyController {

    @Autowired
    private CountyService countyService;

    @GetMapping("/all")
    public List<CountyEntity> getAll() {
        return countyService.list();
    }

    @PostMapping("/add")
    public boolean add(@RequestBody CountyEntity entity) {
        return countyService.save(entity);
    }

    @PutMapping("/update")
    public boolean update(@RequestBody CountyEntity entity) {
        return countyService.updateById(entity);
    }

    @DeleteMapping("/delete/{id}")
    public boolean delete(@PathVariable Integer id) {
        return countyService.removeById(id);
    }
}
