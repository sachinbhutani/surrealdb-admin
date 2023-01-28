# Surreal DB-Admin

Browse and Query your local/cloud surreal DB instance with a broswer app. 

TRY at: https://surrealdb-admin.vercel.app/ 

This is client side only app, so you can connect to surreal DB running at http://localhost:8000/ from the vercel app. 

![Screenshot](/static/screenshot.png?raw=true "Sample Screenshot")

# Built With
Svelte-Kit
Ui5-Webcomponents

# Change log 
2023-24-01: 
- Added pagination
- WS reconnect on browser URL based navigation
- UI theme selection / dark mode.

2023-28-01
- Select with specific fields and a where clause
- improved pagination and select data error handling 
- collapsable sidebar

## TODO
- [x] Record pagination
- [x] WS reconnection on browser URL change
- [x] UI Themes
- [ ] Allow to edit records in GUI
- [ ] Display Scopes 
- [ ] Login with scopes
- [ ] Foreign key links
- [x] select,Where filters on the table data tab
- [ ] order by on table data tab
- [ ] identify data types and display accordingly in data explorer
- [ ] monaco editor to display json 
- [ ] monaco editor for surrealQL