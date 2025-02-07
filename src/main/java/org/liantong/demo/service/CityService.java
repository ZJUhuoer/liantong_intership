package org.liantong.demo.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.liantong.demo.entity.CityEntity;
import org.liantong.demo.mapper.CityMapper;
import org.springframework.stereotype.Service;

@Service
public class CityService extends ServiceImpl<CityMapper, CityEntity> {
}