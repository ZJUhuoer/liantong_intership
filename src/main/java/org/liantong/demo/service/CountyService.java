package org.liantong.demo.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.liantong.demo.entity.CountyEntity;
import org.liantong.demo.entity.ProvinceEntity;
import org.liantong.demo.mapper.CountyMapper;
import org.liantong.demo.mapper.ProvinceMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountyService extends ServiceImpl<CountyMapper, CountyEntity> {

    @Autowired
    private CountyMapper countyMapper;


    public List<String> getDistinctCounties() {
        QueryWrapper<CountyEntity> queryWrapper = new QueryWrapper<>();
        queryWrapper.select("DISTINCT county");
        return listObjs(queryWrapper, Object::toString);
    }

    public List<CountyEntity> getFilteredData(String county, String indicator) {
        QueryWrapper<CountyEntity> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("county", county)
                    .eq("indicator", indicator);
        return list(queryWrapper);
    }

    public List<String> getDistinctCountys() {
        return countyMapper.getDistinctCountys();
    }

    public List<String> getDistinctIndicators() {
        return countyMapper.getDistinctIndicators();
    }


}