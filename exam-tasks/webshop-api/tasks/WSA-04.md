# WSA-04 - Adatok módosítása

## Mint belépett felhasználó, szeretném módosítani a korábban megadott adataimat

### Pontok: 2
### Szolgáltatás: [PUT /user](http://localhost:5000/api-doc#/Users/AuthController_updateProfile)
### Prioritás: közepes

A feladat egy olyan form létrehozása, ahol a felhasználó módosítani tudja az általa megadott vezeték- és keresztnevet, valamint szállítási- és számlázási címét. A módosítást követően az új adatok legyenek láthatóak az oldalon (lásd [Profil és kilépés](./WSA-03.md))  
Hibás adatok nem küldhetőek a szolgáltatáshoz, kliens oldalon ellenőrizzük azokat. Amennyiben 401-es hibát kapunk válaszul, [léptessük ki a felhasználót](./WSA-03.md) és irányítsuk át a belépési oldalra.  
Az oldal csak belépett felhasználók számára elérhető, az URL cím beütésekor érvényesítsük a felhasználó adatait és hiba esetén irányítsuk át a belépő oldalra.  
A jelszót és email címet ezen az oldalon nem lehet megváltoztatni.

#### Bemeneti adatok:
Lásd: [regisztráció](./WSA-02.md). Az email cím, jelszó és jelszó megerősítése mezőket itt el kell hagyni.

#### Példa bemeneti adatra:
```
{
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

#### Sikeres adatmódosítás
200 OK válaszkód
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
- 401 Unauthorized - hiányzó vagy érvénytelen token