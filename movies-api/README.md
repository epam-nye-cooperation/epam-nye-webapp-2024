# Movies API

## Leírás

Movies API a Nyíregyházi Egyetem Webalkalmazás-fejlesztés tantárgyához szükséges szerver oldali alkalmazás  
A [Nest](https://github.com/nestjs/nest) framework-re alapoz, jelen kódbázis eredetije: https://github.com/VarvaraZadnepriak/MoviesAPI.ReactJS

## Követelmények
Legalább Node.JS 18

## Telepítés

```bash
$ yarn install
```

Telepítés után hozz létre egy `.env` file-t a package.json mellé. Ez tartalmazza a konfigurációt. Tartalma:
```bash
API_PORT=5000
# sample value - override is highly suggested
JWT_TOKEN_SECRET=This1s@secr3tKey
```
A JWT_TOKEN_SECRET értéke szabadon változtatható, belépésnél van hatása. Az API_PORT a szerver indítási pontját befolyásolja.

## Az alkalmazás futtatása

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Swagger
Az API teljes dokumentációja megtalálható az indítást követően az `/api-doc` könyvtárban: http://localhost:5000/api-doc