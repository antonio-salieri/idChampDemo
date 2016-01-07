package com.example.idChampDemo;

import android.view.inputmethod.EditorInfo;
import android.widget.*;
import android.widget.TextView.OnEditorActionListener;
import android.app.Activity;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.View;
import com.limolabs.hid1000.Card;
import com.limolabs.hid1000.Decoder;

import java.util.ArrayList;

public class MainActivity extends Activity {

    ArrayList<String> cardNumbers = new ArrayList<String>();

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);


        ListView cardList = (ListView) findViewById(R.id.cardNumbers);
        ArrayAdapter<String> adapter = new ArrayAdapter<String>(this,
                android.R.layout.simple_list_item_1,
                cardNumbers);
        cardList.setAdapter(adapter);

        EditText cardInput = (EditText) findViewById(R.id.cardInput);
        cardInput.setOnEditorActionListener(new OnEditorActionListener() {
            @Override
            public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {

                if (KeyEvent.KEYCODE_ENTER != event.getKeyCode() ||
                        KeyEvent.ACTION_DOWN != event.getAction()) {
                    return false;
                }

                EditText el = (EditText) v;
                String s = el.getText().toString();

                addCardNumber(s);
                el.setText("");
                return true;
            }

            private void addCardNumber(String cardNumber) {
                Card card = Decoder.decode(Long.parseLong(cardNumber));
                cardNumbers.add(Integer.toString(card.getCardNumber()));
                adapter.notifyDataSetChanged();
            }
        });

        Button clr = (Button) findViewById(R.id.clearList);
        clr.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                cardNumbers.clear();
                adapter.notifyDataSetChanged();
            }
        });
    }
}
