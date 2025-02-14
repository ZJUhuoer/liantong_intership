package org.liantong.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.liantong.demo.entity.CityEntity;
import org.liantong.demo.entity.ProvinceEntity;

import java.util.List;
import java.util.Map;

@Mapper
public interface CityMapper extends BaseMapper<CityEntity> {

    @Select("SELECT DISTINCT city FROM city")
    List<String> getDistinctCities();

    @Select("SELECT city, indicator, date, value FROM city WHERE city = #{city} AND indicator = #{indicator}")
    List<CityEntity> getFilteredData(@Param("city") String city, @Param("indicator") String indicator);

    @Select("SELECT DISTINCT city, indicator FROM city")
    List<Map<String, String>> getDistinctCityIndicator();

    @Select("SELECT DISTINCT city FROM city")
    List<String> getDistinctCitys();

    @Select("SELECT DISTINCT indicator FROM city")
    List<String> getDistinctIndicators();

}