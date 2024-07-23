# Next.js Project for FOMO Factory Assessment

This is a Next.js project developed for the FOMO Factory Assessment. The project is built with Next.js, TypeScript, and Redux, and it interacts with a Node.js backend.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Note](#notes)

## Getting Started
These instructions will help you set up and run the project on your local machine for development and testing purposes.

## Prerequisites
Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Installation

### Step 1: Clone the Repositories

First, clone the Next.js project repository:

``` console
git clone <your-nextjs-repository-url>
cd <your-nextjs-repository-directory>
```

 Then, clone the Node application repository:
 ``` console
 git clone https://github.com/digiblade/fomo_factory_assessment_api
cd fomo_factory_assessment_api
 ```
### Step 2: Install Dependencies
For the Node application:
``` console
npm install
```
For the Next.js project (in a separate terminal):
```console
cd <your-nextjs-repository-directory>
npm install
```

Note:- Please change .env file accordingly

## Running the Application
### Step 1: Start the Node Application
Navigate to the directory of the Node application and start the development server:

```
cd fomo_factory_assessment_api
npm run dev
```
Ensure the Node application is running properly on its designated port.

### Step 2: Start the Next.js Application
In a new terminal, navigate to the Next.js project directory and start the development server:
```
cd <your-nextjs-repository-directory>
npm run dev
```
The Next.js application should now be running at http://localhost:3000.

## Notes
### Environment Variables

Update the `.env` file in the Node.js application with the following details:

### Finnhub.io API Key

Use the free tier API key from [finnhub.io](https://finnhub.io/). The free tier has a rate limit of 60 calls per minute.

```env
FINNHUB_API_KEY=your_finnhub_api_key
```

### MongoDB Connection String
Use the following format for the MongoDB connection string:
MongoDB Connection String
```env
MONGODB_URI=mongodb+srv://<username>:<password>@realmcluster.pj7hk.mongodb.net/<database>?retryWrites=true&w=majority&appName=RealmCluster
```
Replace <username>, <password>, and <database> with your MongoDB credentials and database name.

Please use same connection string in both of the projects


















