package com.getyourbakes.server.controllers;

import com.getyourbakes.server.model.carthandle.Order;
import org.springframework.beans.factory.annotation.Autowired;
import com.getyourbakes.server.services.cartservices.CartServices;
import org.springframework.web.bind.annotation.*;
import com.getyourbakes.server.model.MyRequestBody;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "*")
public class CartController {

    @Autowired
    CartServices cartServices;



    @PostMapping(value="/getcartitem",consumes = "application/json",produces = "application/json")

    public CompletableFuture<Order> getCartItem(@RequestBody MyRequestBody dataBody){
        return cartServices.getCartItem(dataBody);
    }
    @PostMapping(value="/addcartitem",consumes = "application/json",produces = "application/json")

    public void  addcartitem(@RequestBody Order dataBody ){
        cartServices.addCartItem(dataBody);
    }



}
