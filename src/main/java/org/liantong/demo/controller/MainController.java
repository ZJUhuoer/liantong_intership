package org.liantong.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping("/")
    public String index() {
        return "index";  // ����Spring Boot���ҵ�templates/index.html�����ظ������
    }
}