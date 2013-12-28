class UrlMappings {

	static mappings = {
		"/$controller/$action?/$id?"{
			constraints {
				// apply constraints here
			}
		}
		
		"/insecure_passwords"(controller: "insecurePasswords") {
			action = [ GET: "do_not_allow", POST: "save", parseRequest:true ]
			}
			
		"/"(view:"/index")
		"500"(view:'/error')
	}
}
