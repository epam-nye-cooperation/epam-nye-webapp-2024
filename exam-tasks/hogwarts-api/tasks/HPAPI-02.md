# HPAPI-02 - Regisztráció

## Mint varázslótanonc szeretnék regisztrálni, hogy a megadott adatokkal beléphessek az alkalmazásba

### Pontok: 3
### Szolgáltatás: [POST /user](http://localhost:5000/api-doc#/Users/AuthController_register)
### Prioritás: magas

A feladat egy regisztrációs form létrehozása, adatok bekérése a felhasználótól és azok kliens oldali validációja, majd ezen adatok elküldése a HogwartsAPI megfelelő szolgáltatásához. Az oldalon az értesítési cím megadása nem kötelező, viszont ha bármelyik mező értéke meg van adva, az összes többi ide kapcsolódó kitöltése is kötelező. Adjunk lehetőséget a felhasználónak, hogy megegyezzen a lakcímmel.  
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
- Lakcím (kötelező megadni)
  - név
    - mezőnév: homeAddress.name
    - típus: szöveg
    - validáció:
      - kötelező kitölteni
  - ország
    - mezőnév: homeAddress.country
    - típus: szöveges
    - validáció:
      - kötelező kitölteni
  - város
    - mezőnév: homeAddress.city
    - típus: szöveges
    - validáció:
      - kötelező kitölteni
  - utca, házszám
    - mezőnév: homeAddress.street
    - típus: szöveges
    - validáció:
      - kötelező kitölteni
  - irányítószám
    - mezőnév: homeAddress.zip
    - típus: szöveges
    - validáció:
      - kötelező kitölteni
- Értesítési cím (opcionális; viszont ha egy mező ki van töltve, minden más idetartozó érték is kötelező)
  - név
    - mezőnév: notificationAddress.name
    - típus: szöveg
    - validáció:
      - kötelező kitölteni
  - ország
    - mezőnév: notificationAddress.country
    - típus: szöveges
    - validáció:
      - kötelező kitölteni
  - város
    - mezőnév: notificationAddress.city
    - típus: szöveges
    - validáció:
      - kötelező kitölteni
  - utca, házszám
    - mezőnév: notificationAddress.street
    - típus: szöveges
    - validáció:
      - kötelező kitölteni
  - irányítószám
    - mezőnév: notificationAddress.zip
    - típus: szöveges
    - validáció:
      - kötelező kitölteni

#### Példa bemeneti adatra:
```
{
  "username": "severus.snape@hogwarts.co.uk",
  "password": "AlwaysL1lly",
  "passwordConfirm": "AlwaysL1lly",
  "firstName": "Severus",
  "lastName": "Snape",
  "homeAddress": {
    "name": "Severus Snape",
    "country": "United Kingdom",
    "city": "Cokeworth",
    "street": "Spinner's End 7",
    "zip": "9GFF+GG"
  },
  "notificationAddress": {
    "name": "Severus Snape",
    "country": "United Kingdom",
    "city": "Cokeworth",
    "street": "Spinner's End 7",
    "zip": "9GFF+GG"
  }
}
```

#### Sikeres regisztráció
201 Created válaszkód
```
{
  "userId": "ef9aac86-2e9b-4779-be02-7286f6e6c4d2",
  "email": "severus.snape@hogwarts.co.uk",
  "firstName": "Severus",
  "lastName": "Snape",
  "homeAddress": {
    "name": "Severus Snape",
    "country": "United Kingdom",
    "city": "Cokeworth",
    "street": "Spinner's End 7",
    "zip": "9GFF+GG"
  },
  "notificationAddress": {
    "name": "Severus Snape",
    "country": "United Kingdom",
    "city": "Cokeworth",
    "street": "Spinner's End 7",
    "zip": "9GFF+GG"
  }
}
```

#### A szolgáltatás által visszajelzett hibák:
- 400 Bad request - a bevitt adatok érvénytelenek
- 409 Conflict - a felhasználó már létezik