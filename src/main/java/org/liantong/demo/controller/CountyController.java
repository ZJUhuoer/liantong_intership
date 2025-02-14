package org.liantong.demo.controller;

import org.liantong.demo.entity.CountyEntity;
import org.liantong.demo.entity.ProvinceEntity;
import org.liantong.demo.service.CountyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/county")
public class CountyController {

    @Autowired
    private CountyService countyService;

    @GetMapping("/all")
    public List<CountyEntity> getAll() {
        return countyService.list();
    }

    @GetMapping("/distinctCounties")
    public List<String> getDistinctCounties() {
        return countyService.getDistinctCounties();
    }

    @GetMapping("/data")
    public List<CountyEntity> getFilteredData(
        @RequestParam String county, 
        @RequestParam String indicator
    ) {
        return countyService.getFilteredData(county, indicator);
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


    @GetMapping("/distinctCountys")
    public List<String> getDistinctCountys() {
        return countyService.getDistinctCountys();
    }

    @GetMapping("/distinctIndicators")
    public List<String> getDistinctIndicators() {
        return countyService.getDistinctIndicators();
    }

}