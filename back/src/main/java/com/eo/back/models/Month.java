package com.eo.back.models;

import java.util.HashMap;

public class Month {

    private static HashMap<Integer, String> monthHash = new HashMap<>();

    private static void initHash() {
        monthHash.put(1, "Enero");
        monthHash.put(2, "Febrero");
        monthHash.put(3, "Marzo");
        monthHash.put(4, "Abril");
        monthHash.put(5, "Mayo");
        monthHash.put(6, "Junio");
        monthHash.put(7, "Julio");
        monthHash.put(8, "Agosto");
        monthHash.put(9, "Septiembre");
        monthHash.put(10, "Octubre");
        monthHash.put(11, "Noviembre");
        monthHash.put(12, "Diciembre");
    }

    public static String intToMonth(int n) {
        if(!monthHash.containsKey(1)) {
            initHash();
        }
        return monthHash.get(n);
    }

}
