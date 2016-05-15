function GetInfo(infoObject) {
    infoObject.Name = "Android Client Plugin(hiro99ma)";
    infoObject.Description = "Generates code for Android smart phone applications";
    infoObject.Author = "Martin Woolley";
    infoObject.Version = "1.1ext";
    infoObject.IsClient = true;
    return infoObject;
}

function RunPlugin(profiledata)
{
    log("Android Client Plugin: Beginning plugin execution");


	var namespace = profiledata.CustomNameSpace;
	var namespace_as_dir = namespace.replace(/\./g,"\\");
	var rx_custom_namespace_tag = new RegExp("{{CustomNameSpace}}","g");

    var mainActivityTemplate = FileManager.ReadFile("MainActivity.java.template");
    var main_activity = ProcessTemplate(mainActivityTemplate, profiledata);
    FileManager.CreateFile("MainActivity.java", main_activity);

    var service_constants = "";
    var characteristic_constants = "";

    var adapterServiceTemplate = FileManager.ReadFile("BleAdapterService.java.template");
    var adapter_service = ProcessTemplate(adapterServiceTemplate, profiledata);

    var service_constants = "";
    var characteristic_constants = "";
    for (var c = 0; c < profiledata.UniqueUUIDItems.length; c++)
    {
        var uniqueUUIDItem = profiledata.UniqueUUIDItems[c];
		var uuid_name = uniqueUUIDItem.Name.toUpperCase();
		uuid_name = uuid_name.replace(/ /g, '_');
        if (uniqueUUIDItem.Type.indexOf(".characteristic.") > 0) {
			characteristic_constants = characteristic_constants + '    public static final String ' +
									   uuid_name +
									   '_CHARACTERISTIC_UUID = "' +
			                           uniqueUUIDItem.UUID.toUpperCase() +
									   '";' +
									   '\n';
		} else {
			if (uniqueUUIDItem.Type.indexOf(".service.") > 0) {
			service_constants = service_constants + '    public static final String ' +
									   uuid_name +
									   '_SERVICE_UUID = "' +
			                           uniqueUUIDItem.UUID.toUpperCase() +
									   '";' +
									   '\n';
			}
		}
    }
	adapter_service = adapter_service.replace(/%%SERVICE_CONSTANTS%%/g, service_constants);
	adapter_service = adapter_service.replace(/%%CHARACTERISTIC_CONSTANTS%%/g, characteristic_constants);
    FileManager.CreateFile("BleAdapterService.java", adapter_service);

    var peripheralActivityTemplate = FileManager.ReadFile("PeripheralControlActivity.java.template");
    var peripheral_activity = ProcessTemplate(peripheralActivityTemplate, profiledata);
    FileManager.CreateFile("PeripheralControlActivity.java", peripheral_activity);

    var scanFilterFactoryTemplate = FileManager.ReadFile("ScanFilterFactory.java.template");
    var scanfilterfactory = ProcessTemplate(scanFilterFactoryTemplate, profiledata);
    FileManager.CreateFile("ScanFilterFactory.java", scanfilterfactory);

    var constantsTemplate = FileManager.ReadFile("Constants.java.template");
    var constants = ProcessTemplate(constantsTemplate, profiledata);
    FileManager.CreateFile("Constants.java", constants);

    var stringsXmlTemplate = FileManager.ReadFile("strings.xml.template");

    service_constants = "";
    characteristic_constants = "";
    for (var c = 0; c < profiledata.UniqueUUIDItems.length; c++)
    {
        var uniqueUUIDItem = profiledata.UniqueUUIDItems[c];
        if (uniqueUUIDItem.Type.indexOf(".characteristic.") > 0) {
			characteristic_constants = characteristic_constants + '    <string name="characteristic_name_' +
			                           uniqueUUIDItem.UUID.toUpperCase() +
									   '">Characteristic: ' +
									   uniqueUUIDItem.Name +
									   '</string>'+
									   '\n';
			characteristic_constants = characteristic_constants + '    <string name="characteristic_uuid_' +
			                           uniqueUUIDItem.UUID.toUpperCase() +
									   '">Characteristic: ' +
									   uniqueUUIDItem.UUID.toUpperCase() +
									   '</string>'+
									   '\n';
		} else {
			if (uniqueUUIDItem.Type.indexOf(".service.") > 0) {
				service_constants = service_constants + '    <string name="service_name_' +
										   uniqueUUIDItem.UUID.toUpperCase() +
										   '">Service: ' +
										   uniqueUUIDItem.Name +
										   '</string>'+
										   '\n';
				service_constants = service_constants + '    <string name="service_uuid_' +
										   uniqueUUIDItem.UUID.toUpperCase() +
										   '">Service: ' +
										   uniqueUUIDItem.UUID.toUpperCase() +
										   '</string>'+
										   '\n';
			}
		}
    }
	var strings_xml_template= FileManager.ReadFile("strings.xml.template");
    var strings_xml = ProcessTemplate(strings_xml_template, profiledata);
	strings_xml = strings_xml.replace(/%%SERVICE_CONSTANTS%%/g, service_constants);
	strings_xml = strings_xml.replace(/%%CHARACTERISTIC_CONSTANTS%%/g, characteristic_constants);
    FileManager.CreateFile("strings.xml", strings_xml);

    var activityPeripheralControlXmlTemplate = FileManager.ReadFile("activity_peripheral_control.xml.template");
    var activity_peripheral_control_xml = ProcessTemplate(activityPeripheralControlXmlTemplate, profiledata);
    FileManager.CreateFile("activity_peripheral_control.xml", activity_peripheral_control_xml);

    var utilityTemplate = FileManager.ReadFile("Utility.java.template");
    var utility = ProcessTemplate(utilityTemplate, profiledata);
    FileManager.CreateFile("Utility.java", utility);

    var charPropsTemplate = FileManager.ReadFile("CharacteristicProperties.java.template");
    var charProps = ProcessTemplate(charPropsTemplate, profiledata);
	FileManager.CreateFile("CharacteristicProperties.java", charProps);

    var activityMainXmlTemplate = FileManager.ReadFile("activity_main.xml.template");
    FileManager.CreateFile("activity_main.xml", activityMainXmlTemplate);

    var listRowXmlTemplate = FileManager.ReadFile("list_row.xml.template");
    FileManager.CreateFile("list_row.xml", listRowXmlTemplate);

    var borderXmlTemplate = FileManager.ReadFile("border.xml.template");
    FileManager.CreateFile("border.xml", borderXmlTemplate);

    var manifestXmlTemplate = FileManager.ReadFile("AndroidManifest.xml.template");
    var manifestXml = ProcessTemplate(manifestXmlTemplate, profiledata);
    FileManager.CreateFile("AndroidManifest.xml", manifestXml);

    var copyToAndroidStudioTemplate = FileManager.ReadFile("copy_to_android_studio.bat.template");
	copyToAndroidStudio = copyToAndroidStudioTemplate.replace(rx_custom_namespace_tag, namespace_as_dir);
    FileManager.CreateFile("copy_to_android_studio.bat", copyToAndroidStudio);

    FileManager.CopyFile("bds_icon.png", "ic_launcher.png")

    log("Android Client Plugin: Finished");
}



