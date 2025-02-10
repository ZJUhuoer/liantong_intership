package org.liantong.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping("/")
    public String index() {
        return "index";  // 这样Spring Boot会找到templates/index.html并返回给浏览器
    }
}
