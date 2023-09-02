package com.getyourbakes.server.services.productservices;

import java.util.*;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Autowired;


import com.getyourbakes.server.services.productservices.ProductServices;

@Service
public class ProductServicesImpl implements ProductServices {
    private final RestTemplate restTemplate;
    @Autowired

    public ProductServicesImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
    @Override
    public List<HashMap<String, String>> getallitems() {

//        List<String> list = new ArrayList<>();
//
//        list.add("kova");
//        list.add("kova1");
//        return list;
        String apiUrl = "https://tye3e0cpfc.execute-api.us-east-1.amazonaws.com/getItemsFromDataBase";
        System.out.println(restTemplate.getForObject(apiUrl, List.class));
        return restTemplate.getForObject(apiUrl, List.class); // Warning: This might require additional casting or handling

    }
}
