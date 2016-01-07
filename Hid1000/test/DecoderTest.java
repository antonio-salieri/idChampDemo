/**
 * Created by lazar on 1/7/16.
 */

import com.limolabs.hid1000.Decoder;
import junit.framework.TestCase;


public class DecoderTest extends TestCase{
    public void testGivenRawId_returnsCorrectCardNumber() {
        assertEquals(Decoder.decode(0x2E3E29C2DEL).getCardNumber(), 319855);
        assertEquals(Decoder.decode(0x2E3E29C2DEL).getFacilityNumber(), 497);
    }
}
