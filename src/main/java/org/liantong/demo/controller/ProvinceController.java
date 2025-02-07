package org.liantong.demo.controller;

import org.liantong.demo.entity.ProvinceEntity;
import org.liantong.demo.service.ProvinceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/province")
public class ProvinceController {

    @Autowired
    private ProvinceService provinceService;

    @GetMapping("/all")
    public List<ProvinceEntity> getAll(@RequestParam int page, @RequestParam int size) {
        return provinceService.getProvincePage(page, size);
    }

    @PostMapping("/add")
    public boolean add(@RequestBody ProvinceEntity entity) {
        return provinceService.save(entity);
    }

    @PutMapping("/update")
    public boolean update(@RequestBody ProvinceEntity entity) {
        return provinceService.updateById(entity);
    }

    @DeleteMapping("/delete/{id}")
    public boolean delete(@PathVariable Integer id) {
        return provinceService.removeById(id);
    }

    // 根据 ID 获取单条记录
    @GetMapping("/{id}")
    public ProvinceEntity getProvinceById(@PathVariable int id) {
        return provinceService.getProvinceById(id);
    }
}
