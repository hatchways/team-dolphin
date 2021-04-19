# About The Project
A website that allows you to send you alerts when your company is mentioned on Reddit, Twitter or The New York Times. The goal is to be the most up to date with content written up about your company!

## Contributors
[Alan Tran](https://github.com/nalanart), [Philippe Charpentier](https://github.com/Jovialiste82), and [Aidan Ouyang](https://github.com/GuohaoOuyang)

## Built With
- React/Material UI
- Node/Express
- MongoDB
- BullMQ

# Getting started
The project is broken down into a client and server folder.

## Prerequisites
You will need the following:
- Twitter API key
- Redis

## Installation
1. Clone the repo 
```
git clone https://github.com/hatchways/team-dolphin.git
```
2. 

# Usage
Sign up with the company name that you would like to track
![Signup page](https://i.ibb.co/ZKqk3cJ/image.png)

After successfully signing up, mentions about your company are scraped from Reddit, Twitter, and The New York Times and you will be automatically redirected to the home page where they will be displayed. After the initial scrape, new mentions will be scraped on a 15-minute interval. Mentions can be sorted either by "Most Recent" or "Most Popular" and can be filtered by platforms on the left panel.
![Home page](https://i.ibb.co/jzv7vdx/image.png)

The searchbar can be used to search for a keyword in the mentions. Using a debouncer, the search will take place one second after the user stops typing and will return mentions that contain the keyword, highlighted.
![Search functionality](https://i.ibb.co/FHpqHwt/image.png)

Each mention has a face icon in its top-right corner. The faces vary from smiling, neutral, and frowning. Using sentiment analysis on the text, mentions are given a value which determine the face it will display.
![Individual mention](https://i.ibb.co/vDPrZL0/image.png)

Upon clicking a mention, a dialog will appear containing its complete content, a button that links to the original source, and a button that can be used to share the mention with others on the MentionsCrawler platform (they will need an account).
![Mention dialog](https://i.ibb.co/MnqVdmP/image.png)

The settings page is where the user can add and remove companies they'd like to track. However, only one company can be active at a time. The user can also change the email where they will receive a weekly report.
![Settings page](https://i.ibb.co/stHgtCV/image.png)

A weekly report email is sent to the user containing the top mentions for that week
![Weekly report](https://i.ibb.co/TYS5N2R/image.png)

# Acknowledgements
- jsonwebtoken
- node.bcrypt.js
- Twitter for Node.js
- Puppeteer
- Sentiment
- Mailjet NodeJs Wrapper
