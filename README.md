# Game library (WEB) - Version 1.1

This private project aim to create a web page to display a collection games I've played, along with my playtime, my ratings and the type of game. 

## Important Infomrations
At the moment, there is no way, fur a common user, to add games, tags or anything else to the database. This is normal and the project is thought that way. But it's still build to allow more pages in the futur.

**Note:** The repo doesn't contain any data. Only the code of the page !

### Features

- Read and load the database and it's content.
- Displays a grid filled with all the games registered in the SQLite database. 
- Displays the informations about the games like the playtime, rating and type of game.
- Can display games with different orders. For exemple, by "Most played", "Best rate" or "Alphabethic order"
- Displays labels for special tags

### Known Bugs and Errors

- You can experience some stutter while first loading the page, because of all the games loading at launch.
- Screen Resolution for Smartphone isn't properly handled.

### Futur plans

No adjustments, or new features is planned at the moment.

## Versions

- NodeJS version: 20.15.0
- better-sqlite3: 12.6.2
- express: 5.2.1