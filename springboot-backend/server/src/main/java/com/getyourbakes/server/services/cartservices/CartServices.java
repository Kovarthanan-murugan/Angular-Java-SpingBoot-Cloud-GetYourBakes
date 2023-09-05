package com.getyourbakes.server.services.cartservices;

import com.getyourbakes.server.model.MyRequestBody;
import com.getyourbakes.server.model.carthandle.Order;

import java.util.*;
import java.util.concurrent.CompletableFuture;

public interface CartServices {

    public void addCartItem(Order dataBody);
    public CompletableFuture<Order> getCartItem(MyRequestBody databody);
}
