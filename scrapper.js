const HTMLParser = require('node-html-parser');
const puppeteer = require('puppeteer');
const fs = require('fs');
console.log('Bulaba');

exports.scrape = async () => {
  try {
    const home = 'https://coinmarketcap.com/';
    // const next = 'https://www.bbb.org/us/al/birmingham/profile/carpet-and-rug-cleaners/new-wave-carpettile-care-llc-0463-90120292';
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36');
    await page.setBypassCSP(true);
    await page.setDefaultNavigationTimeout(0);
    await page.goto(home, { waitUntil: 'networkidle0' });
    await page.keyboard.press("PageDown");
    console.log(await page.title());
    console.log('chrome is running');

    // await page.screenshot({ path: 'newpage.png' });
/*
    const linkUrl = await page.evaluate(() => {
      const link = document.querySelector('.bbb-acred');
      return link ? link.href : null;
    });
    console.log(linkUrl);
 
    if (linkUrl) {
      await page.goto(linkUrl);
      // await page.waitForNavigation();

      console.log(await page.title());
    } else {
      console.log('link not found');
    }

    // await page.screenshot({ path: 'newpage.png' });

  */

    const cryptoHTML = await page.evaluate(() => {
      const cryptoList = document.querySelectorAll('.ftyCrT tbody tr');

      return Array.from(cryptoList).map((crypto) => {
        const allHtml = crypto.innerHTML;
        const stringHtml = String(`<div class='crypto-block'>${allHtml}</div>`).replaceAll(',', '').replace('sc-97d6d2ca-0', 'sc-97d6d2ca-1');
        return stringHtml;
      });
    });

    const buildJSON = () => {
      const parsedHTML = HTMLParser.parse(cryptoHTML);
      const cryptoBlock = parsedHTML.querySelectorAll('.iqdbQL');

      const cryptoData = cryptoBlock.map((div, i) => {
        const coinimage = parsedHTML.querySelectorAll('.coin-logo')[i].getAttribute("src");
        const coincode = parsedHTML.querySelectorAll('.iqdbQL')[i].innerText.trim();
        const coin = parsedHTML.querySelectorAll('.kKpPOn')[i].innerText.trim();
        const price = parsedHTML.querySelectorAll('.gDrtaY a')[i].innerText.trim();
        const change1hr = parsedHTML.querySelectorAll('.sc-97d6d2ca-1')[i].innerText.trim();
        const changePos = parsedHTML.querySelectorAll('.sc-97d6d2ca-1')[i].classList.contains('cYiHal');
        const marketCap = parsedHTML.querySelectorAll('.bOsKfy')[i].innerText.trim();
        const volume24h = parsedHTML.querySelectorAll('.jZrMxO')[i].innerText.trim();
        const graph7Days = parsedHTML.querySelectorAll('.dYfjgX')[i].getAttribute("src");

        return { coinimage, coincode, coin, price, changePos, change1hr, marketCap, volume24h, graph7Days };
      });

      console.log(cryptoData);

      if(cryptoData.length > 1) {
        fs.writeFile(`${__dirname}/crypto-data/cryptData.json`, JSON.stringify(cryptoData), (err) => {
          if(err) {
            console.log(err);
          } else {
            console.log('JSON File updated successfully');
          };
        });
      } else {
        console.log('empty data');
      };
    };
    buildJSON();

    await browser.close();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};




























/*
// ROUTES (way 1)

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);


// ROUTES (way 2)

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers).post(createUsers);
app.route('/api/v1/users/:id').get(getUser).patch(updateUser).delete(deleteUser);


// ROUTES (way 3)

const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

userRouter.route('/').get(getAllUsers).post(createUsers);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
*/


