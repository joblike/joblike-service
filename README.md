<h1>JobLike</h2>


## Description

Job like is an application for job seekers for mobile devices with the idea of swipping just like with Tinder app, but this time, you get only matches!

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

In order to run locally you need to add an environment: 'JOBLIKE_TOKEN' with a random string (e.g. E4E14BAF6CE2F312345135BD74074CE7F48D12345B78099B6). You can generate it online.

This is how I did it locally (MacOS):
1. Create a file joblikeTokens.txt with the content:

    ```
    JOBLIKE_TOKEN=E4E14BAF6CE2F312345135BD74074CE7F48D12345B78099B6
    ```
    
2. Then in .bash_profile (or any other file that is loaded from your terminal upon init) please add the following lines:
    
    ```bash
    set -o allexport
    source $HOME/Variables/joblikeTokens.txt
    set +o allexport
    
Reload the terminal session. In case you are using visual code, then close and open it in order to reload its terminal session.

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

## Stay in touch

- Author - 
