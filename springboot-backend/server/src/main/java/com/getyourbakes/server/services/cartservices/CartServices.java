package com.getyourbakes.server.services.cartservices;

import com.getyourbakes.server.model.carthandle.Order;

import java.util.*;
public interface CartServices {

    public void addCartItem(Order dataBody);
    public void getCartItem();
}
