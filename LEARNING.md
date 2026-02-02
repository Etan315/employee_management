# Learning Notes

## Backend
- server:
    - on the code `app.use("/api", authRoutes);` on the server, you don't need to use **/api** on the routes in auth.js, but if there is a defined route on the server you don't need to add another `/api` route.
        * e.g on the server I added this line: `app.post("/logout", (req, res) => { ... }`, then when you need to fetch `/logout` route, you don't need to add another **/api**