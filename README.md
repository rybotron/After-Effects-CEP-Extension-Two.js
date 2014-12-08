After-Effects-CEP-Extension-Two.js
==================================

Applications will normally not load an extension unless it is cryptographically signed. However, during development we want to be able to quickly test an extension without having to sign it. To turn on debug mode:

On Mac, open the file ~/Library/Preferences/com.adobe.CSXS.4.plist and add a row with key PlayerDebugMode, of type String, and value 1.
On Windows, open the registry key HKEY_CURRENT_USER/Software/Adobe/CSXS.4 and add a key named PlayerDebugMode, of type String, and value 1.
You should only need to do this once.

Copying the extension into place

Now that the system is ready to load our unsigned extension, the last thing we have to do is copy our extension into the shared extensions folder on disk:

On Mac, copy the extension into ~/Library/Application Support/Adobe/CEPServiceManager4/extensions
On Windows, copy the extension into %APPDATA%\Adobe\CEPServiceManager4\extensions
