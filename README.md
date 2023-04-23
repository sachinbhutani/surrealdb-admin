# Surreal DB-Admin

Browse and Query your local/cloud surreal DB instance with a broswer app. 

TRY at: https://surrealdb-admin.vercel.app/ 

This is client side only app, so you can connect to surreal DB running at http://localhost:8000/ from the vercel app. 

![Screenshot](/static/screenshot.png?raw=true "Sample Screenshot")

![Screenshot](/static/Screenshot2_edit_record.png?raw=true "Edit Records")

# Built With
Svelte-Kit

SAP ui5-Webcomponents

# Change log 
2023-04-22 
 - bug fixes, 
 - upgraded to new versions for surrealjs, svelte, sveltekit and ui5 webcomponents
 - replaced monaco with codeMirror
 - added codemirror for SQL for query input box

2023-02-26: 
 - scopes browser
 - create table option
 - home page tiles

2023-02-11:
 - Add new fields to schemaless tables
 - Error handling during record update
 
2023-02-04:
 - Update records with forms/JSON 
 - improvements to data tables 

2023-01-28
- Select with specific fields and a where clause
- improved pagination and select data error handling 
- collapsable sidebar
- monaco editor to display json query output 

2023-01-24: 
- Added pagination
- WS reconnect on browser URL based navigation
- UI theme selection / dark mode.

## TODO
- [x] Record pagination
- [x] WS reconnection on browser URL change
- [x] UI Themes
- [X] Allow to edit records in GUI
- [X] Display Scopes 
- [ ] Login with scopes
- [ ] Foreign key links
- [ ] Function list and management
- [x] Select,Where filters on the table data tab
- [ ] order by on table data tab
- [x] identify data types and display accordingly in data explorer
- [x] codeMirror editor to display json query output 
- [x] codeMirror editor for surrealQL
- [ ] create new record form
- [x] add/remove fields from existing records