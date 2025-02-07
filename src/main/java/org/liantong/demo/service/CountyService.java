package org.liantong.demo.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.liantong.demo.entity.CountyEntity;
import org.liantong.demo.mapper.CountyMapper;
import org.springframework.stereotype.Service;

@Service
public class CountyService extends ServiceImpl<CountyMapper, CountyEntity> {
}
