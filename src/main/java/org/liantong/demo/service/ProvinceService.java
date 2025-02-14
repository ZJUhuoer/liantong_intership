package org.liantong.demo.service;


import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.liantong.demo.entity.ProvinceEntity;
import org.liantong.demo.mapper.ProvinceMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ProvinceService extends ServiceImpl<ProvinceMapper, ProvinceEntity> {

    @Autowired
    private ProvinceMapper provinceMapper;


    public List<ProvinceEntity> getProvincePage(int pageNum, int pageSize) {
        Page<ProvinceEntity> page = new Page<>(pageNum, pageSize);
        return baseMapper.selectPage(page, null).getRecords(); // 不传条件返回所有数据
    }

    public ProvinceEntity getProvinceById(int id) {
        // 使用 MyBatis-Plus 提供的查询方法，根据 ID 查询单条记录
        return baseMapper.selectById(id);
    }

    public List<Map<String, String>> getDistinctProvinceIndicator() {
        return provinceMapper.getDistinctProvinceIndicator();
    }

    public List<String> getDistinctProvinces() {
        return provinceMapper.getDistinctProvinces();
    }

    public List<String> getDistinctIndicators() {
        return provinceMapper.getDistinctIndicators();
    }

    public List<ProvinceEntity> getFilteredData(String province, String indicator) {
        return provinceMapper.getFilteredData(province, indicator);
    }
}