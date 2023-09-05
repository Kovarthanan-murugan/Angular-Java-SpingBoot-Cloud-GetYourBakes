package com.getyourbakes.server.services.cartservices;

//import com.getyourbakes.server.model.CartData;
//import com.getyourbakes.server.model.CartDataDetails;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.getyourbakes.server.model.MyRequestBody;
import com.getyourbakes.server.model.ResponseData;
import com.getyourbakes.server.model.carthandle.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import java.util.concurrent.CompletableFuture;


import java.util.List;

import org.springframework.http.MediaType;

import reactor.core.publisher.Mono;
import org.springframework.web.reactive.function.BodyInserters;

@Service
public class CartServiceImpl implements CartServices {

    private final RestTemplate restTemplate;

    String returnCartData;

    @Autowired

    public CartServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public void addCartItem(Order dataBody) {
        ResponseData responseData;
        double grandTotal = 0.0;
        System.out.println("request");
        System.out.println(dataBody);
        List<Order.Item> items = dataBody.getItems();

        for (Order.Item item : items) {
            System.out.println(item.getPrice());
            System.out.println(item.getItemName());
            System.out.println(item.getItemTotal());
            double eachItemTotal = item.getQuantity() * item.getPrice();
            item.setItemTotal(eachItemTotal);
            grandTotal += eachItemTotal;
        }

        dataBody.setTotalPrice(grandTotal);


        System.out.println("total price" + dataBody);
        String apiUrl = "https://765xhnv4ng.execute-api.us-east-1.amazonaws.com/addcartitem";


        //will convert object to json string
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonString1 = "";
        try {
            jsonString1 = objectMapper.writeValueAsString(dataBody);

            System.out.println("jsonString" + jsonString1);

        } catch (Exception e) {
            System.out.println("error in parsing object");
        }


        WebClient webClient = WebClient.create();
        Mono<String> response = webClient
                .post()
                .uri(apiUrl)
                .accept(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(jsonString1))//will send the body in whatever format we give
                .retrieve()
                .bodyToMono(String.class);

        response.subscribe(
                responseBody -> System.out.println("Response: " + responseBody),
                error -> System.err.println("Error: " + error.getMessage())
        );


    }

    @Override
//    public String  getCartItem() {
//        List<Order> list = new ArrayList<>();
//
//        String a = "";
//        System.out.println("being ccalled");
//        String apiUrl = "https://765xhnv4ng.execute-api.us-east-1.amazonaws.com/getcartitem";
////        System.out.println(restTemplate.getForObject(apiUrl, List.class));
//
//
//        // Create your request body object
////        HashMap<String,String> requestBody= new HashMap<String,String>();
////        requestBody.put("email","kovarthan.ece@gmail.com");
//        MyRequestBody requestBody = new MyRequestBody();
//        requestBody.setEmail("kovarthan.ece@gmail.com");
//        WebClient webClient = WebClient.create();
//
//
//        Mono<String> response = webClient
//                .post()
//                .uri(apiUrl)
//                .accept(MediaType.APPLICATION_JSON)
//                .body(BodyInserters.fromValue(requestBody))
//                .retrieve()
//                .bodyToMono(String.class);
//
//        response.subscribe(
//                responseBody -> {System.out.println("Response: " + responseBody);
//                    returnCartData=responseBody;},
//                error -> System.err.println("Error: " + error.getMessage())
//        );
//
//        System.out.println("outside"+returnCartData);
//
//        return returnCartData;
//    }
//}
//////////////////////////////////////////
////        String json = "{\n" +
////                "    \"email\":\"kovarthan\",\n" +
////                "    \"items\":[\n" +
////                "        {\n" +
////                "            \"name\":\"bakes1\",\n" +
////                "            \"quantity\":1,\n" +
////                "            \"price\":10.4\n" +
////                "        },\n" +
////                "        {\n" +
////                "            \"name\":\"bakes2\",\n" +
////                "            \"quantity\":3,\n" +
////                "            \"price\":20.3\n" +
////                "        },\n" +
////                "        {\n" +
////                "            \"name\":\"bakes3\",\n" +
////                "            \"quantity\":3,\n" +
////                "            \"price\":30.4\n" +
////                "        }\n" +
////                "    ]\n" +
////                "}";
////
////        ObjectMapper objectMapper = new ObjectMapper();
////        Order order = null;
////        try {
////            order = objectMapper.readValue(json, Order.class);
////        } catch (Exception e) {
////
////        }
////        System.out.println(order.getItems().get(0).getName());
////return order.getItems();
////    }
////}
//
//
//        ////////////////////////////////////////////
////    ObjectMapper objectMapper = new ObjectMapper();
////
////    String jsonString = "{\"email\":\"kovarthan.ece@gmail.com\",\"data\":{\"cartItem\":{\"name\":\"kova\"},\"email\":\"kovarthan.ece@gmail.com\"}}";
////
////try {
////        String jsonString1 = objectMapper1.writeValueAsString(res);
////
////        System.out.println("jsonString"+jsonString1);
////        responseData = objectMapper.readValue(jsonString, ResponseData.class);
////        System.out.println("Email: " + responseData.getEmail());
////        System.out.println("Data Email: " + responseData.getData().getEmail());
////        System.out.println("Cart Item Name: " + responseData.getData().getCartItem().getName());
////        }catch(Exception e){
////        System.out.println("error in parsing object");
////        }


    public CompletableFuture<Order> getCartItem(MyRequestBody databody) {

        CompletableFuture<Order> future = new CompletableFuture<>();
        String apiUrl = "https://765xhnv4ng.execute-api.us-east-1.amazonaws.com/getcartitem";

        MyRequestBody requestBody = new MyRequestBody();
        System.out.println("ssssss"+databody.getEmail());
        requestBody.setEmail(databody.getEmail());
        WebClient webClient = WebClient.create();

        Mono<Order> response = webClient
                .post()
                .uri(apiUrl)
                .accept(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(requestBody))
                .retrieve()
                .bodyToMono(Order.class);

        response.subscribe(
                responseBody -> {
                    System.out.println("Response: " + responseBody);

                    future.complete(responseBody); // Complete the CompletableFuture with the response data
                },
                error -> {
                    System.err.println("Error: " + error.getMessage());
                    future.completeExceptionally(error); // Complete the CompletableFuture with an exception if an error occurs
                }
        );


System.out.println(future);
        return future;
    }
}