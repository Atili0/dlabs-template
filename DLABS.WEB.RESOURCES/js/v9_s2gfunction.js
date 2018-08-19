if (typeof (S2G_V9) == "undefined") { S2G_V9 = { __namespace: true }; }

S2G_V9.Context = {
    //Get Server Url
    //USE GetServerUrl()
    GetServerUrl: function () {
        var serverUrl = "";
        if (typeof GetGlobalContext == "function") {
            var context = GetGlobalContext();
            if (typeof context.getClientUrl != "undefined" && typeof context.getClientUrl == "function") {
                serverUrl = context.getClientUrl();
            }
            else {
                serverUrl = context.getServerUrl();
            }
        }
        else {
            if (typeof Xrm.Page.context == "object") {
                if (typeof Xrm.Page.context.getClientUrl != "undefined" && typeof Xrm.Page.context.getClientUrl == "function") {
                    serverUrl = Xrm.Page.context.getClientUrl();
                }
                else {
                    serverUrl = Xrm.Page.context.getServerUrl();
                }
            }
            else {
                throw new Error("Unable to access the server URL");
            }
        }
        if (serverUrl.match(/\/$/)) {
            serverUrl = serverUrl.substring(0, serverUrl.length - 1);
        }
        return serverUrl;
    },
    //Get Server Url
    //USE GetServerUrl()
    GetUserId: function () {
        var userId;
        if (typeof GetGlobalContext == "function") {
            var context = GetGlobalContext();
            userId = context.getUserId();
        }
        else {
            if (typeof Xrm.Page.context == "object") {
                userId = Xrm.Page.context.getUserId();
            }
            else {
                throw new Error("Unable to access User ID");
            }
        }
        return userId;
    },
    //Returns the GUID's of the roles to which the user belongs
    //USE: GetUserRoles()
    GetUserRoles: function () {
        var currentUserRoles = null;
        if (typeof GetGlobalContext == "function") {
            var context = GetGlobalContext();
            currentUserRoles = context.getUserRoles();
        }
        else {
            if (typeof Xrm.Page.context == "object") {
                currentUserRoles = Xrm.Page.context.getUserRoles();
            }
            else {
                throw new Error("Unable to access User Roles");
            }
        }
        return currentUserRoles;
    },
    //Return the Organization Name
    GetOrganizationName: function () {
        var organizationName;
        if (typeof GetGlobalContext == "function") {
            var context = GetGlobalContext();
            userId = context.getOrgUniqueName();
        }
        else {
            if (typeof Xrm.Page.context == "object") {
                userId = Xrm.Page.context.getOrgUniqueName();
            }
            else {
                throw new Error("Unable to access Organization Name");
            }
        }
        return organizationName;
    },
    GetContext: function () {
        var context = null;
        if (typeof GetGlobalContext == "function") {
            context = GetGlobalContext();
        }
        else {
            if (typeof Xrm.Page.context == "object") {
                context = Xrm.Page.context;
            }
            else {
                throw new Error("Unable to access Context");
            }
        }
        return context;
    },
    GetServerUrlMetadata: function () {
        var serverUrl = "";
        if (typeof GetGlobalContext == "function") {
            var context = GetGlobalContext();
            if (typeof context.getClientUrl != "undefined" && typeof context.getClientUrl == "function") {
                serverUrl = context.getClientUrl() + "/XRMServices/2011/Organization.svc/web";
            }
            else {
                serverUrl = context.getServerUrl() + "/XRMServices/2011/Organization.svc/web";
            }
        }
        else {
            if (typeof Xrm.Page.context == "object") {
                if (typeof Xrm.Page.context.getClientUrl != "undefined" && typeof Xrm.Page.context.getClientUrl == "function") {
                    serverUrl = Xrm.Page.context.getClientUrl() + "/XRMServices/2011/Organization.svc/web";
                }
                else {
                    serverUrl = Xrm.Page.context.getServerUrl() + "/XRMServices/2011/Organization.svc/web";
                }
            }
            else {
                throw new Error("Unable to access the server URL");
            }
        }
        if (serverUrl.match(/\/$/)) {
            serverUrl = serverUrl.substring(0, serverUrl.length - 1);
        }
        return serverUrl;
    },
    GetEntityName: function () {
        return Xrm.Page.data.entity.getEntityName();
    },
    __namespace: true
};


