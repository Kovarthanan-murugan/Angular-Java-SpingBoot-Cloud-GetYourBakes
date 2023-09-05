//package org.example;
//
//import com.amazonaws.services.lambda.runtime.Context;
//import com.amazonaws.services.lambda.runtime.LambdaLogger;
//import com.amazonaws.services.lambda.runtime.RequestHandler;
//import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
//import software.amazon.awssdk.auth.credentials.ProfileCredentialsProvider;
//import software.amazon.awssdk.regions.Region;
//import software.amazon.awssdk.services.dynamodb.DynamoDbAsyncClient;
//import software.amazon.awssdk.services.dynamodb.model.DynamoDbException;
//import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
//import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
//import software.amazon.awssdk.services.dynamodb.model.GetItemRequest;
//import java.util.HashMap;
//import java.util.Map;
//import java.util.Set;
//import java.util.stream.Collectors;
//
//// Handler value: example.HandlerInteger
//public class HandlerIntegerJava17 implements RequestHandler<IntegerRecord, Integer>{
//    public static void getDynamoDBItem(DynamoDbClient ddb,String tableName,String key,String keyVal ) {
//
//        HashMap<String,AttributeValue> keyToGet = new HashMap<String,AttributeValue>();
//
//        keyToGet.put(key, AttributeValue.builder()
//                .n(keyVal).build());
//
//        GetItemRequest request = GetItemRequest.builder()
//                .key(keyToGet)
//                .tableName(tableName)
//                .build();
//
//        try {
//            Map<String,AttributeValue> returnedItem = ddb.getItem(request).item();
//
//            if (returnedItem != null) {
//                Set<String> keys = returnedItem.keySet();
//                System.out.println("Amazon DynamoDB table attributes: \n");
//
//                for (String key1 : keys) {
//                    System.out.format("%s: %s\n", key1, returnedItem.get(key1).toString());
//                }
//            } else {
//                System.out.format("No item found with the key %s!\n", key);
//            }
//        } catch (DynamoDbException e) {
//            System.err.println(e.getMessage());
//            System.exit(1);
//        }
//    }
//
//    public static void getItem(DynamoDbAsyncClient client, String tableName, String key, String keyVal) {
//
//        HashMap<String, AttributeValue> keyToGet =
//                new HashMap<String, AttributeValue>();
//
//        keyToGet.put(key, AttributeValue.builder()
//                .s(keyVal).build());
//
//        try {
//
//            // Create a GetItemRequest instance
//            GetItemRequest request = GetItemRequest.builder()
//                    .key(keyToGet)
//                    .tableName(tableName)
//                    .build();
//
//            // Invoke the DynamoDbAsyncClient object's getItem
//            java.util.Collection<AttributeValue> returnedItem = client.getItem(request).join().item().values();
//
//            // Convert Set to Map
//            Map<String, AttributeValue> map = returnedItem.stream().collect(Collectors.toMap(AttributeValue::s, s -> s));
//            Set<String> keys = map.keySet();
//            for (String sinKey : keys) {
//                System.out.format("%s: %s\n", sinKey, map.get(sinKey).toString());
//            }
//
//        } catch (DynamoDbException e) {
//            System.err.println(e.getMessage());
//            System.exit(1);
//        }
//    }
//    @Override
//    /*
//     * Takes in an InputRecord, which contains two integers and a String.
//     * Logs the String, then returns the sum of the two Integers.
//     */
//    public Integer handleRequest(IntegerRecord event, Context context)
//    {
//        LambdaLogger logger = context.getLogger();
//        logger.log("String found: " + event.message());
//        String tableName = "bakeryitems";
//        String key = "number";
//        String keyVal = "1";
//        System.out.format("Retrieving item \"%s\" from \"%s\"\n", keyVal, tableName);
//
////        ProfileCredentialsProvider credentialsProvider = ProfileCredentialsProvider.create();
//        Region region = Region.US_EAST_1;
//        DynamoDbClient ddb = DynamoDbClient.builder()
//                .credentialsProvider(DefaultCredentialsProvider.create())
//                .region(region)
//                .build();
//        DynamoDbAsyncClient client = DynamoDbAsyncClient.builder()
//                .credentialsProvider(DefaultCredentialsProvider.create())
//                .region(region)
//                .build();
//
//        getDynamoDBItem(ddb, tableName, key, keyVal);
//        System.out.println("second item");
//        getItem(client, tableName, key, keyVal);
//
//        ddb.close();
//
//        return event.x() + event.y();
//
//    }
//}
//
//record IntegerRecord(int x, int y, String message) {
//}
//

