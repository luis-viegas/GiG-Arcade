# Requirements Specification

## Actors
|Identifier|Description|
|----|----|
|User|General user of the plataform, should have access to all content|
|GitLab|External database from where new games are added|

## User Stories
### User
| ID | Name | Priority | Description |
|----|----|----|----|
|US01| Browse Game Catalog | High | As a User I want to be able to browse through the list of games so that I can choose which one to play|
|US02|Filter Games by Tag |High | As a User I want to be able to see only the games that have a certain tag so it is easier to find the game I want|
|US03 | Remove Filter Tag | High| As a User I want to be able to remove the filter tags I picked, so that I can choose another tag or have a more general search.|
|US04| Play Games  | High   | As a User, I want to be able to play the games I want, so that I can enjoy them.|
|US05| Read Games' Information| High | As a User, I want to be able to read some information about the game like its description, so that I have more information to decide what I want to play.|
|US06| Search Games | Medium | As a User I want to be able to search for a game by its title|
|US07| See Home | Medium | As a User, I want to access the home page, so that I can see a brief presentation of the website.|
|US08|See About | Medium |As a User, I want to access the about page, so that I can see a complete description of the product and its creators.|
|US09|Consult FAQ |Medium|As a User, I want to access the FAQ, so that I can get quick answers to common questions.|
|US10|Consult Contacts|Medium|As a User, I want to access contacts, so that I can come in touch with the platform creators.|
|US11| Rate Games  | Low   | As a User, I want to able to rate from 1 to 5 starts the games I play, so that everyone can see what have a general idea of what the others think about the game.|



### GitLab
| ID | Name | Priority | Description |
|----|----|----|----|
|US11|Update Game Catalog|High|The system should check GitLab for new changes and pull them|


## Technical Requirements

|ID|Name|Description|
|----|----|----|
|TR1|Usability|The interface should be simple and easy to use|
|TR2|Performance|The system should not take longer than 2 seconds to load a page, although it is accepted to take longer to load a game|
|TR3|Robustness|The system must be prepared to handle and continue operating when runtime errors occur|
|TR4|Availability|The system should be available 99 percent of the time|


Go back to main page: [Main Page](../README.md)
