({
    doInit : function(component, event, helper) {
        helper.refreshContacts(component, event, helper, '')
    },
    handleFilterButtonClick : function(component, event, helper){
        let searchInput = component.find('searchInput')
        let searchText = searchInput.get('v.value')
        helper.refreshContacts(component, event, helper, searchText)
    }
})
