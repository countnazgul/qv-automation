`qv-automate` accept few command line arguments based on the tasks

* --qvw

  * can be used to skip the initial `qvw` choices. For example: `qv-automate create:xml --qvw="c:\MyFiles\MyQVApp.qvw"` (`c:\MyFiles\MyQVApp.qvw` should exists in `settings.json`)  

* --data

  * needed for **`deploydata:*`** tasks. Indicates which data files should be moved. For example: `qv-automate deploydata:prod --data=qvd,excel,csv`

* --message

  * user defined commit message for `git:commit` task. If `git:commit` is started and `--message` is not present the default commit message will be used: `Commit from qv-automate` 