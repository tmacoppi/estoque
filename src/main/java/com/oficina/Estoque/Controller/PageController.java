package com.oficina.Estoque.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

@Controller
public class PageController {

    @RequestMapping("/p_categoria")
    public String index(Model model, final HttpSession session) {

        //getModel(model, 0);
        return "p_categoria";
    }
}
