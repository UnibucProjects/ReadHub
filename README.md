# ReadHub

# User stories
* As a reader, I want to add a book to my own library (global ratings and recommendations only based on editor-added books)
* As a reader, I want to remove a book from my own library 
* As a reader, I can track my reading progress
* As a reader, I want to change the status of a book:  'to read', 'currently reading', 'read' or 'did not finish' shelf (or a custom shelf)
* As a reader, I want to create a custom shelf
* As a reader, I want to see the books in my library filtered (into categories -> the shelves)
* As a reader, I would like to write notes (on page x, quote/note/..) about a book
* As a reader, I want to rate a book 
* As a reader, I want to set reading goals through the year
* As a reader, I want to see progress charts (how many pages/day/month/year)
* As a reader, I want to get recommendations 
* As an admin, I want to CRUD all entities
* As a reader, I want to view my stats (the longest book I read, most liked book, least liked book etc.)
* As an editor, I want to add books and minimal info about them to the database

# Demo
The application demo is available in 1080p at: https://drive.google.com/file/d/1KbFGR5DB9fiXH9Fo1DPBhVA-CDH1i_Fp/view?usp=sharing

# Backlog 
Available at https://trello.com/b/W9Wdh06r/readhub, also in Github projects for easier tracking of small tasks

# Diagrams
Design, UML, architecture

## Use Case Diagram
<img src = "images/UseCaseDiagram.jpg" width = 600>

## Sequence Diagram
<img src = "images/SequenceDiagram.jpeg" width = 1000>

## Class Diagram
<img src = "images/UMLClassDiagram.jpeg" width = 1000>

# Source control
We used git as a source control system. We each have our branches: alex, delia, diana, ioana and stefan. 

# Tests
We used Jest for JavaScript snapshot testing and JUnit for Java unit testing. 

# Bug Reporting
Bug reporting is done via Github Issues.

# Build tool
The build tool of our choice was Maven, as we wanted:
* automatic control of our dependencies
* easy version update control
* continuous builds, integration, and testing

# Coding standards
* Airbnb coding standards for JS where imposed via ESlint (https://github.com/airbnb/javascript)
* We also used Prettier next to the linter for formatting rules (eg: max-len, no-mixed-spaces-and-tabs, keyword-spacing, comma-style)
* for more on how to activate, check the team design document

# Design patterns used
We used a singleton service for our hand-made logging system. 

# Team design document
Available at https://docs.google.com/document/d/18ozDy5PmWYBgmo5jjHDBkjSLoViKY4q-EurLRpUEE9E/edit?usp=sharing

