/*
Copyright 2018 Deloitte Labs.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/// <reference path="v9_s2gfunction.js" />

/*
Enter a suitable multi line comment here. 
For formcontext more information in https://docs.microsoft.com/es-es/dynamics365/customer-engagement/developer/clientapi/clientapi-form-context
for executionContext more information in https://docs.microsoft.com/es-es/dynamics365/customer-engagement/developer/clientapi/clientapi-execution-context
*/

'use strict';

//If the MyUniqueName namespace object isn’t defined, create it.
if (typeof (MyUniqueName) == "undefined") { MyUniqueName = {}; }
// Create Namespace container for functions in this library;
MyUniqueName.MyFunctions = {
    performMyAction: function () {
        // Code to perform your action.
        //Call another function in your library
        this.anotherAction();
    },
    anotherAction: function () {
        // Code in another function
    }
};