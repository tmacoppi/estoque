package com.oficina.Estoque.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

@Controller
public class PageController {

    @RequestMapping("/p_categoria")
    public String categoria(Model model, final HttpSession session) {

        //getModel(model, 0);
        return "p_categoria";
    }

    @RequestMapping("/p_sub_categoria")
    public String subCategoria(Model model, final HttpSession session) {

        //getModel(model, 0);
        return "p_sub_categoria";
    }

    @RequestMapping("/p_fornecedor")
    public String fornecedor(Model model, final HttpSession session) {

        //getModel(model, 0);
        return "p_fornecedor";
    }

    @RequestMapping("/p_cliente")
    public String cliente(Model model, final HttpSession session) {

        //getModel(model, 0);
        return "p_cliente";
    }

}
