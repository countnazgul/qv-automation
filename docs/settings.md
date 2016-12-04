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
        |-- indicator1             -> user defined. String. no spaces are allowed. For example: qvd or excel or csv etc.
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


