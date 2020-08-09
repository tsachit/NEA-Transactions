const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');

const { openBrowser, goto, $, click, dropDown, textBox, into, write, clear, evaluate, closeBrowser } = require('taiko');

const { locations } = require('./utils');

const app = express();
const hbs = exphbs.create({ /* config */ });

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }))

// Register `hbs.engine` with the Express app.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(function(req, res, next) {
  res.locals.copyrightYear = new Date().getFullYear();
  next();
});

app.get('/', (req, res) => {
  res.render('home', {locations});
});

app.get('/test', (req, res) => {
  res.send('this is a test');
});

app.post("/", function(req, res) {
  //Grab the request body
  let { nea_location, sc_no, consumer_id, from_date, to_date } = req.body;

  (async () => {
    try {
      // await closeBrowser();
      await openBrowser();
      await goto('https://www.neabilling.com/viewonline');

      await dropDown({id:'NEA_location'}).select(nea_location);

      await write(sc_no, into(textBox({id: 'sc_no'})));
      await write(consumer_id, into(textBox({id: 'consumer_id'})));

      await clear(textBox({id: 'Fromdatepicker'}));
      await write(from_date, into(textBox({id: 'Fromdatepicker'})));

      await clear(textBox({id: 'Todatepicker'}));
      await write(to_date, into(textBox({id: 'Todatepicker'})));

      await click($("#btnSubmit"));

      // Extract the results from the page
      const htmlContent = await evaluate(()=>{
        const tableTD = document.getElementsByClassName('coltext')[0];
        // removes logo tr
        if(tableTD.querySelectorAll('tbody>tr')[0].innerHTML.indexOf("logo") !== -1) {
          tableTD.querySelectorAll('tbody>tr')[0].remove();
        }
        // for bootstrap
        tableTD.querySelectorAll('table')[0].classList.add("table", "table-responsive");
        return tableTD.innerHTML;
      });

      res.render('table', {htmlContent});
      // res.send(htmlContent);
    } catch (error) {
      console.error(error);
    } finally {
      await closeBrowser();
    }
  })();
});

app.listen(5000, function() {});