/** @description Determines the area of a circle that has the specified radius parameter.  
 */
S2G_V9.Rest = {
    /**
     * Returns the square of the number passed to the function.
     */
    _ODataPath: function () {
        return S2G.Context.GetServerUrl() + "/api/data/v8.2/";
    },
    _errorHandler: function (req) {
        ///<summary>
        /// Private function return an Error object to the errorCallback
        ///</summary>
        ///<param name="req" type="XMLHttpRequest">
        /// The XMLHttpRequest response that returned an error.
        ///</param>
        ///<returns>Error</returns>
        //Error descriptions come from http://support.microsoft.com/kb/193625
        if (req.status == 12029) { return new Error("The attempt to connect to the server failed."); }
        if (req.status == 12007) { return new Error("The server name could not be resolved."); }
        if (req.status == 500) { return new Error("Internal Server Error."); }
        if (req.status == 400) { return new Error("Datos no válidos."); }
        var errorText;
        try { errorText = JSON.parse(req.responseText).error.message.value; }
        catch (e) { errorText = req.responseText }
        return new Error("Error : " +
            req.status + ": " +
            req.statusText + ": " + errorText);
    },
    _dateReviver: function (key, value) {
        ///<summary>
        /// Private function to convert matching string values to Date objects.
        ///</summary>
        ///<param name="key" type="String">
        /// The key used to identify the object property
        ///</param>
        ///<param name="value" type="String">
        /// The string value representing a date
        ///</param>
        var a;
        if (typeof value === 'string') {
            a = /Date\(([-+]?\d+)\)/.exec(value);
            if (a) {
                return new Date(parseInt(value.replace("/Date(", "").replace(")/", ""), 10));
            }
        }
        return value;
    },
    _parameterCheck: function (parameter, message) {
        ///<summary>
        /// Private function used to check whether required parameters are null or undefined
        ///</summary>
        ///<param name="parameter" type="Object">
        /// The parameter to check;
        ///</param>
        ///<param name="message" type="String">
        /// The error message text to include when the error is thrown.
        ///</param>
        if ((typeof parameter === "undefined") || parameter === null) {
            throw new Error(message);
        }
    },
    _stringParameterCheck: function (parameter, message) {
        if (typeof parameter != "string") {
            throw new Error(message);
        }
    },
    _callbackParameterCheck: function (callbackParameter, message) {
        if (typeof callbackParameter != "function") {
            throw new Error(message);
        }
    },

    /**
     * Returns the square of the number passed to the function.
     * @param {number} input Specifies the value to be calculated.
     */ 
    createRecord: function (object, type, successCallback, errorCallback, async) {
        ///<summary>
        /// Sends an asynchronous request to create a new record.
        ///</summary>
        ///<param name="object" type="Object">
        /// A JavaScript object with properties corresponding to the Schema name of
        /// entity attributes that are valid for create operations.
        ///</param>
        this._parameterCheck(object, "S2G.Rest.createRecord requires the object parameter.");
        ///<param name="type" type="String">
        /// The Schema Name of the Entity type record to create.
        /// For an Account record, use "Account"
        ///</param>
        this._stringParameterCheck(type, "S2G.Rest.createRecord requires the type parameter is a string.");
        ///<param name="successCallback" type="Function">
        /// The function that will be passed through and be called by a successful response. 
        /// This function can accept the returned record as a parameter.
        /// </param>
        this._callbackParameterCheck(successCallback, "S2G.Rest.createRecord requires the successCallback is a function.");
        ///<param name="errorCallback" type="Function">
        /// The function that will be passed through and be called by a failed response. 
        /// This function must accept an Error object as a parameter.
        /// </param>
        this._callbackParameterCheck(errorCallback, "S2G.Rest.createRecord requires the errorCallback is a function.");
        var req = new XMLHttpRequest();
        if (async == null) {
            async = false;
        }

        var req = new XMLHttpRequest();
        req.open("POST", encodeURI(this._ODataPath() + type + ""), async);
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.onreadystatechange = function () {
            if (this.readyState === 4) {
                req.onreadystatechange = null;
                if (this.status === 204) {
                    var uri = this.getResponseHeader("OData-EntityId");
                    var regExp = /\(([^)]+)\)/;
                    var matches = regExp.exec(uri);
                    var newEntityId = matches[1];

                    successCallback(newEntityId);
                } else {
                    errorCallback(this.response);
                }
            }
        };
        req.send(JSON.stringify(object));
    },


    /** @description Determines the area of a circle that has the specified radius parameter.  
    */
    deleteRecord: function (id, type, successCallback, errorCallback, async) {
        ///<summary>
        /// Sends an asynchronous request to delete a record.
        ///</summary>
        ///<param name="id" type="String">
        /// A String representing the GUID value for the record to delete.
        ///</param>
        this._stringParameterCheck(id, "S2G.Rest.deleteRecord requires the id parameter.");
        ///<param name="type" type="String">
        /// The Schema Name of the Entity type record to delete.
        /// For an Account record, use "Account"
        ///</param>
        this._stringParameterCheck(type, "S2G.Rest.deleteRecord requires the type parameter.");
        ///<param name="successCallback" type="Function">
        /// The function that will be passed through and be called by a successful response. 
        /// Nothing will be returned to this function.
        /// </param>
        this._callbackParameterCheck(successCallback, "S2G.Rest.deleteRecord requires the successCallback is a function.");
        ///<param name="errorCallback" type="Function">
        /// The function that will be passed through and be called by a failed response. 
        /// This function must accept an Error object as a parameter.
        /// </param>
        this._callbackParameterCheck(errorCallback, "S2G.Rest.deleteRecord requires the errorCallback is a function.");
        var req = new XMLHttpRequest();
        if (async == null) {
            async = false;
        }

        req.open("DELETE", encodeURI(this._ODataPath() + type + "Set(guid'" + id + "')"), async);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.onreadystatechange = function () {

            if (this.readyState == 4 /* complete */) {
                req.onreadystatechange = null;
                if (this.status == 204 || this.status == 1223) {
                    successCallback();
                }
                else {
                    errorCallback(S2G.Rest._errorHandler(this));
                }
            }
        };
        req.send();
    },


    /**
     * Returns the square of the number passed to the function.
     * @param {number} input Specifies the value to be calculated.
     */ 
    retrieveRecord: function (id, type, select, expand, successCallback, errorCallback, async) {
        ///<summary>
        /// Sends an asynchronous request to retrieve a record.
        ///</summary>
        ///<param name="id" type="String">
        /// A String representing the GUID value for the record to retrieve.
        ///</param>
        this._stringParameterCheck(id, "S2G.Rest.retrieveRecord requires the id parameter is a string.");
        ///<param name="type" type="String">
        /// The Schema Name of the Entity type record to retrieve.
        /// For an Account record, use "Account"
        ///</param>
        this._stringParameterCheck(type, "S2G.Rest.retrieveRecord requires the type parameter is a string.");
        ///<param name="select" type="String">
        /// A String representing the $select OData System Query Option to control which
        /// attributes will be returned. This is a comma separated list of Attribute names that are valid for retrieve.
        /// If null all properties for the record will be returned
        ///</param>
        if (select != null)
            this._stringParameterCheck(select, "S2G.Rest.retrieveRecord requires the select parameter is a string.");
        ///<param name="expand" type="String">
        /// A String representing the $expand OData System Query Option value to control which
        /// related records are also returned. This is a comma separated list of of up to 6 entity relationship names
        /// If null no expanded related records will be returned.
        ///</param>
        if (expand != null)
            this._stringParameterCheck(expand, "S2G.Rest.retrieveRecord requires the expand parameter is a string.");
        ///<param name="successCallback" type="Function">
        /// The function that will be passed through and be called by a successful response. 
        /// This function must accept the returned record as a parameter.
        /// </param>
        this._callbackParameterCheck(successCallback, "S2G.Rest.retrieveRecord requires the successCallback parameter is a function.");
        ///<param name="errorCallback" type="Function">
        /// The function that will be passed through and be called by a failed response. 
        /// This function must accept an Error object as a parameter.
        /// </param>
        this._callbackParameterCheck(errorCallback, "S2G.Rest.retrieveRecord requires the errorCallback parameter is a function.");

        var systemQueryOptions = "";

        if (select != null || expand != null) {
            systemQueryOptions = "?";
            if (select != null) {
                var selectString = "$select=" + select;
                if (expand != null) {
                    selectString = selectString + "," + expand;
                }
                systemQueryOptions = systemQueryOptions + selectString;
            }
            if (expand != null) {
                systemQueryOptions = systemQueryOptions + "&$expand=" + expand;
            }
        }


        if (async == null) {
            async = false;
        }
        var req = new XMLHttpRequest();
        var _url = encodeURI(this._ODataPath() + type + "(" + id + ")" + systemQueryOptions);
        req.open("GET", _url, async);
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
        req.onreadystatechange = function () {
            if (this.readyState == 4 /* complete */) {
                req.onreadystatechange = null;
                if (this.status == 200) {
                    successCallback(JSON.parse(this.responseText, S2G.Rest._dateReviver));
                }
                else {
                    errorCallback(S2G.Rest._errorHandler(this));
                }
            }
        };
        req.send();
    },

    /**
     * Returns the square of the number passed to the function.
     * @param {number} input Specifies the value to be calculated.
     */ 
    retrieveMultipleRecords: function (type, options, successCallback, errorCallback, OnComplete, async, encode) {
        ///<summary>
        /// Sends an asynchronous request to retrieve records.
        ///</summary>
        ///<param name="type" type="String">
        /// The Schema Name of the Entity type record to retrieve.
        /// For an Account record, use "Account"
        ///</param>
        this._stringParameterCheck(type, "S2G.Rest.retrieveMultipleRecords requires the type parameter is a string.");
        ///<param name="options" type="String">
        /// A String representing the OData System Query Options to control the data returned
        ///</param>
        if (options != null)
            this._stringParameterCheck(options, "S2G.Rest.retrieveMultipleRecords requires the options parameter is a string.");
        ///<param name="successCallback" type="Function">
        /// The function that will be passed through and be called for each page of records returned.
        /// Each page is 50 records. If you expect that more than one page of records will be returned,
        /// this function should loop through the results and push the records into an array outside of the function.
        /// Use the OnComplete event handler to know when all the records have been processed.
        /// </param>
        this._callbackParameterCheck(successCallback, "S2G.Rest.retrieveMultipleRecords requires the successCallback parameter is a function.");
        ///<param name="errorCallback" type="Function">
        /// The function that will be passed through and be called by a failed response. 
        /// This function must accept an Error object as a parameter.
        /// </param>
        this._callbackParameterCheck(errorCallback, "S2G.Rest.retrieveMultipleRecords requires the errorCallback parameter is a function.");
        ///<param name="OnComplete" type="Function">
        /// The function that will be called when all the requested records have been returned.
        /// No parameters are passed to this function.
        /// </param>
        this._callbackParameterCheck(OnComplete, "S2G.Rest.retrieveMultipleRecords requires the OnComplete parameter is a function.");

        var optionsString;
        if (options != null) {
            if (options.charAt(0) != "?") {
                optionsString = "?$" + options;
            }
            else {
                optionsString = options;
            }
        }
        var req = new XMLHttpRequest();
        var asyncExecution = false; //Synchronous by default
        if (async != null) {
            asyncExecution = async;
        }

        if (encode == null) {
            req.open("GET", encodeURI(this._ODataPath() + type + "" + optionsString), asyncExecution);
        }
        else {
            req.open("GET", this._ODataPath() + type + "" + optionsString, asyncExecution);
        }

        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");

        req.onreadystatechange = function () {
            if (this.readyState == 4 /* complete */) {
                this.onreadystatechange = null; //avoids memory leaks
                if (this.status == 200) {
                    var returned = JSON.parse(this.responseText, S2G.Rest._dateReviver);
                    if (returned.value.length > 0)
                        successCallback(returned.value);

                    if (returned.__next != null) {
                        var queryOptions = returned.__next.substring((S2G.Rest._ODataPath() + type + "Set").length);
                        S2G_V9.Rest.retrieveMultipleRecords(type, queryOptions, successCallback, errorCallback, OnComplete, asyncExecution, false);
                    }
                    else {
                        OnComplete();
                    }
                }
                else {
                    errorCallback(S2G.Rest._errorHandler(this));
                }
            }
        };
        req.send();
    },

    /**
     * Returns the square of the number passed to the function.
     * @param {number} input Specifies the value to be calculated.
     */
    disassociateRecords: function (parentId, parentType, relationshipName, childId, successCallback, errorCallback, async) {
        this._stringParameterCheck(parentId, "SDK.REST.disassociateRecords requires the parentId parameter is a string.");
        this._stringParameterCheck(parentType, "SDK.REST.disassociateRecords requires the parentType parameter is a string.");
        this._stringParameterCheck(relationshipName, "SDK.REST.disassociateRecords requires the relationshipName parameter is a string.");
        this._stringParameterCheck(childId, "SDK.REST.disassociateRecords requires the childId parameter is a string.");
        this._callbackParameterCheck(successCallback, "SDK.REST.disassociateRecords requires the successCallback parameter is a function.");
        this._callbackParameterCheck(errorCallback, "SDK.REST.disassociateRecords requires the errorCallback parameter is a function.");
        if (async == null) {
            async = false;
        }
        var req = new XMLHttpRequest();      
        var _url = encodeURI(this._ODataPath() + parentType + "(" + parentId + ")/" + relationshipName + "(" + childId + ")/$ref", false);
        req.open("DELETE", _url);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.onreadystatechange = function () {
            if (this.readyState === 4) {
                req.onreadystatechange = null;
                if (this.status === 204 || this.status === 1223) {
                    successCallback();
                } else {
                    errorCallback(S2G.Rest._errorHandler(this));
                }
            }
        };
        req.send();
    },

    /**
     * Returns the square of the number passed to the function.
     * @param {number} input Specifies the value to be calculated.
     */ 
    associateRecords: function (parentId, parentType, relationshipName, childId, childType, successCallback, errorCallback, async) {
        this._stringParameterCheck(parentId, "SDK.REST.associateRecords requires the parentId parameter is a string.");
        this._stringParameterCheck(parentType, "SDK.REST.associateRecords requires the parentType parameter is a string.");
        this._stringParameterCheck(relationshipName, "SDK.REST.associateRecords requires the relationshipName parameter is a string.");
        this._stringParameterCheck(childId, "SDK.REST.associateRecords requires the childId parameter is a string.");
        this._stringParameterCheck(childType, "SDK.REST.associateRecords requires the childType parameter is a string.");
        this._callbackParameterCheck(successCallback, "SDK.REST.associateRecords requires the successCallback parameter is a function.");
        this._callbackParameterCheck(errorCallback, "SDK.REST.associateRecords requires the errorCallback parameter is a function.");
        if (async == null) {
            async = false;
        }

        var association = {
            "@odata.id": this._ODataPath() + parentType + "(" + parentId + ")",
        };

        var req = new XMLHttpRequest();
        var _url = encodeURI(this._ODataPath() + childType + "(" + childId + ")/" + relationshipName + "/$ref", async)
        req.open("POST", _url);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.onreadystatechange = function () {
            if (this.readyState === 4) {
                req.onreadystatechange = null;
                if (this.status === 204 || this.status === 1223) {
                    successCallback();
                } else {
                    errorCallback(S2G.Rest._errorHandler(this));
                }
            }
        };
        req.send(JSON.stringify(association));
    },
    __namespace: true
};

