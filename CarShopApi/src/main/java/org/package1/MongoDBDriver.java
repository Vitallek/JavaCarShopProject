package org.package1;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.mongodb.MongoException;
import com.mongodb.client.*;
import com.mongodb.client.model.IndexOptions;
import com.mongodb.client.model.Indexes;
import com.mongodb.client.model.Updates;
import com.mongodb.client.result.InsertOneResult;
import org.bson.BsonDocument;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import org.json.JSONArray;
import org.json.JSONObject;
import org.package1.utility.User;

import java.util.*;

import static com.mongodb.client.model.Filters.eq;

public class MongoDBDriver {
    private static final Gson gson = new Gson();
    private static final String DB_URI = "mongodb://localhost:3002";
    public static final String DB_NAME = "Vehicles";
    public static final String USERS = "Userrrs";
    public static final String ORDERS = "Orders";
    public static final String BRANDS = "Brands";
    private static boolean isAuth(MongoClient mongoClient, String token){
        Boolean isAuth = false;
        try {
            MongoDatabase database = mongoClient.getDatabase(DB_NAME);
            MongoCollection<Document> collection = database.getCollection(USERS);
            String payload = JWTDriver.decodeToken(token);
            System.out.println(payload);
            User user = gson.fromJson(payload, User.class);
            Document doc = collection.find(eq("email", user.getEmail())).first();
            if(doc == null) {
                isAuth = false;
            }
            if (Objects.equals(doc.getString("password"), user.getPassword())) isAuth = true;
        } catch (Exception e) {
            System.out.println(e);
        }
        return isAuth;
    }
    public static JSONObject addUserIfNotExist(MongoClient mongoClient, User user) {
        try {
            MongoDatabase database = mongoClient.getDatabase(DB_NAME);
            MongoCollection<Document> collection = database.getCollection(USERS);
            Document doc = collection.find(eq("email", user.getEmail())).first();
            if (doc != null) {
                JSONObject dataJson = new JSONObject();
                dataJson.put("desc","user already exists");
                dataJson.put("code",409);
                return dataJson;
            }
            try {
                InsertOneResult result = collection.insertOne(new Document()
                        .append("_id", new ObjectId())
                        .append("email", user.getEmail())
                        .append("phone", user.getPhone())
                        .append("name", user.getName())
                        .append("password", user.getPassword())
                        .append("token", user.getToken())
                        .append("role", user.getRole()));

                JSONObject dataJson = new JSONObject();
                dataJson.put("desc",result.getInsertedId().toString());
                dataJson.put("token",user.getToken());
                dataJson.put("code",200);
                return dataJson;
            } catch (MongoException me) {
                JSONObject dataJson = new JSONObject();
                dataJson.put("desc","database error");
                dataJson.put("code",500);
                return dataJson;
            }
        } catch (Exception e) {
            System.out.println(e);
            JSONObject dataJson = new JSONObject();
            dataJson.put("desc",e.toString());
            dataJson.put("code",500);
            return dataJson;
        }
    }
    public static JSONObject tokenLogin(MongoClient mongoClient,String email, String password) {
        try {
            MongoDatabase database = mongoClient.getDatabase(DB_NAME);
            MongoCollection<Document> collection = database.getCollection(USERS);
            Document doc = collection.find(eq("email", email)).first();
            if (doc != null) {
                if(Objects.equals(doc.getString("password"), password)){
                    JSONObject dataJson = new JSONObject();
                    dataJson.put("data",doc);
                    dataJson.put("code",200);
                    return dataJson;
                }
                JSONObject dataJson = new JSONObject();
                dataJson.put("desc","token mismatch");
                dataJson.put("code",500);
                return dataJson;
            }
            JSONObject dataJson = new JSONObject();
            dataJson.put("desc","no user found");
            dataJson.put("code",409);
            return dataJson;
        } catch (Exception e) {
            System.out.println(e);
            JSONObject dataJson = new JSONObject();
            dataJson.put("desc",e.toString());
            dataJson.put("code",500);
            return dataJson;
        }
    }
    public static JSONObject manualLogin(MongoClient mongoClient,String email, String password) {
        try {
            MongoDatabase database = mongoClient.getDatabase(DB_NAME);
            MongoCollection<Document> collection = database.getCollection(USERS);
            //найти аккаунты с такой же почтой
            Document doc = collection.find(eq("email", email)).first();
            if(doc == null) {
                JSONObject dataJson = new JSONObject();
                dataJson.put("desc","no user found");
                dataJson.put("code",409);
                return dataJson;
            }
            if(!Objects.equals(doc.getString("password"), password)) {
                JSONObject dataJson = new JSONObject();
                dataJson.put("desc","password incorrect");
                dataJson.put("code",401);
                return dataJson;
            }
            JSONObject dataJson = new JSONObject();
            dataJson.put("data",doc);
            dataJson.put("code",200);
            return dataJson;
        } catch (Exception e) {
            System.out.println(e);
            JSONObject dataJson = new JSONObject();
            dataJson.put("desc",e.toString());
            dataJson.put("code",500);
            return dataJson;
        }
    }
    public static JSONObject getAllOfProductType(MongoClient mongoClient,String coll){
        try {
            MongoDatabase database = mongoClient.getDatabase(DB_NAME);
            MongoCollection<Document> collection = database.getCollection(coll);
            FindIterable<Document> findIterable = collection.find();
            Iterator<Document> iterator = findIterable.iterator();
            ArrayList<Document> products = new ArrayList<>();
            while (iterator.hasNext()) {
                products.add(iterator.next());
            }
            JSONObject dataJson = new JSONObject();
            dataJson.put("data", products);
            dataJson.put("code", 200);
            return dataJson;
        } catch (Exception e) {
            System.out.println(e);
            JSONObject dataJson = new JSONObject();
            dataJson.put("desc",e.toString());
            dataJson.put("code",500);
            return dataJson;
        }
    }
    public static JSONObject getAllBrands(MongoClient mongoClient){
        try {
            MongoDatabase database = mongoClient.getDatabase(DB_NAME);
            MongoCollection<Document> collection = database.getCollection(BRANDS);
            FindIterable<Document> findIterable = collection.find();
            Iterator<Document> iterator = findIterable.iterator();
            ArrayList<Document> brands = new ArrayList<>();
            while (iterator.hasNext()) {
                brands.add(iterator.next());
            }
            JSONObject dataJson = new JSONObject();
            dataJson.put("data", brands);
            dataJson.put("code", 200);
            return dataJson;
        } catch (Exception e) {
            System.out.println(e);
            JSONObject dataJson = new JSONObject();
            dataJson.put("desc",e.toString());
            dataJson.put("code",500);
            return dataJson;
        }
    }
    public static JSONObject getAllOrders(MongoClient mongoClient, String token){
        try {
            if(!isAuth(mongoClient, token)) {
                JSONObject dataJson = new JSONObject();
                dataJson.put("desc","unauth action");
                dataJson.put("code",500);
                return dataJson;
            }
            MongoDatabase database = mongoClient.getDatabase(DB_NAME);
            MongoCollection<Document> collection = database.getCollection(ORDERS);
            FindIterable<Document> findIterable = collection.find();
            Iterator<Document> iterator = findIterable.iterator();
            ArrayList<Document> orders = new ArrayList<>();
            while (iterator.hasNext()) {
                orders.add(iterator.next());
            }
            JSONObject dataJson = new JSONObject();
            dataJson.put("data", orders);
            dataJson.put("code", 200);
            return dataJson;
        } catch (Exception e) {
            System.out.println(e);
            JSONObject dataJson = new JSONObject();
            dataJson.put("desc",e.toString());
            dataJson.put("code",500);
            return dataJson;
        }
    }
    public static JSONObject deleteAllFromColl(MongoClient mongoClient,String coll, String token){
        try {
            if(!isAuth(mongoClient, token)) {
                JSONObject dataJson = new JSONObject();
                dataJson.put("desc","unauth action");
                dataJson.put("code",500);
                return dataJson;
            }
            MongoDatabase database = mongoClient.getDatabase(DB_NAME);
            MongoCollection<Document> collection = database.getCollection(coll);
            collection.deleteMany(new BsonDocument());
            return new JSONObject().put("code", 200);
        } catch (Exception e) {
            System.out.println(e);
            JSONObject dataJson = new JSONObject();
            dataJson.put("desc",e.toString());
            dataJson.put("code",500);
            return dataJson;
        }
    }
    public static JSONObject deleteSelectedFromColl(MongoClient mongoClient,String coll, String selected, String token){
        try {
            if(!isAuth(mongoClient, token)) {
                JSONObject dataJson = new JSONObject();
                dataJson.put("desc","unauth action");
                dataJson.put("code",500);
                return dataJson;
            }
            MongoDatabase database = mongoClient.getDatabase(DB_NAME);
            MongoCollection<Document> collection = database.getCollection(coll);
            ArrayList<Document> selectedDocs =  gson.fromJson(selected, new TypeToken<List<Document>>() {}.getType());
            selectedDocs.forEach(doc -> {
                Bson query = eq("VIN", doc.get("VIN"));
                collection.deleteOne(query);
            });
            return new JSONObject().put("code", 200);
        } catch (Exception e) {
            System.out.println(e);
            JSONObject dataJson = new JSONObject();
            dataJson.put("desc",e.toString());
            dataJson.put("code",500);
            return dataJson;
        }
    }
    public static JSONObject insertMany(MongoClient mongoClient,String coll, String data, String token){
        try {
            if(!isAuth(mongoClient, token)) {
                JSONObject dataJson = new JSONObject();
                dataJson.put("desc","unauth action");
                dataJson.put("code",500);
                return dataJson;
            }
            System.out.println(data.length() + "rows to insert");
            MongoDatabase database = mongoClient.getDatabase(DB_NAME);
            MongoCollection<Document> collection = database.getCollection(coll);
            collection.insertMany(gson.fromJson(data, new TypeToken<List<Document>>() {}.getType()));
            return new JSONObject().put("code", 200);
        } catch (Exception e) {
            System.out.println(e);
            JSONObject dataJson = new JSONObject();
            dataJson.put("desc",e.toString());
            dataJson.put("code",500);
            return dataJson;
        }
    }
    public static JSONObject addBrand(MongoClient mongoClient,String data, String token){
        try {
            if(!isAuth(mongoClient, token)) {
                JSONObject dataJson = new JSONObject();
                dataJson.put("desc","unauth action");
                dataJson.put("code",500);
                return dataJson;
            }
            JSONObject brand = new JSONObject(data);
            //create new coll
            MongoDatabase database = mongoClient.getDatabase(DB_NAME);
            MongoCollection<Document> collection = database.getCollection(brand.getString("brand").toLowerCase().replaceAll("\\s","-"));
            collection.createIndex(Indexes.ascending("VIN"), new IndexOptions().unique(true));

            //add to brand coll
            MongoCollection<Document> brands = database.getCollection(BRANDS);
            brands.insertOne(new Document()
                    .append("brand", brand.getString("brand"))
                    .append("models", brand.getJSONArray("models")));
            return new JSONObject().put("code", 200);
        } catch (Exception e) {
            System.out.println(e);
            JSONObject dataJson = new JSONObject();
            dataJson.put("desc",e.toString());
            dataJson.put("code",500);
            return dataJson;
        }
    }
    public static JSONObject deleteBrand(MongoClient mongoClient,String coll, String token){
        try {
            if(!isAuth(mongoClient, token)) {
                JSONObject dataJson = new JSONObject();
                dataJson.put("desc","unauth action");
                dataJson.put("code",500);
                return dataJson;
            }
            System.out.println(coll);
            MongoDatabase database = mongoClient.getDatabase(DB_NAME);
            MongoCollection<Document> collection = database.getCollection(coll.toLowerCase().replaceAll("\\s","-"));
            collection.drop();
            //remove from brand coll
            MongoCollection<Document> brands = database.getCollection(BRANDS);
            Bson query = eq("brand", coll.replaceAll("\\s","-"));
            brands.deleteOne(query);
            return new JSONObject().put("code", 200);
        } catch (Exception e) {
            System.out.println(e);
            JSONObject dataJson = new JSONObject();
            dataJson.put("desc",e.toString());
            dataJson.put("code",500);
            return dataJson;
        }
    }
    public static JSONObject update(MongoClient mongoClient,String data, String token){
        try {
            if(!isAuth(mongoClient, token)) {
                JSONObject dataJson = new JSONObject();
                dataJson.put("desc","unauth action");
                dataJson.put("code",500);
                return dataJson;
            }
            JSONObject dataJson = new JSONObject(data);
            String coll = dataJson.getString("coll");
            MongoDatabase database = mongoClient.getDatabase(DB_NAME);
            MongoCollection<Document> collection = database.getCollection(coll);
            System.out.println(coll);
            if(dataJson.get("value") instanceof String){
                System.out.println(collection.updateOne(
                        eq("VIN", dataJson.getString("VIN")),
                        Updates.set(dataJson.getString("field"),dataJson.getString("value"))
                ));
            }
            if(dataJson.get("value") instanceof Integer){
                System.out.println(collection.updateOne(
                        eq("VIN", dataJson.getString("VIN")),
                        Updates.set(dataJson.getString("field"),dataJson.getInt("value"))
                ));
            }
            return new JSONObject().put("code", 200);
        } catch (Exception e) {
            System.out.println(e);
            JSONObject dataJson = new JSONObject();
            dataJson.put("desc",e.toString());
            dataJson.put("code",500);
            return dataJson;
        }
    }
    public static JSONObject orderVehicle(MongoClient mongoClient,String data, String token){
        try {
            if(!isAuth(mongoClient, token)) {
                JSONObject dataJson = new JSONObject();
                dataJson.put("desc","unauth action");
                dataJson.put("code",500);
                return dataJson;
            }
            MongoDatabase database = mongoClient.getDatabase(DB_NAME);
            JSONObject dataJson = new JSONObject(data);
            MongoCollection<Document> vehicleCollection = database.getCollection(
                    dataJson.getString("brand").toLowerCase().replaceAll("\\s","-"));

            MongoCollection<Document> ordersCollection = database.getCollection(ORDERS);
            ordersCollection.createIndex(Indexes.ascending("VIN"), new IndexOptions().unique(true));
            ordersCollection.createIndex(Indexes.ascending("user"));

            vehicleCollection.deleteOne(eq("VIN", dataJson.getString("VIN")));
            dataJson.put("status", 1);
            ordersCollection.insertOne(Document.parse(dataJson.toString()));
//            collection.insertMany(gson.fromJson(data, new TypeToken<List<Document>>() {}.getType()));
            return new JSONObject().put("code", 200);
        } catch (Exception e) {
            System.out.println(e);
            JSONObject dataJson = new JSONObject();
            dataJson.put("desc",e.toString());
            dataJson.put("code",500);
            return dataJson;
        }
    }
    public static JSONObject cancelOrder(MongoClient mongoClient,String data, String token){
        try {
            if(!isAuth(mongoClient, token)) {
                JSONObject dataJson = new JSONObject();
                dataJson.put("desc","unauth action");
                dataJson.put("code",500);
                return dataJson;
            }
            MongoDatabase database = mongoClient.getDatabase(DB_NAME);
            JSONArray dataArray = new JSONArray(data);
            for (int i = 0 ; i < dataArray.length(); i++) {
                JSONObject vehicle = dataArray.getJSONObject(i);
                MongoCollection<Document> vehicleCollection = database.getCollection(
                        vehicle.getString("brand").toLowerCase().replaceAll("\\s","-")
                );

                MongoCollection<Document> ordersCollection = database.getCollection(ORDERS);

                ordersCollection.deleteOne(eq("VIN", vehicle.getString("VIN")));
                vehicle.put("status", 0);
                vehicle.remove("user_email");
                vehicle.remove("user_phone");
                vehicleCollection.insertOne(Document.parse(vehicle.toString()));
//            collection.insertMany(gson.fromJson(data, new TypeToken<List<Document>>() {}.getType()));
            }
            return new JSONObject().put("code", 200);
        } catch (Exception e) {
            System.out.println(e);
            JSONObject dataJson = new JSONObject();
            dataJson.put("desc",e.toString());
            dataJson.put("code",500);
            return dataJson;
        }
    }
    public static JSONObject getUserOrders(MongoClient mongoClient,String email, String token){
        try {
            if(!isAuth(mongoClient, token)) {
                JSONObject dataJson = new JSONObject();
                dataJson.put("desc","unauth action");
                dataJson.put("code",500);
                return dataJson;
            }
            MongoDatabase database = mongoClient.getDatabase(DB_NAME);
            MongoCollection<Document> collection = database.getCollection(ORDERS);
            FindIterable<Document> findIterable = collection.find(eq("user_email", email));
            Iterator<Document> iterator = findIterable.iterator();
            ArrayList<Document> orders = new ArrayList<>();
            while (iterator.hasNext()) {
                orders.add(iterator.next());
            }
            JSONObject dataJson = new JSONObject();
            dataJson.put("data", orders);
            dataJson.put("code", 200);
            return dataJson;
        } catch (Exception e) {
            System.out.println(e);
            JSONObject dataJson = new JSONObject();
            dataJson.put("desc",e.toString());
            dataJson.put("code",500);
            return dataJson;
        }
    }
}
