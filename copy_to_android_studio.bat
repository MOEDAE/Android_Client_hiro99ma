rem specify the src\main absolute path to your Android Studio project as the first argument
rem e.g. C:\workspaces\AndroidstudioProjects\BdsGeneratedClient\app\src\main

rem specify the absolute path to the directory which must contain the java files as your second argument
rem e.g. C:\workspaces\AndroidstudioProjects\BdsGeneratedClient\app\src\main\java\com\bluetooth\mwoolley\bdsgeneratedclient 

rem For example:
rem copy_to_android_studio.bat C:\workspaces\AndroidstudioProjects\BdsGeneratedClient\app\src\main C:\workspaces\AndroidstudioProjects\BdsGeneratedClient\app\src\main\java\com\bluetooth\mwoolley\bdsgeneratedclient

mkdir %1\res\layout

copy *.java %2
copy strings.xml %1\res\values
copy activity_peripheral_control.xml %1\res\layout
copy border.xml %1\res\drawable
copy activity_main.xml %1\res\layout
copy list_row.xml %1\res\layout
