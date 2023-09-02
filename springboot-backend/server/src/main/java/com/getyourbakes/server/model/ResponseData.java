package com.getyourbakes.server.model;

public class ResponseData {
    private String email;
    private Data data;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Data getData() {
        return data;
    }

    public void setData(Data data) {
        this.data = data;
    }

    public ResponseData(String email, Data data) {
        this.email = email;
        this.data = data;
    }
}