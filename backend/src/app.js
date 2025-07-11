require("./appMongoose");
const express = require('express');
const cors = require('cors');
const userRoute = require('./routes/user_route');
const app = express();
const bookRoute = require('./routes/book-route');

app.use(cors());
app.use(express.json());
app.use('/user',userRoute);
app.use('/book', bookRoute);


app.listen(8080, () => {
  console.log('Library Server is running on port 8080');
});