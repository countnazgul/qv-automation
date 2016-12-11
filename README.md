# QlikView Automate (Beta)





## Why
The simple answer is "Because I need it". 

On a daily basis I'm copying back and forth qvw and data files between our dev server and prod and test environments. This doesn't consume a lot of time 
to be honest but it's boring. Also I wanted to be able to deploy to both environments at the same time and also wanted to have the option to "test" the scripts (mine and my colleagues ones) 
for some basic stuff (local paths for example [ths will be available in the next version])

Started with batch files but this have it's own disadvantages. And this is where `Gulp` came in the picture. With `Gulp` is much easier to set the workflow I've needed (and also was a good case to do something more bigger with `Gulp`) 

## Requirements
 * Node JS
 * Gulp 4
 * Git

## Install
To install it just open command prompt and run:

`npm install -g qv-automate`

After this `qv-automate` will be available to run from cwd.

## How
`qv-automate` uses `Gulp` to run specific tasks. 

Task can be started individually or one after another in the same run (check the **Examples** section). 

The module is installed globally and can be started from anywhere in cmd. 

The `settings.json` (file in the the current user documents folder) is used to define the qvw and data files, their prod/dev/test locations and git repository.   

## Tasks
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





## settings.json
The install process will create example `settings.json` file in `c:\Users\CURRENTUSER\Documents\qv-automate`

The structure of the file is:

```
| apps                              -> root element (array)
|-- app1                            -> array member
    |-- qvw                         -> the path to the qvw (add `\\` in the path)
    |-- git                         -> git url of the repository (if git is used)
    |-- locations                   -> where the qvw should be copied. If there is no dev or test env just skip them 
        |-- prod                    
        |-- dev                      
        |-- test                     
    |-- datafiles                   -> array
        |-- indicator1              -> user defined. String. no spaces are allowed. For example: qvd or excel or csv etc.
            |-- dev                 -> path to the specific data files (add `\\` in the path)
            |-- filter              -> mask can be applied. For example: *_2016.qvd  
            |-- deployProd          -> prod location (add `\\` in the path)
            |-- deployDev           -> dev location (add `\\` in the path)
            |-- deployTest          -> test location (add `\\` in the path)
        |-- indicator2              
            |-- ...                    
        |-- indicator3              
            |-- ...                                                     
|-- app2                             
    |-- ...
```

Simple structure example:

```
{
    "apps": [
        {
            "qvw": "main\\qvw\\path",
            "git": "git repository url",
            "locations": {
                "prod": "prod\\folder\\location"
            },
            "datafiles": [
                {
                    "indicator": {
                        "dev": "local\\qvd\\files\\path",
                        "filter": "filter mask",
                        "deployProd": "prod\\folder\\location"
                    }
                }
            ]
        }
    ]
}
```




## Arguments
`qv-automate` accept few command line arguments based on the tasks

* --qvw

  * can be used to skip the initial `qvw` choices. For example: `qv-automate create:xml --qvw="c:\MyFiles\MyQVApp.qvw"` (`c:\MyFiles\MyQVApp.qvw` should exists in `settings.json`)  

* --data

  * needed for **`deploydata:*`** tasks. Indicates which data files should be moved. For example: `qv-automate deploydata:prod --data=qvd,excel,csv`

* --message

  * user defined commit message for `git:commit` task. If `git:commit` is started and `--message` is not present the default commit message will be used: `Commit from qv-automate` 

## Examples
Tasks can be executed individually or one after another. 

`qv-automate create:xml` 

* generate only the xml qvw structure

`qv-automate create:xml --qvw="c:\MyApps\MyQVApp.qvw"`

*  generate the xml qvw structure but provide the qvw as parameter. This is useful if the process is automated (batch file for example) and not user input is needed

`qv-automate git:clone create:xml git:commit --message="my commit message" git:push` 

* clone the latest version of the repo, create the xml structure and commit the changes and push them to git

`qv-automate git:clone create:xml git:commit --message="my commit message"  git:push deploy:prod deploydata:prod --data=qvd,xml` 

* same as the previous example but after pushing the changes, copy the qvw and qvd files to prod environment

## Future
Few more tasks should be added in the near future (woho! Holiday season :) )

* tasks based on the generated xml files. Like:
  * usage of local path in the script (C:\myapp\data.qvd)
  * macro module usage indicator
  * synth keys in the data model
  * generate log file should be checked
  * same font for all objects
  * etc. 
* version checker - check for new version of `qv-automate` on run (based no settings. auto-update on start?)
* log process
* user defined tasks
* clear the prod/dev/test environments (still haven't decided if this is such a good idea)
* copy from prod/dev/test
* rename the qvw after deploying is done


## License
Copyright © 2016, [Stefan Stoichev](https://sstoichev.eu).<br/> 
Released under the [MIT license](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.2.0, on December 11, 2016._

