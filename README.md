### Arquivo em edição!

# dev-radar

Obs: Para o `navigator.geolocation.getCurrentPosition()` funcionar, deverá seu usado o seguinte comando na pasta onde o projeto foi criado com `create react-app`.

```
set HTTPS=true&&yarn(or npm) start
```
Mais informações: https://developers.google.com/web/updates/2016/04/geolocation-on-secure-contexts-only

Nesse caso, precisará utilizar um servidor HTTPS, então utilize esse comando para gerar um certificado válido
`openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365`

    const server = https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    passphrase: '3941'
}, app)

server.listen(3333)

NodeJS

Express

Nodemon

Insomnia

MongoDB Atlas

Mongoose

Axios

ReactJS

Yarn

