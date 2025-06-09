# TCSS 460 - Group 2 - Frontend Project

## Hosted Links

- **Vercel-hosted Web App:** [click here](https://group2-tcss460-front-end-git-main-lwazi-mabotas-projects.vercel.app/)
- **Heroku-hosted Web API by Group 8:** [click here](https://group8-tcss460-web-api-57308080b655.herokuapp.com/)


## Alpha Sprint

### Contribution

- **Jacob Klymenko** – Wrote the `README.md` and participated with project discussion.
- **Lwazi M Mabota** – Set up the web app and successfully deployed it to Vercel.
- **Thomas Le** – Participated with project discussion on tasks and goals.
- **Owen Orlic** – Acted as the team lead discussing tasks and goals.

### Meetings

- **Friday, May 16 (10:30 AM - 11:00 AM)** - Discord Voice Chat
    - Discussed the basic plans, tasks, and goals for the next beta one sprint. Looked over the project document and talked about our approaches to implementing UI/UX with the required pages.

### Comments

- Setting up the web app to be hosted through Vercel was pretty straight forward.

## Beta I Sprint

### Contribution

- **Jacob Klymenko** – Updated the register/login form to match 3rd-party Auth API requirements with client-side form validation. Wrote the `README.md`. Helped in fully completing the single book view page.
- **Lwazi M Mabota** – Developed a form to allow users to change their password, matching the server-side requirements. Helped in fully completing the single book view page.
- **Thomas Le** – Wrote a page/view to allow user to view a single book.
- **Owen Orlic** – Developed a page/view to allow users to view a list of books. Helped in fully completing the single book view page.

### Meetings

- **Friday, May 19 (10:30 AM - 11:00 AM)** - Discord Voice Chat
    - Briefly discussed how we will divide the work on what pages and features each person should work on. (Fully fleshed out this sprint's contribution when the beta I assignment description came out.) 
- **Sunday, May 25 (5:30 PM - 6:30 PM)** - Discord Voice Chat
    - Merge all code together to the beta I sprint. Discuss how to connect the 3rd-party web API to the change password, single book page, and list of books page. Discussed for the future on how we plan to implement the search bar feature with the 3rd-party web API.

### Comments

- Since some of us were writing frontend code in Next.js for the first time, understanding how the framework uses directories for pages and routes was a bit confusing.

## Beta II Sprint

### Contribution

- **Jacob Klymenko** – Developed the view/page to create a new book with a connection to the 3rd party web api (ongoing issue with invalid token error). Wrote the `README.md` for beta II sprint. 
- **Lwazi M Mabota** – Connected the change password view/page form to the 3rd party web API.
- **Thomas Le** – Complete the single book page with connection to 3rd party web API with the correct expected response object and with ability to update book information.
- **Owen Orlic** – Connected the page/view of all books with the ability for users to search for books with the 3rd party web API's different search methods.

### Meetings

- **Tuesday, May 27 (10:30 AM - 11:00 AM)** - Discord Voice Chat
    - Discussed the delegation of tasks for the sprint. Mostly everyone understood that we were to connect the preview views/pages to the 3rd party web API and write some new views/pages. 
- **Sunday, June 1 (5:00 PM - 6:00 PM)** - Discord Voice Chat
    - Merge all code together to the beta II sprint. Discuss potential changes that should be made to the work that we have done. Discuss the occuring error we are having with invalid tokens when attempting to create or update information in the 3rd party web API.

### Comments

- Jacob and Lwazi were both having issues with token related errors obstructing the ability to make web API calls. We will have to look into the frontend authentication code to find how the tokens are being stored and/or if there are any changes that need to be made.
- Owen had confusion on whether search should lead to the View Books page or have books pop up on the Search page. Decided on having the books pop up on the Search page itself.

## Final Production Sprint

### Contribution

- **Jacob Klymenko** – Worked in meeting with other group members to fix final bugs. Fixed single book page to properly display information.
- **Lwazi M Mabota** – Worked in meeting with other group members to fix final bugs.
- **Owen Orlic** – Worked in meeting with other group members to fix final bugs.

### Meetings

- **Sunday, June 8 (5:00 PM - 0:00 PM)** - Discord Voice Chat
    - Wrapped up remaining tasks to complete the project's front end. This included being able to view a single book which is reachable from the search. Had to do some redesigning on the single book page to properly read book info.

### Comments
- We had to ask the backend to give us the book ID through the search/filter/pagination route so then we can use their get book by ID route. 
