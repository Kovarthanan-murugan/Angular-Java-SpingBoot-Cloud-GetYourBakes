package com.getyourbakes.server.model;
import com.fasterxml.jackson.annotation.JsonProperty;

public class CartItem {
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public CartItem(String name) {
        this.name = name;
    }
}





