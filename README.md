![eventbite logo 75p](https://github.com/jprandazzo/EventBite/assets/131551196/c9d57654-f288-4b69-8419-b1e26e55bc82)

***
Welcome to Eventbite. This is a site by vampires, for vampires. I know how hungry you are, because I am too. And what better way to find your next meal by getting the humans to come to you?
Thankfully, we have the power of the internet at our fingertips (things sure have changed since I was young back in the 1670s). Eventbite will allow you to create events AND buy tickets to others' events - you can really double dip with this one (pun intended) and have some fun while you imbibe your sweet, sweet elixirs. And don't worry, humans see this site as a normal Eventbrite; only our dark magic allows us to see the truth.

In order to build Eventbite, I used the following technologies:
* Languages: Javascript, Ruby, HTML, and CSS
* Other frameworks: Rails, React, and React-Redux. Google Maps API Integration coming soon.
* Hosting on Render, database in PostgreSQL, 

***
## Users/Sessions

### Account creation with error handling
#### Styling
For active input box, the container and its inner text label both turn blue:

<img width="572" alt="image" src="https://github.com/jprandazzo/EventBite/assets/131551196/80b8690f-8caa-45da-a8c2-26f2586fc491">

### Error handling on account creation
<img width="522" alt="image" src="https://github.com/jprandazzo/EventBite/assets/131551196/0ebbc1de-0a2a-46a8-8702-df43ce8e201c">

### User login with error handling and a demo login
<img width="498" alt="image" src="https://github.com/jprandazzo/EventBite/assets/131551196/e7233ff1-b13b-4786-a972-3717234db3ba">

### Redirect on login/signup
With a successful login, the user is redirected to the previous page:

<img width="560" alt="image" src="https://github.com/jprandazzo/EventBite/assets/131551196/4cf35f7c-4ded-4232-8d6f-c57df534d250">


Alternatively, on successful signup, the user is redirected to the splash page:

<img width="563" alt="image" src="https://github.com/jprandazzo/EventBite/assets/131551196/75f0f713-2a13-41ed-bc41-e1ea80d42831">


### logout
Users can, of course, logout, from a button in the navbar dropdown:

<img width="304" alt="image" src="https://github.com/jprandazzo/EventBite/assets/131551196/23741b2a-1e68-461c-b1dd-f62ff22a268b">


which takes them back to the signin page:

<img width="585" alt="image" src="https://github.com/jprandazzo/EventBite/assets/131551196/64e93fe3-8d15-4e94-9551-e94bd448d7e2">


***
## Events

### Event Creation
The event creation page is styled to look exactly like Eventbrite's creation page (as of August 2023), minus my own Mephistophalean color scheme:

<img width="736" alt="image" src="https://github.com/jprandazzo/EventBite/assets/131551196/e8d0b827-c3f3-4cc3-bd01-89e2b31ef646">

On clicking either date, a calendar pops up which allows a user to select a date (setting the corresponding state variable on click):

<img width="788" alt="image" src="https://github.com/jprandazzo/EventBite/assets/131551196/b0b29897-30d8-459b-98fe-b4d87ef25c62">

Parsing out the timestamp in the variable to show appropriate dates and times:

<img width="844" alt="image" src="https://github.com/jprandazzo/EventBite/assets/131551196/9dc3458f-cee6-4659-91e3-912928d3183e">


### Event Index/Edit events:
The Organizer Index page shows all events where the current user is the organizer, with the ability to edit from a clickable popup:

<img width="1117" alt="image" src="https://github.com/jprandazzo/EventBite/assets/131551196/04248778-9465-470e-a0e7-df4bbaea5a29">

A useEffect hook sets the values after fetch, making it easy to update the event based on its previous attributes:

<img width="727" alt="image" src="https://github.com/jprandazzo/EventBite/assets/131551196/b2973b21-1119-4dec-a121-1ca97890907a">

The same dropdown also allows the user to delete their event (as its organizer).

***
## Search
<img width="896" alt="Screenshot 2023-08-04 at 5 09 45 PM" src="https://github.com/jprandazzo/EventBite/assets/131551196/6fc80449-4454-4f2b-995f-bff0304168c2">

The search page starts off showing all events, but the user can either enter a query string or choose a radio button (or both) in order to filter the results (and the tile gets a box-shadow on hover):


<img width="1009" alt="image" src="https://github.com/jprandazzo/EventBite/assets/131551196/d46ba6ca-d1ce-44a2-82d2-3bf83492f29c">



There's conditional logic to render a grey/empty or (blood) red/full heart based on whether that user currently likes that event:


<img width="609" alt="image" src="https://github.com/jprandazzo/EventBite/assets/131551196/dae1ac37-400a-45e6-b384-d435ea07f4c9">

### Event Show Page
Clicking a tile opens a new tab with that event info on it and the option to get tickets (or "reserve a spot" if the event is free). Conditional styling provides the user an intuitive UX (modeled exactly on that of the source material), making the ticket-count-decrease button grey and non-clickable if there are no tickets in cart:


<img width="970" alt="image" src="https://github.com/jprandazzo/EventBite/assets/131551196/af85eabc-8548-4f30-af72-d11e3e205dba">


<img width="480" alt="image" src="https://github.com/jprandazzo/EventBite/assets/131551196/392d89ac-3a82-4d77-beaf-6695bae6c156">


***
## feature 4 - Orders
The order index page shows **order** tiles linking to that event on click (of the event title or image). A clickable icon reveals a pop-up that allows the user to delete their order (but gives a warning on hover!):


<img width="1270" alt="Screenshot 2023-08-04 at 5 36 29 PM" src="https://github.com/jprandazzo/EventBite/assets/131551196/4a61fb67-3510-4865-a2d1-e17c3b1a3928">


<img width="620" alt="Screenshot 2023-08-04 at 5 37 14 PM" src="https://github.com/jprandazzo/EventBite/assets/131551196/6bd2423f-7b0c-4ef1-999b-9c9846051ded">


Considerable attention to detail was paid to make sure the positioning and hover effects looked precise:


<img width="510" alt="image" src="https://github.com/jprandazzo/EventBite/assets/131551196/8b46a407-3b06-45c3-ba87-7f71a4bc4e5a">


**
## Likes
Implementing like actions was deceivingly complex (especially for such an unimposing little heart icon) - I opted to handle it entirely in the users state/reducer rather than creating a separate likes slice of state/controller actions/jbuilder return object. My logic was as follows:

Flip the value of the `activeHeart` variable, which will toggle between grey and red hears on the page. Set that event ID to the user's `currentPage` attribute, and update the user in the back end:


<img width="401" alt="image" src="https://github.com/jprandazzo/EventBite/assets/131551196/8279a12f-e568-4d01-95de-82523492aace">


In the users controller, the `update` action: 
* Grabs the event id from params and designates it a `browser_like`.
* Instructs the database to look for an existing like with that `liker_id` and that `event_id` (because a user can only like an event once).
* If the like exists in the database, that means the user is un-liking that event. Delete the like and return the updated user to the front end for dispatch.
* If there is no like in the database with those params, that means the user wishes to `create` a like. Save the like and send the updated user to the front end.
<img width="785" alt="image" src="https://github.com/jprandazzo/EventBite/assets/131551196/655fa995-783a-40b9-a594-e68c1b4ddd8a">




***
## Miscellaneous 

### CRUD back-end

`orders` were slightly tricky to create successfully. To make sure an event doesn't get oversold, the event has both `capacity` and number of `tickets_sold`. I monkey patched the order `create!` method to first check there are enough available tickets for purchase, then upon verification, adds that many `num_tickets` to the event's `tickets_sold`. Finally, both the order and the event are persisted to the database. 


<img width="592" alt="image" src="https://github.com/jprandazzo/EventBite/assets/131551196/a97cddb7-cfb6-46ef-9a55-47cf03f9854b">


### styling details

As with Eventbrite's site, there are different nav bars depending whether a user is logged in or out:


<img width="1788" alt="image" src="https://github.com/jprandazzo/EventBite/assets/131551196/1a4301a4-d757-48db-a7a0-a8a84b6c938b">


<img width="1792" alt="image" src="https://github.com/jprandazzo/EventBite/assets/131551196/87ef9a37-28d6-4bf6-8efc-3819536e103b">


I paid strict attention to detail to ensure as much pixel-to-pixel congruence with the real Eventbrite site as possible (sizing, fonts, positioning, color schemes). 


See Eventbrite's search page:


<img width="895" alt="Screenshot 2023-08-04 at 6 09 55 PM" src="https://github.com/jprandazzo/EventBite/assets/131551196/3e51d07e-bf3c-4116-8d70-81bd79993cbb">


vs mine:


<img width="895" alt="Screenshot 2023-08-04 at 6 09 15 PM" src="https://github.com/jprandazzo/EventBite/assets/131551196/a7fab812-304b-4e15-b10c-39a0e2b68821">



I made sure hover effects made pages looked dynamic and vibrant with color and brightness shifts, cursor-to-pointer, and box-shadows - all over a 300ms `ease-in-out` transition: 
<br>
<img width="452" alt="image" src="https://github.com/jprandazzo/EventBite/assets/131551196/15b53a39-7161-4326-8768-065dc75c9a99">

<br><br>
<img width="342" alt="image" src="https://github.com/jprandazzo/EventBite/assets/131551196/ba6a2980-3733-4e6f-8015-69d486e20105">



Lastly, I did decided to change up the color scheme, because I want my user to feel deliciously wicked navigating my sided as I did when I built it. Happy feasting!







