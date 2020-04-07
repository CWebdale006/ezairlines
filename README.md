# ezairplanes

## TO-DO: 
* [ ] - copy components from original project, while cleaning them up 
    * [ ] - destinations-list.component -> FlightsList
        * [ ] - finish the weather function, try to get it to change which city it displays depending on which ticket is hovered over 
        * [ ] - google maps api was only added to meet project requirements for the final, but if i can get it to work that's cool too 
        * [ ] - i don't like the way the "Book a flight" changes to "Welcome, User!" everytime the page is refreshed, looks choppy, maybe add different cases for !user and loading? 
        * [ x ] - if the username for the account is missing, change the text that is displayed please (github account)
    * [ ] - App.js -> App.js
        * [ ] - possibly need to add routes later
        * [ ] - uncomment the SearchDestination and Footer components, and actually write them 
        * [ ] - guests not logged in can access the /book/'id' route since it isn't private, but it doesn't work if i make it a private route. my error handling is pretty good as is, but it is still something that should be improved if possible 
    * [ ] - footer.component.js -> Footer.js
        * [ x ] - start writing (after routing/backend is working)
        * [ ] - Make it stay at bottom of page no matter what, example of bad is profile page
    * [ ] - search-destination.component.js -> SearchDestination.js
        * [ ] - need a depart date and a return date search
    * [ ] - navbar.component.js -> Navbar.js
        * [ x ] - basic stuff is done, will need to come back later
        * [ ] - rename someone of the Links, idk if i like them
    * [ ] - edit-destination.component.js -> BookFlight.js
      * [ ] - IMPORTANT!!!! the way the data is getting sent will make it awkward if a user books multiple tickets, so... fix that. idk how yet, but it should be changed 
      * [ ] - check your updateUser function to see if you can reduce the amount of variables used for cleaner code 
      * [ ] - dates shouldn't be editable, make that a separate page or something, i don't know yet
* [ ] - 2 most urgent things: 
    * [ ] - booking tickets needs to ADD to data, not REPLACE
    * [ ] - display booked tickets on user profile 
    * [ ] - display a limited amount of tickets on the home page, add scroll bar or smth
* [ ] - on the profile page, add animations from: https://daneden.github.io/animate.css/
* [ x ] - we need an easy way to generate tickets for the database, so when people search for things there is actually results 