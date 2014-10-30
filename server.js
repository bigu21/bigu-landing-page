var express       = require('express');
var app           = express();
var bodyParser    = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 1337;

app.use(express.static(__dirname + '/app'));

var router = express.Router();

app.use('/', router);

app.listen(port);
console.log('Listening on port: ' + port);

router.route('/').post(function(req, res) {
    // XXX change domain from mailgun to our TLD
    var api_key = 'key-1w-hfo0td1ezibvew4762265vc0vgj-3';
    var domain = 'sandbox5e63f7b34bcd42b0acc7764910a9ff58.mailgun.org';
    var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

    var user = {
      subscribed: true,
      address: req.body.email
    };

    var list = mailgun.lists('landing-page-subscribers@sandbox5e63f7b34bcd42b0acc7764910a9ff58.mailgun.org'); 

    list.members().create(user, function(err, data) {
      if(err) {
        res.json({ error: true });
        console.error("Error creating user on list"); 
      } else {
        res.json({ success: 'Email sent' }); 
      }
    });

});

