# Search Beacon
My final project whilst I was at Spiced Academy - a 12 week full stack coding bootcamp.

Search Beacon lets charities and non profits find volunteers, and vice versa. Once registered, users can set up a profile, message each other and search for opportunities via a map or by keywords. 

One of the challenges here was having two different user types - volunteers and organisations. To keep this as simple as possible, the data structure for the two types is essentially the same, with organisations having an additional address property to allow for map placement.  I used a lot of conditional rendering to ensure the correct information was displayed depending on the user type.

I created a simple search function using PostgresSQL's full-text search. Rather than searching for the exact user input, it searches the selected database columns for similar words, cases and tenses. For example. A user who's profile mentions Cooking will be show up in search results for cook, cooked, etc. this is a very simple thing to set up - a mere 2-3 lines of code - but is a very powerful, scalable function. 

## Technologies
- **Language**: Javascript
- **Frontend**: ReactJS, Redux
- **Backend**: Node, Express
- **Databases**: PostgreSQL, AWS S3

## Preview
![Landing](https://github.com/stephanLeece/search-beacon/blob/master/public/beaconLandingNew.png)
--
![Map](https://github.com/stephanLeece/search-beacon/blob/master/public/beaconMapNew.png)

## Notes:
Improvements still to be made to the messaging functions and mobile layout.











