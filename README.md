# Web Traffic Analysis

A frontend for viewing web traffic data related to HTTP download and P2P sharing. Part of a coding challenge in which a mock backend was provided and I built a frontend for visualizing some of the mock information!

![Visualization Overview](https://github.com/aidankmcl/traffic-analysis/blob/master/screenshots/visualization.png)

## Build Setup
This project used a [vue-cli with a webpack template](http://vuejs-templates.github.io/webpack/) for putting together the boilerplate of the app structure. This project was developed using `node v8.2.1`, below are some commands provided by the template mixed with steps to get a local version running!  Currently, this project won't work unless you have the mock backend.

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
Then navigate to whatever address the server is listening on (`localhost:8000` for SimpleHTTPServer) and take a look at the app!

## Process
Started off putting together some mocks to get an idea for the flow that the app would require. The focus is around viewing data, however a user must be authenticated before being able to request the data, and each request must contain a session token provided by the server upon login. The company provided specific requirements, and with those in mind I produced the following mockups in [Figma](https://www.figma.com/).

<img style="display: inline-block" alt="Login Page Mock" width="49%" src="https://github.com/aidankmcl/traffic-analysis/blob/master/screenshots/mocks/login.png" />
<img style="display: inline-block" alt="Login Page Mock Alternate" width="49%" src="https://github.com/aidankmcl/traffic-analysis/blob/master/screenshots/mocks/login-alt.png" />
<img style="display: inline-block" alt="Visualization Page Mock" width="74%" src="https://github.com/aidankmcl/traffic-analysis/blob/master/screenshots/mocks/visualization.png" />
<img style="display: inline-block" alt="Mobile Visualization Mock" width="24%" src="https://github.com/aidankmcl/traffic-analysis/blob/master/screenshots/mocks/mobile.png" />

After planning out the flow, I started researching tech to use for the project. I had previously been interested in Vue for its ability to be gradually introduced into a codebase and in this search found it to be conceptually (and performance-wise) similar to React. The datastore and router ecosystem looked familiar and potentially skinnier than React's tooling. Since this was going to be a very small app and I was enticed by Vue's component structure I wanted to take an opportunity to explore! For the visualizations, I looked at the requested graphs and evaluated different frameworks for how far I could get without any hacky editing. I love [D3](https://d3js.org/) but it can be a doozy to start with, although the wealth of examples online provide several starting points. Many charting libraries looked perfectly fine, but [C3](http://c3js.org/) caught my eye since it seemed incredibly configurable and also exposed many intuitive access points to the underlying chart being created. The combination of those elements sold me and it turned out that the library was so good that much of the functionality I needed lived in the existing config options.

## Development

To passersby, if any of this looks helpful, feel free to fork and dig in!

```bash
# serve with hot reload at localhost:8080
npm run dev
```
