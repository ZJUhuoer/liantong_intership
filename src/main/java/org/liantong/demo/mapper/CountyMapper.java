package org.liantong.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.liantong.demo.entity.CountyEntity;
import org.liantong.demo.entity.ProvinceEntity;

import java.util.List;
import java.util.Map;

@Mapper
public interface CountyMapper extends BaseMapper<CountyEntity> {

    @Select("SELECT DISTINCT county, indicator FROM county")
    List<Map<String, String>> getDistinctCountyIndicator();

    @Select("SELECT DISTINCT county FROM county")
    List<String> getDistinctCountys();

    @Select("SELECT DISTINCT indicator FROM county")
    List<String> getDistinctIndicators();

    @Select("SELECT county, indicator, date, value FROM county WHERE county = #{county} AND indicator = #{indicator}")
    List<CountyEntity> getFilteredData(@Param("county") String county, @Param("indicator") String indicator);
}