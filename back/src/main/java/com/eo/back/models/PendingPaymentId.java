package com.eo.back.models;

import java.io.Serializable;

public class PendingPaymentId implements Serializable {

    private String date;

    private long secondPK;

    public PendingPaymentId(String date, long secondPK) {
        this.date = date;
        this.secondPK = secondPK;
    }

    public PendingPaymentId() {
    }

}
