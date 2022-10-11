package org.package1;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.mongodb.MongoException;
import com.mongodb.client.*;
import com.mongodb.client.result.InsertOneResult;
import org.bson.BsonDocument;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import org.package1.utility.LoginResponse;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;

import static com.mongodb.client.model.Filters.eq;

public class MongoDBDriver {
    private static final Gson gson = new Gson();
    private static final String DB_URI = "mongodb://localhost:3002";
    public static final String DB_NAME = "Vehicles";
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
    public static String manualLogin(String email, String password) {
        try (MongoClient mongoClient = MongoClients.create(DB_URI)) {
            MongoDatabase database = mongoClient.getDatabase(DB_NAME);
            MongoCollection<Document> collection = database.getCollection(USERS);
            //найти аккаунты с такой же почтой
            Document doc = collection.find(eq("email", email)).first();
            if(doc == null) return "{\"desc\": \"no user found\", \"code\": 409}";
            if(!Objects.equals(doc.getString("password"), password)) return "{\"desc\": \"password incorrect\", \"code\": 401}";
            String token = JWTDriver.createToken(doc.getString("email"), doc.getString("password"), doc.getString("role"));
            String msg = "{\"desc\": \"successful\",\"role\":\""+doc.getString("role")+"\", \"code\": 200}";
            return gson.toJson(new LoginResponse(msg, token).toString());
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }
    public static String getAllOfProductType(String coll){
        try (MongoClient mongoClient = MongoClients.create(DB_URI)) {
            MongoDatabase database = mongoClient.getDatabase(DB_NAME);
            MongoCollection<Document> collection = database.getCollection(coll);
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

    public static String deleteAllFromColl(String coll){
        try (MongoClient mongoClient = MongoClients.create(DB_URI)) {
            MongoDatabase database = mongoClient.getDatabase(DB_NAME);
            MongoCollection<Document> collection = database.getCollection(coll);
            collection.deleteMany(new BsonDocument());
            return "success";
        } catch (Exception e) {
            System.out.println(e);
            return e.toString();
        }
    }
    public static String deleteSelectedFromColl(String coll, String selected){
        try (MongoClient mongoClient = MongoClients.create(DB_URI)) {
            MongoDatabase database = mongoClient.getDatabase(DB_NAME);
            MongoCollection<Document> collection = database.getCollection(coll);
            ArrayList<Document> selectedDocs =  gson.fromJson(selected, new TypeToken<List<Document>>() {}.getType());
            selectedDocs.forEach(doc -> {
                Bson query = eq("VIN", doc.get("VIN"));
                collection.deleteOne(query);
            });
            return "success";
        } catch (Exception e) {
            System.out.println(e);
            return e.toString();
        }
    }
    public static String insertMany(String coll, String data){
        try (MongoClient mongoClient = MongoClients.create(DB_URI)) {
            MongoDatabase database = mongoClient.getDatabase(DB_NAME);
            MongoCollection<Document> collection = database.getCollection(coll);
            collection.insertMany(gson.fromJson(data, new TypeToken<List<Document>>() {}.getType()));
            return "success";
        } catch (Exception e) {
            System.out.println(e);
            return e.toString();
        }
    }
}
