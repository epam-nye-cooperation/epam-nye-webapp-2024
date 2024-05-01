# WSA-03 - Profil és kilépés

## Mint belépett felhasználó, szeretném elérni a regisztráció során megadott adataimat

### Pontok: 1
### Szolgáltatás: [GET /user](http://localhost:5000/api-doc#/Users/AuthController_getProfile)
### Prioritás: magas

A feladat, hogy az oldalon jelezzük, ha a felhasználó már belépett és elérhet zárolt szolgáltatásokat vagy belépés szükséges. Legyen látható a felhasználó vezeték- és keresztneve, illetve email címe és biztosítsunk lehetőséget a kilépésre. Legyen dedikált oldala is ezen adatoknak.
Kilépés esetén a [belépésnél](./WSA-01.md) eltárolt tokent töröljük, az authorizációhoz kötött szolgáltatásokat pedig ne engedélyezzük a továbbiakban.  

Az adatok lekéréséhez használjuk az Authorization header-t a request-ben. Hiba esetén léptessük ki a felhasználót és irányítsuk át a belépési oldalra.

#### Sikeres lekérdezés
200 OK válaszkód
```
{
  "userId": "c3621d67-c304-41ad-b965-907f74d46bf2",
  "email": "numbuh1@knd.com",
  "firstName": "Nigel",
  "lastName": "Uno",
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

#### A szolgáltatás által visszajelzett hibák:
- 401 Unauthorized - hiányzó vagy érvénytelen Bearer token