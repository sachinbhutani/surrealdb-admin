# Surreal DB-Admin

Browse and Query your local/cloud surreal DB instance with a broswer app. 

TRY at: https://surrealdb-admin.vercel.app/ 

This is client side only app, so you can connect to surreal DB running at http://localhost:8000/ from the vercel app. 

![Screenshot](/static/screenshot.png?raw=true "Sample Screenshot")

![Screenshot](/static/screenshot2_edit_record.png?raw=true "Edit Records")

# Built With
Svelte-Kit

SAP ui5-Webcomponents

# Change log 
2023-04-02:
 - Update records with forms/JSON 
 - improvements to data tables 

2023-28-01
- Select with specific fields and a where clause
- improved pagination and select data error handling 
- collapsable sidebar
- monaco editor to display json query output 

2023-24-01: 
- Added pagination
- WS reconnect on browser URL based navigation
- UI theme selection / dark mode.

## TODO
- [x] Record pagination
- [x] WS reconnection on browser URL change
- [x] UI Themes
- [X] Allow to edit records in GUI
- [ ] Display Scopes 
- [ ] Login with scopes
- [ ] Foreign key links
- [x] Select,Where filters on the table data tab
- [ ] order by on table data tab
- [x] identify data types and display accordingly in data explorer
- [x] monaco editor to display json query output 
- [ ] monaco editor for surrealQL
- [ ] create new record form
- [ ] add/remove fields from existing records