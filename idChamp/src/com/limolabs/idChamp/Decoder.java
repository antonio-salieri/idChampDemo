package com.limolabs.idChamp;

/**
 * Created by lazar on 1/6/16.
 */
public class Decoder {
    final static long HID_CORP_1000_BITS = 35L;
    final static long HID_CORP_1000_CARD_ID_MASK = 0x1ffffe;

    /**
     * Decodes raw number fetched form the reader into card
     * number and facility number, wrapped into Card object
     *
     * @param raw_id
     * @return Wrapper object of Card type which contains
     *         card number and facility number
     */
    public static Card decode(Long raw_id) {
        int card_id;
        int facility_id;

        long high_half = raw_id >> 32;
        long low_half = raw_id & 0xFFFFFFFF;
        long combined = (high_half << 32) | low_half;
        long mask = ~(1L << (HID_CORP_1000_BITS + 1L));
        long bit_pattern = combined & mask;

        card_id = (int) ((bit_pattern & HID_CORP_1000_CARD_ID_MASK) >> 1);
        facility_id = (int) (bit_pattern & 0x1FFE00000L) >> 21;

        return new Card(card_id, facility_id);
    }
}
