package ru.belkevglaz;

import io.quarkus.security.Authenticated;
import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;
import ru.belkevglaz.bo.ReportEntryList;

@Path("/reports")
@ApplicationScoped
@Authenticated
public class ReportResource {

	public static final String ALLOWED_ROLE = "prothetic_user";

	@GET
	@RolesAllowed(ALLOWED_ROLE)
	public Response getReports() {
		return Response.ok().entity(ReportEntryList.defaults()).build();
	}

}
