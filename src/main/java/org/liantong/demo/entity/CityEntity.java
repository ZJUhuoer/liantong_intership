package org.liantong.demo.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

@Data
@TableName("city") // 这里对应数据库表名
public class CityEntity extends BaseEntity {

    @TableField("city")
    private String city;
}
