package org.liantong.demo.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

@Data
@TableName("county") // 这里对应数据库表名
public class CountyEntity extends BaseEntity {

    @TableField("county")
    private String county;
}