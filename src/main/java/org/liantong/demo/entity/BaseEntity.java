package org.liantong.demo.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

@Data
public class BaseEntity {

    @TableId(type = IdType.AUTO) // 自增 ID
    private Integer id;

    @TableField("indicator")
    private String indicator;

    @TableField("date")
    private String date;

    @TableField("value")
    private Double value;
}