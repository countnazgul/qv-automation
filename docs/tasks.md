**`build:dev`**

* Compоsite task running the following tasks (in this order):
  * `clear:tempApp`
  * `clear:tempPrj`
  * `git:clone`
  * `create:xml`
  * `git:commit`
  * `git:push`
  * `deploy:dev`
  * `deploydata:dev`

**`build:prod`**

* Same as **`build:dev`** but publish the `qvw` and the data in the `prod` folder

**`build:test`**

* Same as **`build:dev`** but publish the `qvw` and the data in the `test` folder

**`check:localPath`**

* Local and network paths. Like `c:\data\qvd` or `\\data\qvd` 

**`check:logFile`**

* `Document Properties` --> `Generate Logfile` is checked

**`check:synthKeys`**

* Synthetic Keys in the data model

**`check:macro`**

* Macro module not empty

**`check:macroOnOpen`**

* Any macro modules on open

**`check:macroOnPost`**

* Any macro modules on post reload

**`clear:tempAll`**

* Remove the content of the root temp folder

**`clear:tempApp`**

* Remove the content of temp folder (based on the user input or `--qvw` argument)

**`clear:tempPrj`**

* Remove the content of `prj` folder (based on the user input or `--qvw` argument) 

**`create:xml`**

* This task will create temp folder for specific qvw, open qvw file, remove the data, save it as a copy in the temp folder, open the copy and save it again. After this process the xml files will be in the `prj` folder 

**`deploy:dev`**

* Copy the main qvw in the `dev` folder

**`deploy:prod`**

* Copy the main qvw in the `prod` folder

**`deploy:test`**

* Copy the main qvw in the `test` folder

**`deploydata:dev`**

* Copy all data files in the `dev` folder. Data files are specified in the `settings.json`. `--data` parameter must present as argument 

**`deploydata:prod`**

* Same as **`deploydata:prod`** but deploy to `prod` folder

**`deploydata:test`**

* Same as **`deploydata:prod`** but deploy to `test` folder

**`git:add`**

* Add file contents to the index

**`git:clone`**

* Clone specific repository in the `temp` folder

**`git:commit`**

* Commit the changes. If `--message` is not provided then the default message is used - `Commit from qv-automate`

**`git:listFiles`**

* List all files that are changed

**`git:push`**

* Push the commit

**`list:qvw`**

* List all `qvw` files in `settings.json`

**`list:tasks`**

* List all available tasks

**`prompt`**

* Internal task that is used for user choices



