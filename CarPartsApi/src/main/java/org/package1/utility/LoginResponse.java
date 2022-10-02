package org.package1.utility;

public class LoginResponse {
    private String msg;
    private String token;
    public LoginResponse(String msg) {
        this.msg = msg;
        this.token = null;
    }
    public LoginResponse(String msg, String token) {
        this.msg = msg;
        this.token = "\""+token+"\"";
    }

    @Override
    public String toString() {
        return "{\"msg\": "+msg+",\"token\":"+token+"}";
    }
}
