const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');

dotenv.config();

const app = express();

app.use(helmet());
// ... rest of your code ...