package com.getyourbakes.server.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.getyourbakes.server.model.CartItem;

public class Data {
    @JsonProperty("cartItem")
    private CartItem cartItem;

    @JsonProperty("email")
    private String email;

    public CartItem getCartItem() {
        return cartItem;
    }

    public void setCartItem(CartItem cartItem) {
        this.cartItem = cartItem;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Data(CartItem cartItem, String email) {
        this.cartItem = cartItem;
        this.email = email;
    }
}