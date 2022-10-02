package org.package1.utility;

public class RegisterResponse {
    private String msg;
    private String token;
    public RegisterResponse(String msg, String token) {
        this.msg = msg;
        this.token = "\""+token+"\"";
    }

    @Override
    public String toString() {
        return "{\"msg\": "+msg+", \"token\":"+token+"}";
    }
}
