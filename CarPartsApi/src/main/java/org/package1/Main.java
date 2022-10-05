package org.package1;

import com.google.gson.Gson;
import org.package1.utility.LoginResponse;
import org.package1.utility.RegisterResponse;
import org.package1.utility.User;

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
        post("/register", (req,res) -> {
            User user = gson.fromJson(req.body(), User.class);
            String token = JWTDriver.createToken(user.email, user.password, user.role);
            String msg = MongoDBDriver.addUserIfNotExist(user.email, user.password, user.role, token);
            return gson.toJson(new RegisterResponse(msg, token).toString());
        });
        post("/login", (req,res) -> {
            User user = gson.fromJson(req.body(), User.class);
            String token = JWTDriver.createToken(user.email, user.password, user.role);
            String msg = MongoDBDriver.manualLogin(user.email, user.password, user.role, token);
            return gson.toJson(new LoginResponse(msg, token).toString());
        });
        post("/token-login", (req,res) -> {
            String token = req.body();
            String payload = JWTDriver.decodeToken(token);
            User user = gson.fromJson(payload, User.class);
            String msg = MongoDBDriver.tokenLogin(user.email, user.password);
            return gson.toJson(new LoginResponse(msg).toString());
        });
        get("/get-all/:type",(req,res) -> {
            switch (req.params(":type")) {
                case "brands":{
                    return MongoDBDriver.getAllOfProductType(MongoDBDriver.BRANDS_COL);
                }
                case "sedan":{
                    return MongoDBDriver.getAllOfProductType(MongoDBDriver.SEDAN_COL);
                }
                case "wagon":{
                    return MongoDBDriver.getAllOfProductType(MongoDBDriver.WAGON_COL);
                }
                case "suv":{
                    return MongoDBDriver.getAllOfProductType(MongoDBDriver.SUV_COL);
                }
                case "sport":{
                    return MongoDBDriver.getAllOfProductType(MongoDBDriver.SPORT_COL);
                }
                case "compact":{
                    return MongoDBDriver.getAllOfProductType(MongoDBDriver.COMPACT_COL);
                }
                default: return "";
            }
        });
    }
}