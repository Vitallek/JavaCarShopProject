package org.package1;

import com.google.gson.Gson;
import com.mongodb.MongoException;
import com.mongodb.client.*;
import com.mongodb.client.result.InsertOneResult;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.Objects;

import static com.mongodb.client.model.Filters.eq;

public class MongoDBDriver {
    private static final Gson gson = new Gson();
    private static final String DB_URI = "mongodb://localhost:27017";
    public static final String DB_NAME = "Vehicles";
    public static final String BRANDS_COL = "Brands";
    public static final String SEDAN_COL = "Sedan";
    public static final String WAGON_COL = "Wagon";
    public static final String SUV_COL = "SUV";
    public static final String SPORT_COL = "Sport";
    public static final String COMPACT_COL = "Compact";
    public static final String USERS = "Userrrs";
    public static String addUserIfNotExist(String email, String password, String role, String token) {
        try (MongoClient mongoClient = MongoClients.create(DB_URI)) {
            MongoDatabase database = mongoClient.getDatabase(DB_NAME);
            MongoCollection<Document> collection = database.getCollection(USERS);
            //найти аккаунты с такой же почтой
            Document doc = collection.find(eq("email", email)).first();
            if (doc != null) {
                return "{\"desc\": \"user already exists\", \"code\": 409}";
            }
            try {
                InsertOneResult result = collection.insertOne(new Document()
                        .append("_id", new ObjectId())
                        .append("email", email)
                        .append("password", password)
                        .append("token", token)
                        .append("role", role));
                return "{\"desc\": \""+ result.getInsertedId().toString() +"\", \"code\": 200}";
            } catch (MongoException me) {
                return "database error";
            }
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }
    public static String tokenLogin(String email, String password) {
        try (MongoClient mongoClient = MongoClients.create(DB_URI)) {
            MongoDatabase database = mongoClient.getDatabase(DB_NAME);
            MongoCollection<Document> collection = database.getCollection(USERS);
            //найти аккаунты с такой же почтой
            Document doc = collection.find(eq("email", email)).first();
            if (doc != null) {
                if(Objects.equals(doc.getString("password"), password)){
                    return "{\"desc\": \"successful\",\"role\":\""+doc.getString("role")+"\", \"code\": 200}";
                }
                return "{\"desc\": \"token mismatch\", \"code\": 500}";
            }
            return "{\"desc\": \"no user found\", \"code\": 409}";
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }
    public static String manualLogin(String email, String password, String role,String token) {
        try (MongoClient mongoClient = MongoClients.create(DB_URI)) {
            MongoDatabase database = mongoClient.getDatabase(DB_NAME);
            MongoCollection<Document> collection = database.getCollection(USERS);
            //найти аккаунты с такой же почтой
            Document doc = collection.find(eq("email", email)).first();
            if(doc == null) return "{\"desc\": \"no user found\", \"code\": 409}";
            if(!Objects.equals(doc.getString("password"), password)) return "{\"desc\": \"password incorrect\", \"code\": 401}";
            return "{\"desc\": \"successful\",\"role\":\""+doc.getString("role")+"\", \"code\": 200}";
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }
    public static String getAllOfProductType(String type){
        try (MongoClient mongoClient = MongoClients.create(DB_URI)) {
            MongoDatabase database = mongoClient.getDatabase(DB_NAME);
            MongoCollection<Document> collection = database.getCollection(type);
            FindIterable<Document> findIterable = collection.find();
            Iterator<Document> iterator = findIterable.iterator();
            ArrayList<Document> products = new ArrayList<>();
            while (iterator.hasNext()) {
                products.add(iterator.next());
            }
            return gson.toJson(products);
        } catch (Exception e) {
            System.out.println(e);
            return "";
        }
    }
    public void test() {
        // Replace the uri string with your MongoDB deployment's connection string
        try (MongoClient mongoClient = MongoClients.create(DB_URI)) {
            MongoDatabase database = mongoClient.getDatabase("testDB");
            MongoCollection<Document> collection = database.getCollection("testColl");
            Document doc = collection.find(eq("box", "1")).first();
            System.out.println(doc.toJson());
        } catch (Exception e) {
            System.out.println(e);
        }
    }
}
