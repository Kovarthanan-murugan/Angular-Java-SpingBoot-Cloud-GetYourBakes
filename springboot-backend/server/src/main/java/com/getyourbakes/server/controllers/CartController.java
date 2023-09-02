package com.getyourbakes.server.controllers;

import com.getyourbakes.server.model.carthandle.Order;
import org.springframework.beans.factory.annotation.Autowired;
import com.getyourbakes.server.services.cartservices.CartServices;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "*")
public class CartController {

    @Autowired
    CartServices cartServices;

    @GetMapping("/getcartitem")

    public void getCartItem(){
        cartServices.getCartItem();
    }
    @PostMapping(value="/addcartitem",consumes = "application/json",produces = "application/json")

    public void  addcartitem(@RequestBody Order dataBody ){
        cartServices.addCartItem(dataBody);
    }



}
