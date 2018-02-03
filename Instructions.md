# Instructions for Running Locally
Below are instructions for evaluating my app, please let me know if there are any complications or questions! [aidankmcl@gmail.com](mailto:aidankmcl@gmail.com)

## Mock Backend Change

I added the following lines to `mock-backend.js` directly after the instatiation of the express app on the 4th line:

```js
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
```
I added cross origin requests so that it'd be simpler to make requests from my frontend using the vue-cli tooling that hosted a preview on its own port. Normally I would modify my development flow to more closely resemble production environment but did not for this test. This is still necessary for testing the app since your static file server will be on a separate port than the mock backend (assuming no edits to have the mock backend serve the site).

## Install and Run

``` bash
# Getting started
git clone git@github.com:aidankmcl/traffic-analysis.git
# ^ SSH or HTTPS v
git clone https://github.com/aidankmcl/traffic-analysis.git

cd traffic-analysis

# install dependencies
npm install

# build for production with minification
npm run build

cd dist/

# Make sure the mock backend server is running

# Start a static web server, my goto is Python's
python -m SimpleHTTPServer
```
