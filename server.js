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

    var MailChimpAPI = require('mailchimp').MailChimpAPI;
    var apiKey = '0b0b727f9f27708a159f38bf623798db-us9';

    try {
        var api = new MailChimpAPI(apiKey, { version : '2.0' });
    } catch (error) {
        console.log(error.message);
    }


    var userChimp = {
        //FNAME: req.body.nome,
        //WHATSAPP: req.body.wpp,
        //ALLOWWPP: req.body.allowWpp,
        //ALLOWGNT: req.body.allowGnt,
        //ORIGIN: req.body.canal
    };

    api.call('lists', 'subscribe', { double_optin: false, send_welcome: false, id: 'f46c5f4b06',  email:{"email": req.body.email}, merge_vars:userChimp }, function (err, data) {
      if (err) {

        if(err.code ===  214) { // Already Subscribed
          res.json({ error: true, errorType: 'already-registered' });
        } else if(err.code === -100) { // Invalid email
          res.json({ error: true, errorType: 'invalid-email' });
        } else {
          res.json({ error: true, errorType: 'generic-error' });
        }
      } else
        res.json({ success: 'Email sent' }); 
    });


    //// XXX change domain from mailgun to our TLD
    //var api_key = 'key-1w-hfo0td1ezibvew4762265vc0vgj-3';
    //var domain = 'sandbox5e63f7b34bcd42b0acc7764910a9ff58.mailgun.org';
    //var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

    //var user = {
      //subscribed: true,
      //address: req.body.email
    //};

    //var list = mailgun.lists('landing-page-subscribers@sandbox5e63f7b34bcd42b0acc7764910a9ff58.mailgun.org'); 

    //list.members().create(user, function(err, data) {
      //if(err) {
        //res.json({ error: true });
        //console.error("Error creating user on list"); 
      //} else {
        //res.json({ success: 'Email sent' }); 
      //}
    //});

});
