package com.getyourbakes.server.controllers;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.getyourbakes.server.services.productservices.ProductServices;

@RestController
@RequestMapping("/items")
@CrossOrigin(origins = "*")

public class ProductsController {

    @Autowired
    ProductServices productServices;
    @GetMapping("/getitemsfromdatabase")

    public List<HashMap<String, String>> getitemsfromdatabase(){

        return productServices.getallitems();

    }
}
