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

    @GetMapping("/distinctCities")
    public List<String> getDistinctCities() {
        return cityService.getDistinctCities();
    }

    @GetMapping("/data")
    public List<CityEntity> getFilteredData(
        @RequestParam String city, 
        @RequestParam String indicator
    ) {
        return cityService.getFilteredData(city, indicator);
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

    @GetMapping("/distinctCitys")
    public List<String> getDistinctCitys() {
        return cityService.getDistinctCitys();
    }

    @GetMapping("/distinctIndicators")
    public List<String> getDistinctIndicators() {
        return cityService.getDistinctIndicators();
    }

}