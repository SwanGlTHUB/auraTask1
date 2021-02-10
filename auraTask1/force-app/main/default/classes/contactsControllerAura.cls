public class contactsControllerAura {
    
    @AuraEnabled
    public static List<Contact> getContacts(String searchString) {
        String searchTemplate = '%' + searchString + '%';
        
        List<Contact> contacts = [
            SELECT Account.Name, Email, MobilePhone, AccountId, FirstName, LastName, CreatedDate
            FROM Contact
            WHERE FirstName LIKE :searchTemplate
            LIMIT 100
        ];

        return contacts;
    }
}
