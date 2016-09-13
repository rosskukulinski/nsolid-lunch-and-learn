# User Directory

## Requirements

* [N|Solid](https://downloads.nodesource.com/)
* [RethinkDB](https://rethinkdb.com/) running on localhost
* Python RethinkDB Driver (for loading dataset)
  * `sudo pip install rethinkdb`
* ab - Apache Benchmark

## Getting Started

Install Node modules

```
npm install
```

Load dataset into rethinkdb

```
npm run db-load
```

Verify `users` table created

```
open http://localhost:8080/#tables
```

Launch Application

```
NSOLID_APPNAME=demo-app node index.js
```

Open App in Browser
```
open http://localhost:3001
```

## Performance Deep deep-dive

* Using N|Solid, take CPU Profile while running Benchmark

```
npm run benchmark
```

* How busy is our Node.js application?  If it's not doing anything... what is?

* If our app is busy, what is it doing, and why?

* For a harder benchmark, use

```
npm run benchmark-heavy
```

* Did you remember to set NODE_ENV=production?

* Is logging necessary? Where should the logs go?

## Managing Module Vulnerabilities

* Does your application have any known vulnerabilities?

* If so, do you know how to fix them?
