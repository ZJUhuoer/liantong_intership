package org.liantong.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.liantong.demo.entity.ProvinceEntity;

import java.util.List;
import java.util.Map;

@Mapper
public interface ProvinceMapper extends BaseMapper<ProvinceEntity> {
    @Select("SELECT DISTINCT province, indicator FROM province")
    List<Map<String, String>> getDistinctProvinceIndicator();

    @Select("SELECT DISTINCT province FROM province")
    List<String> getDistinctProvinces();

    @Select("SELECT DISTINCT indicator FROM province")
    List<String> getDistinctIndicators();

    @Select("SELECT province, indicator, date, value FROM province WHERE province = #{province} AND indicator = #{indicator}")
    List<ProvinceEntity> getFilteredData(@Param("province") String province, @Param("indicator") String indicator);
}