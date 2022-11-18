const express = require('express');
const { default: mongoose } = require('mongoose');
const jwt = require("jsonwebtoken");
const cors = require('cors');
const methodOverride = require('method-override');

const thingRouter = require('./routes/thing-routes');
const smurfRouter = require('./routes/smurf-routes');
const deepartRouter = require("./routes/deepart-routes");
const apiRouter = require("./routes/api-routes");
const userRouter = require("./routes/user-routes");
const modelRouter = require("./routes/model-routes");
const equipmentRouter = require("./routes/equipment-routes");
const locationRouter = require("./routes/location-routes");

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 7952;

app.use(cors({
  origin: [
    'http://localhost:3000',
    'final-client.onrender.com',
    'http://final-client.onrender.com',
    'https://final-client.onrender.com'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/api/v1/smurfs', smurfRouter);
app.use('/api/v1/things', thingRouter);
app.use('/api/v1/deepart', deepartRouter);
app.use('/api/v1/apis', apiRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/models', modelRouter);
app.use('/api/v1/equipment', equipmentRouter);
app.use('/api/v1/locations', locationRouter);


mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log(`${mongoose.connection}`)
})




app.listen(PORT, () => console.log(`server availble at port ${PORT}`));

