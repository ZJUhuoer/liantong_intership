package org.liantong.demo.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.liantong.demo.entity.CityEntity;
import org.liantong.demo.entity.ProvinceEntity;
import org.liantong.demo.mapper.CityMapper;
import org.liantong.demo.mapper.ProvinceMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CityService extends ServiceImpl<CityMapper, CityEntity> {

    @Autowired
    private CityMapper cityMapper;

    public List<String> getDistinctCities() {
        QueryWrapper<CityEntity> queryWrapper = new QueryWrapper<>();
        queryWrapper.select("DISTINCT city");
        return listObjs(queryWrapper, Object::toString);
    }

    public List<CityEntity> getFilteredData(String city, String indicator) {
        QueryWrapper<CityEntity> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("city", city)
                    .eq("indicator", indicator);
        return list(queryWrapper);
    }


    public List<Map<String, String>> getDistinctCityIndicator() {
        return cityMapper.getDistinctCityIndicator();
    }

    public List<String> getDistinctCitys() {
        return cityMapper.getDistinctCitys();
    }

    public List<String> getDistinctIndicators() {
        return cityMapper.getDistinctIndicators();
    }

}