//package org.example;
//
//import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
//import software.amazon.awssdk.regions.Region;
//import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
//import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
//import software.amazon.awssdk.services.dynamodb.model.ScanRequest;
//import software.amazon.awssdk.services.dynamodb.model.ScanResponse;
//import com.amazonaws.services.lambda.runtime.Context;
//import com.amazonaws.services.lambda.runtime.RequestHandler;
//
//import java.util.ArrayList;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//import com.fasterxml.jackson.databind.ObjectMapper;
//
//public class HandlerIntegerJava17 implements RequestHandler<Map<String, Object>, List<String>> {
//
//    private final DynamoDbClient dynamoDbClient;
//    private final ObjectMapper objectMapper;
//
//    public HandlerIntegerJava17() {
//        // Initialize DynamoDB client with default credentials and region
//        dynamoDbClient = DynamoDbClient.builder()
//                .region(Region.US_EAST_1)  // Replace with your desired region
//                .credentialsProvider(DefaultCredentialsProvider.create())
//                .build();
//        objectMapper = new ObjectMapper();
//
//    }
//
//    @Override
//    public List<String> handleRequest(Map<String, Object> input, Context context) {
//        String tableName = "bakeryitems";
//        String attributeName = "category";
//        String attributeValue = "bakes";
//
//        // Build ScanRequest
//        ScanRequest scanRequest = ScanRequest.builder()
//                .tableName(tableName)
//                .filterExpression("#attr = :val")
//                .expressionAttributeNames(new HashMap<String, String>() {{
//                    put("#attr", attributeName);
//                }})
//                .expressionAttributeValues(new HashMap<String, AttributeValue>() {{
//                    put(":val", AttributeValue.builder().s(attributeValue).build());
//                }})
//                .build();
//
//        // Perform the scan operation
//        ScanResponse scanResponse = dynamoDbClient.scan(scanRequest);
//        System.out.println("scanResponse");
//        System.out.println(scanResponse);
//        // Process the response
//        List<String> matchedItems = new ArrayList<>();
//        scanResponse.items().forEach(item -> {
//            String itemJson = convertItemToJson(item);
//            matchedItems.add(itemJson);
//        });
//        System.out.println("matchedItems");
//        System.out.println(matchedItems);
//        return matchedItems;
//    }
//
//    private String convertItemToJson(Map<String, AttributeValue> item) {
//        try {
//            // Convert AttributeValue objects to their actual values
//            Map<String, String> convertedItem = new HashMap<>();
//            for (Map.Entry<String, AttributeValue> entry : item.entrySet()) {
//                String attributeName = entry.getKey();
//                AttributeValue attributeValue = entry.getValue();
//
//                if (attributeValue.s() != null) {
//                    convertedItem.put(attributeName, attributeValue.s());
//                } else if (attributeValue.n() != null) {
//                    convertedItem.put(attributeName, attributeValue.n());
//                } else if (attributeValue.bool() != null) {
//                    convertedItem.put(attributeName, attributeValue.bool().toString());
//                } // Handle other data types if needed
//                System.out.println("convertedIteminside");
//                System.out.println(convertedItem);
//            }
//
//            return objectMapper.writeValueAsString(convertedItem);
//        } catch (Exception e) {
//            // Handle exception if JSON conversion fails
//            return "{}"; // Return an empty JSON object
//        }
//    }
//}

package org.example;

import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.ScanRequest;
import software.amazon.awssdk.services.dynamodb.model.ScanResponse;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.fasterxml.jackson.databind.ObjectMapper;

public class HandlerIntegerJava17 implements RequestHandler<Map<String, Object>, List<Map<String, String>>> {

    private final DynamoDbClient dynamoDbClient;
    private final ObjectMapper objectMapper;

    public HandlerIntegerJava17() {
        // Initialize DynamoDB client with default credentials and region
        dynamoDbClient = DynamoDbClient.builder()
                .region(Region.US_EAST_1)  // Replace with your desired region
                .credentialsProvider(DefaultCredentialsProvider.create())
                .build();
        objectMapper = new ObjectMapper();

    }

    @Override
    public List<Map<String, String>> handleRequest(Map<String, Object> input, Context context) {
        String tableName = "bakeryitems";
        String attributeName = "category";
        String attributeValue = "bakes";

        // Build ScanRequest
        ScanRequest scanRequest = ScanRequest.builder()
                .tableName(tableName)
                .filterExpression("#attr = :val")
                .expressionAttributeNames(new HashMap<String, String>() {{
                    put("#attr", attributeName);
                }})
                .expressionAttributeValues(new HashMap<String, AttributeValue>() {{
                    put(":val", AttributeValue.builder().s(attributeValue).build());
                }})
                .build();

        // Perform the scan operation
        ScanResponse scanResponse = dynamoDbClient.scan(scanRequest);
        System.out.println("scanResponse");
        System.out.println(scanResponse);
        // Process the response
        List<Map<String, String>> matchedItems = new ArrayList<>();
        scanResponse.items().forEach(item -> {
            Map<String, String> itemJson = convertItemToJson(item);
            matchedItems.add(itemJson);
        });
        System.out.println("matchedItems");
        System.out.println(matchedItems);
        return matchedItems;
    }

    private Map<String, String> convertItemToJson(Map<String, AttributeValue> item) {
        try {
            // Convert AttributeValue objects to their actual values
            Map<String, String> convertedItem = new HashMap<>();
            for (Map.Entry<String, AttributeValue> entry : item.entrySet()) {
                String attributeName = entry.getKey();
                AttributeValue attributeValue = entry.getValue();

                if (attributeValue.s() != null) {
                    convertedItem.put(attributeName, attributeValue.s());
                } else if (attributeValue.n() != null) {
                    convertedItem.put(attributeName, attributeValue.n());
                } else if (attributeValue.bool() != null) {
                    convertedItem.put(attributeName, attributeValue.bool().toString());
                } // Handle other data types if needed
                System.out.println("convertedIteminside");
                System.out.println(convertedItem);
            }

            return convertedItem;
        } catch (Exception e) {
            // Handle exception if JSON conversion fails
            return new HashMap<>(); // Return an empty JSON object
        }
    }
}
