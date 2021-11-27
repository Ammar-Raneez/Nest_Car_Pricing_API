/auth/signup
* POST
  * Body - { email, password }
  * Create a new user and sign in

/auth/signin
* POST
  * Body - { email, password }
  * Sign in as an existing user

/reports
* GET
  * QS - make, model, year, mileage, longitude, latitude
  * Get an estimate for the cards value
* POST
  * Body - { make, model, year, mileage, longitude, latitude, price }
  * Report how much a vehicle was sold for

/reports/:id
* PATCH
  * Body - { approved }
  * Approve or reject a report submitted by a user
