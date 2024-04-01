const express = require('express');
const User = require('./user');
const connect = require('./db');
const app = express();
app.use(express.json())
const PORT = 8090;

const { body, validationResult } = require('express-validator');

const validateUser = [
  body('name').notEmpty().withMessage('Name required'),
  body('email').isEmail().withMessage('Invalid email'),
  body('phone').isMobilePhone().withMessage('Invalid phone number'),
  body('image').optional().isURL().withMessage('Invalid URL'),
  body('status').isBoolean().withMessage('Status must boolean value')
];

app.post('/users', validateUser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});


app.post('/users', async (req, res) => {
   let data= await User.create(req.body)
   res.send(data);
});

app.get('/get', async (req, res) => {
   let read= await User.find(req.body)
   res.send(read);
});

app.patch('/update/:id', async (req, res) => {
  let update= await User.findByIdAndUpdate(req.params.id,req.body);
  res.send(update);
});

app.delete('/delete/:id', async (req, res) => {
   let delet=await User.findByIdAndDelete(req.params.id)
   res.send(delet)
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connect()
});
