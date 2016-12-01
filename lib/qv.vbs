Set objFSO = CreateObject("Scripting.FileSystemObject")
Set objShell = WScript.CreateObject( "WScript.Shell" )
'objShell.Run("""c:\Program Files\QlikView\Qv.exe""")
'WScript.Sleep(4000)

Set MyApp = CreateObject("QlikTech.QlikView")
curDir = objFSO.GetAbsolutePathName(".")

set arrgs = WScript.Arguments
appPath = arrgs.Item(0)
tempFolder = arrgs.Item(1) 
mainTemp = arrgs.Item(2)

Set objFile = objFSO.GetFile(appPath)
fileBase = objFSO.GetFileName(objFile)
tempFilePath = mainTemp & "\" & tempFolder & "\" & fileBase

'msgbox(tempFilePath)
set MyDoc = MyApp.OpenDocEx ( appPath, 2 , false , "" , "", "" , true)

MyDoc.SaveAs(tempFilePath)
MyDoc.CloseDoc


set MyDocEmpty = MyApp.OpenDocEx (tempFilePath, 2 , false , "" , "", "" , true)
MyDocEmpty.Save
MyDocEmpty.CloseDoc
'set MyDoc = MyApp.OpenDoc ( appPath )
'MyApp.Quit

objFSO.DeleteFile tempFilePath
 
'Parameter:
'1 - DocName
'2 - AccessMode
'3 - AllowDialog
'4 - UserName
'5 - Password
'6 - Serial
'7 - NoData
'8 - UseDocStartDate