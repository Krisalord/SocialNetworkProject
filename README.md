# Social Network Project

## Description 

This is my first big personal project. The goal was to create a social network web app that allowes people to share pictures, react to them by commenting and liking, and have a simple profile. While creating this project, I had to learn a lot of new libraries and how API's work in general, aswell as securing users data (password hashing, cookies etc).

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)

## Installation

To install this project you simply need to download the files, run `npm install` and create a `.env` file in config folder and add the following as `key = value`
  - PORT = 2121 (can be any port example: 3000)
  - DB_STRING = `your database URI`
  - CLOUD_NAME = `your cloudinary cloud name`
  - API_KEY = `your cloudinary api key`
  - API_SECRET = `your cloudinary api secret`

## Usage

This app could be used as a fun project to build from (add new features), as well as an example to start your own API project from scratch.

Features include:
  - Account creation
  - Password hashing
  - Session storing (cookies)
  - Uploading images
  - Commenting under posts
  - Feed with all the posts
  - Likes for posts and comments
  - Removing posts and comments

To use the app you can create new account, or use one of the test accounts.

Email - usertest@klapp.com
Password - 12345678

