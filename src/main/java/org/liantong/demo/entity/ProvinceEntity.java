package org.liantong.demo.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

@Data
@TableName("province") // 这里对应数据库表名
public class ProvinceEntity extends BaseEntity {

    @TableField("province")
    private String province;
}
