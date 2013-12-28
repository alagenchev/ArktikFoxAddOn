package arktikfoxwebservices



import grails.test.mixin.*
import org.junit.*

/**
 * See the API for {@link grails.test.mixin.domain.DomainClassUnitTestMixin} for usage instructions
 */
@TestFor(InsecurePasswordFieldRecord)
class InsecurePasswordFieldRecordTests {

    void testLocationURL() {
		mockForConstraintsTests(InsecurePasswordFieldRecord)
		def record = new InsecurePasswordFieldRecord(location: "test")
        assert !record.validate()
		assert "url" == record.errors["location"]
    }
	
	void testLocationBlank() {
		mockForConstraintsTests(InsecurePasswordFieldRecord)
		def record = new InsecurePasswordFieldRecord()
		assert !record.validate()
		assert "nullable" == record.errors["location"]
	}
}
