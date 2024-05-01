# WSA-02 - Regisztráció

## Mint felhasználó szeretnék regisztrálni, hogy a megadott adatokkal beléphessek az alkalmazásba

### Pontok: 3
### Szolgáltatás: [POST /user](http://localhost:5000/api-doc#/Users/AuthController_register)
### Prioritás: magas

A feladat egy regisztrációs form létrehozása, adatok bekérése a felhasználótól és azok kliens oldali validációja, majd ezen adatok elküldése a WebshopAPI megfelelő szolgáltatásához. Adjunk lehetőséget a felhasználónak, hogy a számlázási cím megegyezzen a szállítási címmel.  
Az adott mező adatait akkor validáljuk, ha a felhasználó elhagyta a mezőt - amennyiben a mező hibát tartalmaz, emeljük ki azt és jelenítsünk meg a hibát a mező közvetlen környezetében.
Sikeres regisztrációt követően jelezzük azt a felhasználó számára egy felugró ablakban és biztosítsunk lehetőséget a belépésre. A regisztrációs form tartalmát állítsuk alaphelyzetbe.  
Amennyiben a regisztráció során hiba történt, jelezzük azt a felhasználó számára egy üzenet formájában (például az email címet már valaki használja).  
Az oldalon 2 gomb legyen elérhető:
- Mégsem - mindig aktív, ha a felhasználó rákattint, visszaállítja a form eredeti állapotát (üres mezők)
- Regisztráció - amíg a form hibás adatokat tartalmaz, ne lehessen a tartalmát elküldeni

#### Regisztrációs adatok:
- Felhasználónév
  - mezőnév: username
  - típus: szöveg, email cím bekérése
  - validáció:
    - Kötelező kitölteni
    - Email címet kell tartalmazzon
- Jelszó
  - mezőnév: password
  - típus: szöveg, jelszó
  - validáció:
    - Kötelező kitölteni
    - A jelszónak legalább 8 karakter hosszúnak kell lennie legalább 1 számmal és 1 kisbetűvel
- Jelszó megerősítése
  - mezőnév: passwordConfirm
  - típus: szöveg, jelszó
  - validáció:
    - Kötelező kitölteni
    - a tartalma meg kell egyezzen a jelszó mezővel
- Vezetéknév
  - mezőnév: lastname
  - típus: szöveg
  - validáció:
    - Kötelező kitölteni
- Keresztnév
  - mezőnév: firstname
  - típus: szöveg
  - validáció:
    - Kötelező kitölteni
- Szállítási cím (kötelező megadni)
  - név
    - mezőnév: shippingAddress.name
    - típus: szöveg
    - validáció:
      - kötelező kitölteni
  - ország
    - mezőnév: shippingAddress.country
    - típus: szöveges
    - validáció:
      - kötelező kitölteni
  - város
    - mezőnév: shippingAddress.city
    - típus: szöveges
    - validáció:
      - kötelező kitölteni
  - utca, házszám
    - mezőnév: shippingAddress.street
    - típus: szöveges
    - validáció:
      - kötelező kitölteni
  - irányítószám
    - mezőnév: shippingAddress.zip
    - típus: szöveges
    - validáció:
      - kötelező kitölteni
  - telefonszám
    - mezőnév: shippingAddress.phoneNumber
    - típus: szöveges
    - validáció:
      - kötelező kitölteni
      - csak nemzetközi formátum (+-al kezdődő érték), tagoló elemek nélkül (csak számok)
- Számlázási cím
  - név
    - mezőnév: billingAddress.name
    - típus: szöveg
    - validáció:
      - kötelező kitölteni
  - adószám
    - mezőnév: billingAddress.taxNumber
    - típus: szöveg
    - validáció:
      - opcionálisan kitölthető
      - 11 számjegyből áll
  - ország
    - mezőnév: billingAddress.country
    - típus: szöveges
    - validáció:
      - kötelező kitölteni
  - város
    - mezőnév: billingAddress.city
    - típus: szöveges
    - validáció:
      - kötelező kitölteni
  - utca, házszám
    - mezőnév: billingAddress.street
    - típus: szöveges
    - validáció:
      - kötelező kitölteni
  - irányítószám
    - mezőnév: billingAddress.zip
    - típus: szöveges
    - validáció:
      - kötelező kitölteni

#### Példa bemeneti adatra:
```
{
  "username": "superuser@usa.com",
  "password": "IamNumbuh1",
  "passwordConfirm": "IamNumbuh1",
  "firstName": "George",
  "lastName": "Washington",
  "shippingAddress": {
    "name": "President of U.S.A.",
    "country": "United States of America",
    "city": "Washington D.C.",
    "street": "1600 Pennsylvania Avenue NW",
    "zip": "20500 U.S.",
    "phoneNumber": "+36201234567"
  },
  "billingAddress": {
    "name": "President of U.S.A.",
    "country": "United States of America",
    "city": "Washington D.C.",
    "street": "1600 Pennsylvania Avenue NW",
    "zip": "20500 U.S.",
    "taxNumber": "12345678911"
  }
}
```

#### Sikeres regisztráció
201 Created válaszkód
```
{
  "userId": "ddf1417e-f4df-4dcf-ad25-a154bb121554",
  "email": "superuser@usa.com",
  "firstName": "George",
  "lastName": "Washington",
  "shippingAddress": {
    "name": "President of U.S.A.",
    "country": "United States of America",
    "city": "Washington D.C.",
    "street": "1600 Pennsylvania Avenue NW",
    "zip": "20500 U.S.",
    "phoneNumber": "+36201234567"
  },
  "billingAddress": {
    "name": "President of U.S.A.",
    "country": "United States of America",
    "city": "Washington D.C.",
    "street": "1600 Pennsylvania Avenue NW",
    "zip": "20500 U.S."
  }
}
```

#### A szolgáltatás által visszajelzett hibák:
- 400 Bad request - a bevitt adatok érvénytelenek
- 409 Conflict - a felhasználó már létezik