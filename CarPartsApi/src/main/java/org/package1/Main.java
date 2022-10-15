package org.package1;

import com.google.gson.Gson;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.json.JSONObject;
import org.package1.utility.LoginResponse;
import org.package1.utility.RegisterResponse;
import org.package1.utility.User;

import java.io.IOException;

import static spark.Spark.*;

public class Main {
    private static final Gson gson = new Gson();
    private static final Integer port = 3001;

    // Enables CORS on requests. This method is an initialization method and should be called once.
    private static void enableCORS(final String origin, final String methods, final String headers) {

        options("/*", (request, response) -> {

            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }

            String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
            }

            return "OK";
        });

        before((request, response) -> {
            response.header("Access-Control-Allow-Origin", origin);
            response.header("Access-Control-Request-Method", methods);
            response.header("Access-Control-Allow-Headers", headers);
            // Note: this may or may not be necessary in your particular application
            response.type("application/json");
        });
    }

    public static void main(String[] args) {
        System.out.println("server started at port " + port);
        port(port);
        enableCORS("http://127.0.0.1:3000", "*", null);
//        https://www.baeldung.com/spark-framework-rest-api
        post("/register", (req, res) -> {
            JSONObject user = new JSONObject(req.body());
            System.out.println("register from " + user.getString("email"));
            String token = JWTDriver.createToken(user.getString("email"), user.getString("password"), user.getString("role"));
            return MongoDBDriver.addUserIfNotExist(user.getString("email"), user.getString("password"), user.getString("role"), token);
        });
        post("/login", (req, res) -> {
            JSONObject user = new JSONObject(req.body());
            System.out.println("login from " + user.getString("email"));
            return MongoDBDriver.manualLogin(user.getString("email"), user.getString("password"));
        });
        post("/token-login", (req, res) -> {
            String token = req.body();
            String payload = JWTDriver.decodeToken(token);
            JSONObject user = new JSONObject(payload);
            return MongoDBDriver.tokenLogin(user.getString("email"), user.getString("password"));
        });
        get("/get-all/:coll", (req, res) -> {
            System.out.println("get all " + req.params(":coll").toLowerCase());
            JSONObject response = MongoDBDriver.getAllOfProductType(req.params(":coll").toLowerCase());
            res.status(response.getInt( "code"));
            return response;
        });
        delete("delete-all/:coll", (req, res) -> {
            System.out.println("delete all from " + req.params(":coll"));
            JSONObject response = MongoDBDriver.deleteAllFromColl(req.params(":coll").toLowerCase());
            res.status(response.getInt("code"));
            return response;
        });
        delete("delete-selected/:coll", (req, res) -> {
            JSONObject response = MongoDBDriver.deleteSelectedFromColl(req.params(":coll").toLowerCase(),req.body());
            res.status(response.getInt("code"));
            return response;
        });
        get("random-photos/:query", (req, res) -> {
            System.out.println(req.params(":query"));

            final OkHttpClient client = new OkHttpClient();

            Request request = new Request.Builder()
                    .url("https://api.unsplash.com/search/photos?query=" + req.params(":query") + " car&per_page=30&page=1")
                    .header("accept", "application/json")
                    .header("Authorization", "Client-ID QmOcgkOnjiOK3jwyuiPOk3BA8rIVDtnskS73GnXJRK8")
                    .build();

            try (Response response = client.newCall(request).execute()) {
                if (!response.isSuccessful()) throw new IOException("Unexpected code " + response);
                res.status(200);
                return new JSONObject().put("data", response.body().string());
            } catch (IOException e) {
                e.printStackTrace();
                return new JSONObject().put("error", e.toString());
            }
        });
        post("insert-to-coll/:brand",(req,res) -> {
            JSONObject response = MongoDBDriver.insertMany(req.params(":brand").toLowerCase(), req.body());
            res.status(response.getInt("code"));
            return response;
        });
        post("order-vehicle",(req,res) -> {
            JSONObject response = MongoDBDriver.orderVehicle(req.body());
            res.status(response.getInt("code"));
            return response;
        });
//        post("add-brand", (req,res) -> {
//            JSONObject response =  MongoDBDriver.addColl(req.body());
//            res.status(response.getInt("code"));
//            return response;
//        });
        put("update-col/:brand",(req,res) -> {
            JSONObject response = MongoDBDriver.update(req.params(":brand").toLowerCase(), req.body());
            res.status(response.getInt("code"));
            return response;
        });
    }
}