Tasks can be executed individually or one after another. 

`qv-automate create:xml` 

* generate only the xml qvw structure

`qv-automate create:xml --qvw="c:\MyApps\MyQVApp.qvw"`

*  generate the xml qvw structure but provide the qvw as parameter. This is useful if the process is automated (batch file for example) and not user input is needed

`qv-automate git:clone create:xml git:commit --message="my commit message" git:push` 

* clone the latest version of the repo, create the xml structure and commit the changes and push them to git

`qv-automate git:clone create:xml git:commit --message="my commit message"  git:push deploy:prod deploydata:prod --data=qvd,xml` 

* same as the previous example but after pushing the changes, copy the qvw and qvd files to prod environment