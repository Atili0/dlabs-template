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

var $fileinputname$ = (function () {
    //Private properties & methods

    //var x = 0;
    //var _privateMethod = function() {
    //    return x++;
    //};

    return {
        Load: load,
        Save: save,
        function1: function () {
            //TODO: Do stuff
            //return x;
        }
    };

    function load() {
            attachEventsToFields();
    }

    function save() {
    }

    function attachEventsToFields() {

        /*var field = S2G.Fields.GetField('ownerid');
        if (field != null) {
            field.addOnChange(onChangePropietario);
        }
        */
    }

})();

/**
 * Returns the square of the number passed to the function.
 *  for formcontext more information in https://docs.microsoft.com/es-es/dynamics365/customer-engagement/developer/clientapi/clientapi-form-context
 *  for executionContext more information in https://docs.microsoft.com/es-es/dynamics365/customer-engagement/developer/clientapi/clientapi-execution-context
 * @param {number} input Specifies the value to be calculated.
 */

function main_load(pExecutionContext) {
    require.config({
        paths: {
            "jquery": "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min",
            "s2gfunction": "../WebResources/<folder>/js/v9_s2gfunction"
        }
    });

    S2G_V9.Context._executionContext = pExecutionContext;
    S2G_V9.Context._formContext = executionContext.getFormContext();

    require(['jquery', 's2gfunction'], function () {
        relax_descuentos.Load();
    });
};