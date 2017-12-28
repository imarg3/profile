REM Using this Batch Script, we can create SSL Certificate Request for Tomcat Server. Please Ensure Java is installed on the machine.

@ECHO OFF
CLS

ECHO *******************************************************************************
ECHO AUTHOR - ARPIT GUPTA
ECHO GROUP - GIST
ECHO EMAIL ID - imarg3@github.com
ECHO Logged-in-Username is %USERNAME% on %DATE% at %TIME%
ECHO *******************************************************************************
ECHO.

ECHO BATCH SCRIPT FOR EXECUTING REQUIRED COMMANDS. PLEASE ENSURE JAVA IS INSTALLED ON YOUR MACHINE.
ECHO.
:: ANCHOR
:TOMCAT_SSL_COMMANDS
COLOR 03
ECHO.
ECHO A. Check JAVA Version
ECHO.
ECHO B. Check All Java Processes
ECHO.
ECHO C. Check Key and Certificate Management Tool (keytool)
ECHO.
ECHO D. Generate Certificate Signing Request for Tomcat Server
ECHO.
ECHO E. Exit from Command Prompt
ECHO.
CHOICE /C ABCDE /N /M "Dear %USERNAME%, Please Enter your choice:"

:: Note - list ERRORLEVELS in decreasing order
IF ERRORLEVEL 5 GOTO Exit
IF ERRORLEVEL 4 GOTO CSRGenerate
IF ERRORLEVEL 3 GOTO KeyTool
IF ERRORLEVEL 2 GOTO JavaProcess
IF ERRORLEVEL 1 GOTO JavaVersion

:JavaVersion
CLS
java -version
ECHO.
GOTO TOMCAT_SSL_COMMANDS

:JavaProcess
CLS
jps
ECHO.
GOTO TOMCAT_SSL_COMMANDS

:KeyTool
CLS
keytool -help
ECHO.
GOTO TOMCAT_SSL_COMMANDS

:CSRGenerate
CLS
ECHO Create a certificate keystore and private key. Please input required parameters :
set /p ALIAS_NAME="Enter Server Alias Name : "
set /p KEY_ALGO="Enter Key Algorithm for Encryption (RSA/SHA) : "
set /p KEY_SIZE="Enter key size : "
set /p KEYSTORE_FILENAME="Enter Keystore File Name (.jks): "
ECHO You will be prompted to choose a password (minimum 6 characters) for your keystore. You will then be prompted to enter your Organization information. Make sure to remember the password you choose.
if %KEY_SIZE% LEQ 0 (echo KEY SIZE is Invalid) else (keytool -genkey -alias %ALIAS_NAME% -keyalg %KEY_ALGO% -keysize  %KEY_SIZE% -keystore %KEYSTORE_FILENAME%.jks)
ECHO Your keystore file named %KEYSTORE_FILENAME%.jks is now created in your current working directory.
ECHO.
ECHO Generate a CSR from Your New Keystore. You will need to enter Keystore Password. Enter the following details:
set /p CSR_FILENAME="Enter CSR File Name (.txt) :"
keytool -certreq -keyalg %KEY_ALGO% -alias %ALIAS_NAME% -file %CSR_FILENAME%.txt -keystore %KEYSTORE_FILENAME%.jks
ECHO.
ECHO YOUR CERTIFICATE SIGNING REQUEST HAS BEEN SUCCESSFULLY CREATED FOR TOMCAT SERVER.
ECHO.
GOTO TOMCAT_SSL_COMMANDS

:Exit
CLS
exit