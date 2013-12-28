package arktikfoxwebservices

class InsecurePasswordFieldRecord {	
	String location;

    static constraints = {
		location url: true 
    }
}