S2G_V9.Notifications = {
    INFORMATION_ALERT: "INFO",
    WARNING_ALERT: "WARNING",
    ERROR_ALERT: "ERROR",

    /**
     * Returns the square of the number passed to the function.
     * @param {string} pMessageToShow Specifies the value to be calculated.
     * @param {int} pIdAlert Specifies the value to be calculated.
     */
    ShowInfoAlert: function (pMessageToShow, pMessageId) {
        Xrm.Page.ui.setFormNotification(pMessageToShow, this.INFORMATION_ALERT, pMessageId);
    },

    /**
     * Returns the square of the number passed to the function.
     * @param {number} input Specifies the value to be calculated.
     */
    ShowCriticalAlert: function (pMessageToShow, pMessageId) {
        Xrm.Page.ui.setFormNotification(pMessageToShow, this.ERROR_ALERT, pMessageId);
    },

    /**
     * Returns the square of the number passed to the function.
     * @param {number} input Specifies the value to be calculated.
     */ 
    RemoveAllAlert: function () {
        Xrm.Page.ui.clearFormNotification()
    },

    /**
     * Returns the square of the number passed to the function.
     * @param {number} input Specifies the value to be calculated.
     */
    ShowInfoInField: function (pField, pMessage) {
        Xrm.Page.getControl(pField).setNotification(pMessage);
    },
    __namespace: true
};