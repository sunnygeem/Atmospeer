const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const axios = require('axios');
const http = require('http');
const port = 3001;
const cors = require('cors');

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.get('/api/user', (req, res) => {
  const options = {
    hostname: '192.249.29.49',
    port: 8080,
    path: '/users',
    method: 'GET'
  };

  const externalReq = http.request(options, (externalRes) => {
    let data = '';

    externalRes.on('data', (chunk) => {
      data += chunk;
    });

    externalRes.on('end', () => {
      // 받은 데이터를 다시 클라이언트에게 응답
      res.json({ responseData: data });
      console.log(data);
    });
  });

  externalReq.end();
});

app.use(express.urlencoded({
    extended: true
}))

app.get('/api/login', (req, res) => {
    console.log("Received POST request");

    const id = req.query.id;
    const password = req.query.password;

    const options = {
        hostname: '192.249.29.49',
        port: 8080,
        path: `/login?id=${encodeURIComponent(id)}&password=${encodeURIComponent(password)}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };

    const externalReq = http.request(options, (externalRes) => {
        let data = '';

        externalRes.on('data', (chunk) => {
            data += chunk;
        });

        externalRes.on('end', () => {
            // 받은 데이터를 다시 클라이언트에게 응답
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ responseData: data }));
        });
    });

    // 오류 처리
    externalReq.on('error', (error) => {
        console.error(`Error in external request: ${error.message}`);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    });

    // 요청 종료
    externalReq.end();
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
