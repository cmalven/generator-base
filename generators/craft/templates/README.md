# <%= projectTitle %>

<%= projectDescription %>

## Setup
- Create a MySQL-compatible database called `<%= projectName %>`
- `composer install`
- `cp env.sample .env` and modify the contents of `.env` to match your setup

### Front End Dependencies

First, make sure you have [NodeJS](http://nodejs.org) installed. Then:

* `npm i`
* `npm start`

### Development Server

While `gulp` is running, you can access the site at http://localhost:XXXX

## Deployment

Run `NODE_ENV=production npm run build` to build prepare all assets for deployment.
