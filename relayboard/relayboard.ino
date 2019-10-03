int relay = 12;
void setup() {
  // put your setup code here, to run once:
  pinMode(relay, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  if(Serial.available() > 0){
    char input = Serial.read();
    Serial.println(input);
    if(input == 'T'){
      Serial.println("tazing");
      taze();
    }
    input = '!';
  }
}

void taze(){
  digitalWrite(relay, HIGH);
  delay(200);
  digitalWrite(relay, LOW);
  delay(3000);
  digitalWrite(relay, HIGH);
  delay(200);
  digitalWrite(relay, LOW);
}

