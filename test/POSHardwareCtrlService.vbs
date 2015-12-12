Option Explicit
dim wshell
dim rootPath

rootPath = "C:\source\htm\test"

Set wshell = WScript.CreateObject("WScript.Shell")
wshell.Run rootPath & "\DevServer\9.0\WebDev.WebServer.EXE /port:1355 /path:" & rootPath & "\POSHardwareControl /vpath:/", 0, false

wscript.sleep 1000

wshell.Run "http://localhost:1355/POSHardwareCtrl.svc/", 1, false
