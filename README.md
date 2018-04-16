## Project description

This application was bootstrapped through [Create React App](https://github.com/facebook/create-react-app).

This application simulates a consumer browsing and shopping cart experience.  It is fully responsive, primarily using CSS `flexbox` between various media queries.

Static JSON is coming from a third-party API and is used to hydrate the application's inventory.  A fallback static file is available in `assets/JSON/` for your reference.

[Live demo](https://stoic-feynman-7684d4.netlify.com/)


## To dos...

* Decouple remaining logic and views from `<App.js>`. Create `<ProductList>` which would import `<Product>` as well as `<Pagination>` (To be created as well).

* Investigate [StyledComponents](https://github.com/styled-components/styled-components) as a different solution for CSS

* Implement functional and component tests with [Jest](https://github.com/facebook/jest)

## Running the project

Run `npm start` or `yarn start` in your terminal.
This will run the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Notes & disclaimer
Application layout, assets and UX components were outlined by the prospective employer.  I can only claim responsibility for the implementation.  
This is a functional prototype, and should not be taken as an example of my personal UX design acumen or strategy.**
