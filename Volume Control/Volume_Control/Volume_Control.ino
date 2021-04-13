
// LIDAR TFMINIPLUS
#include <TFMPlus.h>  // TFMini Plus Library v1.4.1
TFMPlus tfmP;
#define RX2_Pin 16
#define TX2_PIN 17
// Distance to object in centimeters
#define TRIG_MIN 2 //cm
#define TRIG_MAX 200 //cm
int16_t tfDist = 0;

// OPTOCOUPLER
const byte pwm_pin_1 = 12;
const byte pwm_pin_2 = 14;
int value = 0;
int inc = 1;
int val = 0;


void setup()
{
    // SERIAL
    Serial.begin(115200);
    delay(20);

    // SERIAL 2
    Serial2.begin(115200, SERIAL_8N1, RX2_Pin, TX2_PIN);
    delay(20);
    tfmP.begin( &Serial2);

    // PWM
    ledcAttachPin(pwm_pin_1, 0);
    ledcAttachPin(pwm_pin_2, 1);
    // ledcSetup(pwmChannel, frequence, resolution);
    // --> 22 kHz PWM, 8-bit resolution -- >20kHz, -> pwm noise inaudible
    ledcSetup(0, 24000, 8);
    ledcSetup(1, 24000, 8);

    delay(500);
}


void loop()
{
    delay(10);
    bool detect = liddar_check();

    // if (detect){
    //   Serial.println("SOMEONE");
    // }else Serial.println("NOONE");


    if(detect && value < 40){
      value = value + inc;
    }
    if(!detect && value >= inc){
      value = value - inc;
    }

    Serial.println(value);

    ledcWrite(0, value);
    ledcWrite(1, value);
    delay(50);

}

bool liddar_check(){

  tfmP.getData(tfDist);
  printf( "tfDist: %icm \r\n", tfDist);
  if (tfDist < TRIG_MAX && tfDist > TRIG_MIN) return true;
  else return false;

}
