package com.limolabs.hid1000;

/**
 * Created by lazar on 1/7/16.
 */
public class Card {
    private int cardNumber;
    private int facilityNumber;

    public Card(int card_number, int facility_number) {
        this.cardNumber = card_number;
        this.facilityNumber = facility_number;
    }

    public int getCardNumber() {
        return cardNumber;
    }

    public int getFacilityNumber() {
        return facilityNumber;
    }
}
