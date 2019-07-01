import express from 'express';
import bodyParser from 'body-parser';
const app = express();// get all todos
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/log_in/:user_id/:password', (req, res) => {
  var is_valid = true;

  if(is_valid) {

    var info = account_info(req.params.user_id);

    res.status(200).send(info);
  }
  else{
    res.status(200).send({
      error_log : 'Username and password does not match'  
    });
  }
});

app.get('/check_balance/:user_id', (req, res) => {

  var info = account_info(req.params.user_id);

  res.status(200).send(info);
});

app.post('/sign_up', (req, res) => {
  var sign_up_status = user_sign_up(req.body.user_id, req.body.password, req.body.email_address);
  return res.status(200).send(sign_up_status);
});

app.post('/send_money', (req, res) => {
  var send_status = send_money(req.body.receiver_id, req.body.password, req.body.amount);
  return res.status(200).send(send_status);
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});