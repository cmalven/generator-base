# <%= projectTitle %>

<%= projectDescription %>

## Setup
- Install [DDEV](https://ddev.com/get-started/)
- `ddev start`
- `ddev composer install`
- `cp .env.example .env` and modify the contents of `.env` to match your setup
- `ddev import-db`

### Front End Dependencies

First, make sure you have [NodeJS](http://nodejs.org) installed. Then:

* `npm i`
* `npm start`

### Development Server

Run `ddev start` and `npm start` to start the development server. Then you can access the site at the URL set for `PRIMARY_SITE_URL` in `.env`.

## Build for deployment

Run `npm run build` to build prepare all assets for deployment.
