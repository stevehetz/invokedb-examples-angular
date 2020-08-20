# InvokeDB Examples

## Setup

### Create an Account
1. Create an account at https://invokedb.com

### Setup InvokeDB with Sample Data
1. Download the following sample csv files
```
https://www.dl.dropboxusercontent.com/s/jomct80mzn84gy8/Contacts.csv
https://www.dl.dropboxusercontent.com/s/jbqefq73ad1bmx9/Todo.csv
https://www.dl.dropboxusercontent.com/s/igq7pzormpiuss8/WineReview.csv
```
2. Browse to http://db.invokedb.com and make sure you are on the `Tables` pages
3. Follow the steps below to upload each file to your database
   1. On the left side of the page click the `+` icon
   2. Select Table from CSV
   3. Select the file from your local machine
   4. Click the upload button
   5. The file will be queued for processing and should be ready shortly
4. The name of the files must `Todo`, `WineReview` and `Contacts`. Case does not matter.
5. Open up the `WineReview` table when it's ready and make the following changes
   1. Click on `Edit Columns`
   2. Add an index to `Title`, `Price` and `Points` columns. (Click the `i` button icon)
   3. Change `Price` and `Points` columns from a type string (`""`) to a type number (`#`)
   4. Click on the disk on icon to save

### Run angular examples application
1. Clone this repo to your local machine
2. Under `src/` create a file name `invoke-config.json`
3. Copy/paste the contents from `invoke-config-exmaple.json`
4. Login to https://invokedb.com
5. From https://db.invokedb.com/account copy the api_key into the new config
6. Run `npm install`
7. Run `npm start`
8. Browse to http://localhost:4200