This plugin generates a basic Android client, complete with user interface for initial testing. It should be considered "demo quality" only and has been tested only with a very limited number of profiles.

Known Issues
------------
1. Manifest is not generated and needs to be. 
2. UUID based scanning is useless without GAP information.
3. Name space needs to be used as Android / java package name
4. Bug in activity_peripheral_control.xml causes TextView and EditText components to be created if both read and write are supported for a characteristic.
5. Need to generate into appropriate folders e.g. layout, drawable, values
6. AppName in strings.xml should be derived from the profile name
7. Should include compiler preprocessor blocks for 4.3/4.4 vs 5.x and use appropriate scanning APIs
8. Android Studio prefers indentation with spaces instead of tabs