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
import org.json.JSONObject;
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
    public static JSONObject addUserIfNotExist(String email, String password, String role, String token) {
        try (MongoClient mongoClient = MongoClients.create(DB_URI)) {
            MongoDatabase database = mongoClient.getDatabase(DB_NAME);
            MongoCollection<Document> collection = database.getCollection(USERS);
            //найти аккаунты с такой же почтой
            Document doc = collection.find(eq("email", email)).first();
            if (doc != null) {
                JSONObject dataJson = new JSONObject();
                dataJson.put("desc","user already exists");
                dataJson.put("code",409);
                return dataJson;
            }
            try {
                InsertOneResult result = collection.insertOne(new Document()
                        .append("_id", new ObjectId())
                        .append("email", email)
                        .append("password", password)
                        .append("token", token)
                        .append("role", role));

                JSONObject dataJson = new JSONObject();
                dataJson.put("desc",result.getInsertedId().toString());
                dataJson.put("token",token);
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
    public static JSONObject tokenLogin(String email, String password) {
        try (MongoClient mongoClient = MongoClients.create(DB_URI)) {
            MongoDatabase database = mongoClient.getDatabase(DB_NAME);
            MongoCollection<Document> collection = database.getCollection(USERS);
            //найти аккаунты с такой же почтой
            Document doc = collection.find(eq("email", email)).first();
            if (doc != null) {
                if(Objects.equals(doc.getString("password"), password)){
                    JSONObject dataJson = new JSONObject();
                    dataJson.put("desc","successful");
                    dataJson.put("email",doc.getString("email"));
                    dataJson.put("role",doc.getString("role"));
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
    public static JSONObject manualLogin(String email, String password) {
        try (MongoClient mongoClient = MongoClients.create(DB_URI)) {
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
            String token = JWTDriver.createToken(doc.getString("email"), doc.getString("password"), doc.getString("role"));
            JSONObject dataJson = new JSONObject();
            dataJson.put("desc","successful");
            dataJson.put("email",doc.getString("email"));
            dataJson.put("token",doc.getString("token"));
            dataJson.put("role",doc.getString("role"));
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
    public static JSONObject getAllOfProductType(String coll){
        try (MongoClient mongoClient = MongoClients.create(DB_URI)) {
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
    public static JSONObject deleteAllFromColl(String coll){
        try (MongoClient mongoClient = MongoClients.create(DB_URI)) {
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
    public static JSONObject deleteSelectedFromColl(String coll, String selected){
        try (MongoClient mongoClient = MongoClients.create(DB_URI)) {
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
    public static JSONObject insertMany(String coll, String data){
        try (MongoClient mongoClient = MongoClients.create(DB_URI)) {
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
    public static JSONObject addColl(String coll){
        try (MongoClient mongoClient = MongoClients.create(DB_URI)) {
            MongoDatabase database = mongoClient.getDatabase(DB_NAME);
            MongoCollection<Document> collection = database.getCollection(coll);
            collection.createIndex(Indexes.ascending("VIN"), new IndexOptions().unique(true));
            return new JSONObject().put("code", 200);
        } catch (Exception e) {
            System.out.println(e);
            JSONObject dataJson = new JSONObject();
            dataJson.put("desc",e.toString());
            dataJson.put("code",500);
            return dataJson;
        }
    }
    public static JSONObject update(String coll, String data){
        try (MongoClient mongoClient = MongoClients.create(DB_URI)) {
            MongoDatabase database = mongoClient.getDatabase(DB_NAME);
            MongoCollection<Document> collection = database.getCollection(coll);
            JSONObject dataJson = new JSONObject(data);
            Document query = new Document().append("VIN",  dataJson.get("rowData"));
            collection.updateOne(query, Updates.set(dataJson.get("field").toString(),dataJson.get("value").toString()));
            return new JSONObject().put("code", 200);
        } catch (Exception e) {
            System.out.println(e);
            JSONObject dataJson = new JSONObject();
            dataJson.put("desc",e.toString());
            dataJson.put("code",500);
            return dataJson;
        }
    }
    public static JSONObject orderVehicle(String data){
        try (MongoClient mongoClient = MongoClients.create(DB_URI)) {
            MongoDatabase database = mongoClient.getDatabase(DB_NAME);
            JSONObject dataJson = new JSONObject(data);
            System.out.println(dataJson);
//            MongoCollection<Document> collection = database.getCollection(coll);
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
}
