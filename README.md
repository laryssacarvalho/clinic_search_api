# Clinic Search

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li><a href="#built-with">Built With</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#dependencies">Dependencies</a></li>
        <li><a href="#execution">Execution</a></li>
      </ul>
    </li>
  </ol>
</details>

## About The Project

The project is a solution for this [coding challenge](https://gitlab.scratchpay.com/-/snippets/33). 

The application consists of an API with only one endpoint to search clinics using different query params. 

The endpoint URL is **/clincs** and it is a GET method that allow any of the following query params:

- name
- state (name or abbreviation)
- from
- to

You can combine the parameters to filter the list as you like.

For example, calling the endpoint passing the name filter (/clinics?name=good) will return the following response body:
```
[
   {
      "name":"Good Health Home",
      "stateName":"Alaska",
      "availability":{
         "from":"10:00",
         "to":"19:30"
      }
   },
   {
      "name":"Good Health Home",
      "stateName":"Florida",
      "availability":{
         "from":"15:00",
         "to":"20:00"
      }
   }
]
```

## Built With

The project was built in [NodeJS](https://nodejs.org/en) using [Express.js](https://expressjs.com/pt-br/) framework with TypeScript.

## Getting Started
There are two ways of running this project: on your machine or on a docker container. The latter one is easier if you have Docker installed. 

### Dependencies

If you are going to execute the project on your machine instead of using Docker, then you will need to install [NodeJS](https://dotnet.microsoft.com/en-us/download).

### Execution

#### On your machine

After cloning this repository you will need to execute the following commands on the root folder:

```
npm install
npm run dev
```

The API is now running on http://localhost:8000.

#### Using Docker

If you have Docker installed, then access the root folder to execute the following command:

```
docker-compose up
```

The API is now running on http://localhost:8000.