package arktikfoxwebservices

import static org.junit.Assert.*
import org.junit.*

class InsecurePasswordsControllerIntegrationTests{
	def transactional = false
    @Before
    void setUp() {
        // Setup logic here
    }

    @After
    void tearDown() {
        // Tear down logic here
    }

    @Test
    void testSomething() {


        def controller = new InsecurePasswordsController()
		controller.request.JSON.url = "http://www.google.com"
		controller.save()
		
		
		println "" + record.id
    }
}
