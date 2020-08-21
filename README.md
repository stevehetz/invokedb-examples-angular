# InvokeDB Examples with Angular

## Setup

Follow the steps below to setup invokedb and get the angular application running.

### Create an account

1. Create an account at https://invokedb.com

### Setup InvokeDB with sample data

1. Download the following sample csv files
   1. [Contacts](https://www.dl.dropboxusercontent.com/s/jomct80mzn84gy8/Contacts.csv)
   2. [ToDo](https://www.dl.dropboxusercontent.com/s/jbqefq73ad1bmx9/ToDo.csv)
   3. [WineReview](https://www.dl.dropboxusercontent.com/s/igq7pzormpiuss8/WineReview.csv)
2. Browse to https://db.invokedb.com and make sure you are on the `Tables` page
3. Follow the steps below to upload each file to your database
   1. On the left side of the page click the `+` icon
   2. Select `Table from CSV`
   3. Click the file upload icon
   4. Select the downloaded `csv` file from your local machine
   5. Click the upload button
   6. The file will be queued for processing and should be ready shortly
4. The name of the tables must be `ToDo`, `WineReview` and `Contacts`. Case does not matter.
5. Open up the `WineReview` table when it's ready and make the following changes
   1. Click on `Edit Columns`
   2. Add an index to `title`, `price` and `points` columns. (Click the `i` button icon)
      1. This will allow for faster querying
   3. Change `price` and `points` columns from a type `string` (`""`) to a type `number` (`#`)
   4. Click the disk icon to save
   5. The file will be queued for processing

### Run angular application

1. Clone this repo to your local machine
2. Open up the repo with an editor of your choice
3. Under `src/` create a file named `invoke-config.json`
4. Copy over the contents from `invoke-config-example.json`
5. Grab your api_key on the [account](https://db.invokedb.com/account) page and add it to `invoke-config.json`
6. Run `npm install`
7. Run `npm start`
8. Browse to http://localhost:4200

## Helpful Links

https://db.invokedb.com/guide  
https://db.invokedb.com/api

## Support

To get help with this repo please enter a new issue at https://github.com/stevehetz/invokedb-examples-angular/issues  
For questions and issues with invokedb please submit a request using https://invokedb.com/contact
