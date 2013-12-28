package arktikfoxwebservices
import grails.converters.XML

class InsecurePasswordsController{

    def save() {
		def type = request.JSON.type
		def url = request.JSON.url
		
		def record = new InsecurePasswordFieldRecord(location: url, offenderType: OffenderType.FORM )
		def valid = record.validate()
		record.save(failOnError:true)
	}
}
