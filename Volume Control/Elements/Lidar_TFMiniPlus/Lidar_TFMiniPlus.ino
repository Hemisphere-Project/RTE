#include <TFMPlus.h>  // TFMini Plus Library v1.4.1
TFMPlus tfmP;

#define RX2_Pin 16
#define TX2_PIN 17

// Distance to object in centimeters
#define TRIG_MIN 2 //cm
#define TRIG_MAX 200 //cm

int16_t tfDist = 0;


void setup()
{
    // SERIAL
    Serial.begin( 115200);
    delay(20);
    // SERIAL 2
    Serial2.begin(115200, SERIAL_8N1, RX2_Pin, TX2_PIN);
    delay(20);
    tfmP.begin( &Serial2);

    delay(500);
}


void loop()
{
    delay(50);
    bool trig = liddar_check();

    if (trig){
      Serial.println("SOMEONE");
    }
    else {
      Serial.println("NOONE");
    }

}

bool liddar_check(){

  if( tfmP.getData(tfDist) )
  {
    // printf( "tfDist: %icm \r\n", tfDist);
    if (tfDist < TRIG_MAX && tfDist > TRIG_MIN) return true;
    else return false;
  }

}
