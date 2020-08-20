# InvokeDB Examples

## Setup
Follow the steps below to setup invokedb and get the angular application running.

### Create an Account
1. Create an account at https://invokedb.com

### Setup InvokeDB with Sample Data
1. Download the following sample csv files
    https://www.dl.dropboxusercontent.com/s/jomct80mzn84gy8/Contacts.csv  
    https://www.dl.dropboxusercontent.com/s/jbqefq73ad1bmx9/Todo.csv  
    https://www.dl.dropboxusercontent.com/s/igq7pzormpiuss8/WineReview.csv  
1. Browse to http://db.invokedb.com and make sure you are on the `Tables` page
2. Follow the steps below to upload each file to your database
   1. On the left side of the page click the `+` icon
   2. Select `Table from CSV`
   3. Select the downloaded `csv` from your local machine
   4. Click the upload button
   5. The file will be queued for processing and should be ready shortly
3. The name of the files must `Todo`, `WineReview` and `Contacts`. Case does not matter.
4. Open up the `WineReview` table when it's ready and make the following changes
   1. Click on `Edit Columns`
   2. Add an index to `Title`, `Price` and `Points` columns. (Click the `i` button icon)
   3. Change `Price` and `Points` columns from a type string (`""`) to a type number (`#`)
   4. Click on the disk on icon to save
   5. The file will be queued for processing


### Run angular examples application
1. Clone this repo to your local machine
2. Under `src/` create a file name `invoke-config.json`
3. Copy/paste the contents from `invoke-config-exmaple.json`
4. Update the api_key value
   1. Your api_key can be found at https://db.invokedb.com/account
5. Run `npm install`
6. Run `npm start`
7. Browse to http://localhost:4200