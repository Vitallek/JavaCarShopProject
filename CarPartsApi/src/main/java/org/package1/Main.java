package org.package1;

import com.google.gson.Gson;
import okhttp3.Headers;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.package1.utility.LoginResponse;
import org.package1.utility.RegisterResponse;
import org.package1.utility.User;

import java.io.IOException;
import java.net.URI;
import java.net.URL;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;

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
            User user = gson.fromJson(req.body(), User.class);
            String token = JWTDriver.createToken(user.email, user.password, user.role);
            String msg = MongoDBDriver.addUserIfNotExist(user.email, user.password, user.role, token);
            return gson.toJson(new RegisterResponse(msg, token).toString());
        });
        post("/login", (req, res) -> {
            User user = gson.fromJson(req.body(), User.class);
            return MongoDBDriver.manualLogin(user.email, user.password);
        });
        post("/token-login", (req, res) -> {
            String token = req.body();
            String payload = JWTDriver.decodeToken(token);
            User user = gson.fromJson(payload, User.class);
            String msg = MongoDBDriver.tokenLogin(user.email, user.password);
            return gson.toJson(new LoginResponse(msg).toString());
        });
        get("/get-all/:coll", (req, res) -> {
            System.out.println(req.params(":coll").toLowerCase());
            res.status(200);
            return MongoDBDriver.getAllOfProductType(req.params(":coll").toLowerCase());
        });
        delete("delete-all/:coll", (req, res) -> {
            if (MongoDBDriver.deleteAllFromColl(req.params(":coll").toLowerCase()).equals("success")) {
                res.status(200);
                return "success";
            }
            res.status(500);
            return "error";
        });
        delete("delete-selected/:coll", (req, res) -> {
            if (MongoDBDriver.deleteSelectedFromColl(req.params(":coll").toLowerCase(),req.body()).equals("success")) {
                res.status(200);
                return "success";
            }
            res.status(500);
            return "error";
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
                return gson.toJson(response.body().string());
            }
        });
        put("insert-many/:brand",(req,res) -> {
            if (MongoDBDriver.insertMany(req.params(":brand").toLowerCase(), req.body()).equals("success")) {
                res.status(200);
                return "success";
            }
            res.status(500);
            return "error";
        });
    }
}