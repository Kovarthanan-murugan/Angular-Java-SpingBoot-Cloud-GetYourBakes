package com.getyourbakes.server.model.carthandle;

import java.util.List;

public class Order {
    private String email;

    private List<Item> items;

    private double grandTotal;

    public double getTotalPrice() {
        return grandTotal;
    }

    public void setTotalPrice(double totalPrice) {
        this.grandTotal = totalPrice;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }

    public static class Item {
        private String name;
        private int quantity;
        private double price;

        private double itemTotal;

        public double getItemTotal() {
            return itemTotal;
        }

        public void setItemTotal(double itemTotal) {
            this.itemTotal = itemTotal;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }

        public double getPrice() {
            return price;
        }

        public void setPrice(double price) {
            this.price = price;
        }
    }

    @Override
    public String toString() {
        return "Order{" +
                "email='" + email + '\'' +
                ", items=" + items +
                ", totalprice="+grandTotal+'}';
    }
}

