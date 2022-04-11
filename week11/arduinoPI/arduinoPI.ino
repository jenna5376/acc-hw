int counter = 0; 
int buttonB = 12;
int buttonG = 11;
int buttonY = 10;
int buttonR = 9;
int lightSensor = A4;
int sensorValue = analogRead(A4);
#include "Keyboard.h"


void setup(){
  Serial.begin(1000);

  pinMode(buttonB, OUTPUT); 
  pinMode(buttonG, OUTPUT);      
  pinMode(buttonY, OUTPUT);  
  pinMode(buttonR, OUTPUT);
  
  pinMode(3,INPUT); 
  pinMode(A4, INPUT);
}

void loop(){
  
 if(digitalRead(3)!=0){           
     counter++; 
      Serial.print("button pressed; COUNTER: ");
      Serial.println(counter);
     delay(250);  
     Keyboard.write(' ');
  }

  if(counter==0){                      
     digitalWrite(buttonB, LOW);      
    digitalWrite(buttonR, HIGH);    
  }
  else if(counter==1){
     digitalWrite(buttonR, LOW);       
     digitalWrite(buttonY, HIGH);      
  }
  else if(counter==2){
     digitalWrite(buttonY, LOW);       
     digitalWrite(buttonG, HIGH);      
  }
  else if(counter==3){
     digitalWrite(buttonG, LOW);       
     digitalWrite(buttonB, HIGH); 
  }    
  else{
    counter = 0;
  }
                
}

