
class Vault {

    /** 
     * @param {String} username
     * @param {String} password
    */

    constructor(){
    //constructor(username,password) {
        // this.username = username;
        // this.password = password;
    
        this.username = "b949c2cae91bd8280bf0bfb75895a0e94f5cc956e93ac027ca85184064d421f2";
        this.password = "5f71a63474e4fa52e40307103c5d59acfa0e6b266e6fd8e0b9a17e043f539c97"
    }
    
    static from(object) {
        if (!object) {
            return null;
        }

        return new Vault(
            object.username,
            object.password
        );
    }
    

}

export default Vault;


