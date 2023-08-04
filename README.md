![eventbite logo 75p](https://github.com/jprandazzo/EventBite/assets/131551196/c9d57654-f288-4b69-8419-b1e26e55bc82)

***
Welcome to Eventbite. This is a site by vampires, for vampires. I know how hungry you are, because I am too. And what better way to find your next meal by getting the humans to come to you?
Thankfully, we have the power of the internet at our fingertips (things sure have changed since I was young back in the 1670s). Eventbite will allow you to create events AND buy tickets to others' events - you can really double dip with this one (pun intended) and have some fun while you feast. And don't worry, humans see this site as a normal Eventbrite; only our dark magic allows us to see the truth.

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

<img width="1078" alt="image" src="https://github.com/jprandazzo/EventBite/assets/131551196/21011d9f-ddac-4851-b39d-4122e25193fd">

There's conditional logic to render a grey/empty or (blood) red/full heart based on whether that user currently likes that event:

<img width="609" alt="image" src="https://github.com/jprandazzo/EventBite/assets/131551196/dae1ac37-400a-45e6-b384-d435ea07f4c9">


***
## feature 4 - Orders

**
## feature 5 - Likes

***
## styling details
