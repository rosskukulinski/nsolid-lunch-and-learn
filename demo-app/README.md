User Directory

## Requirements

* Node.js or N|Solid
* RethinkDB running on localhost
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

Launch Application

```
NSOLID_APPNAME=demo-app node index.js
```

Open App in Browser
```
open http://localhost:3001
```
