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

function main_load() {
    require.config({
        paths: {
            "jquery": "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min",
            "s2gfunction": "../WebResources/<folder>/js/s2gfunction"
        }
    });

    require(['jquery', 's2gfunction'], function () {
        relax_descuentos.Load();
    });
};