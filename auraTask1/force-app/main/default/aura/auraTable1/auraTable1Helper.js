({
    apex: function(cmp, method, params) {
        return new Promise(function (resolve, reject) {
            var action = cmp.get("c." + method);
            action.setParams(params);
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    resolve(response.getReturnValue());
                }
                else if (state === "INCOMPLETE") {
                    // do something
                }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors && errors[0] && errors[0].message) {
                        console.log("Error message: " +
                                    errors[0].message);
                        reject(errors[0].message);
                    } else {
                        console.log("Unknown error");
                        reject("Unknown error");
                    }
                }
            });
            $A.enqueueAction(action);
        });
    },

    refreshContacts: function(component, event, helper, searchString){
        helper.apex(component, 'getContacts', {searchString: searchString})
        .then((result) => {
            result = result.map((item) => {
                if(!item.hasOwnProperty('Account')){
                    return
                }
                item['accountPageUrl'] = '/lightning/r/Account/' + item.AccountId + '/view'
                return item
            })
            console.log(result)
            component.set('v.contacts', result)
        })
        .catch((error) => {
            console.log(error)
        })
    }
})
