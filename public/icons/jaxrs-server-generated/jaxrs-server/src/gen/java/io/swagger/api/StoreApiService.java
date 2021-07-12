package io.swagger.api;

import io.swagger.api.*;
import io.swagger.model.*;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;

import java.util.Map;
import io.swagger.model.Order;

import java.util.List;
import io.swagger.api.NotFoundException;

import java.io.InputStream;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.validation.constraints.*;
@javax.annotation.Generated(value = "io.swagger.codegen.languages.JavaJerseyServerCodegen", date = "2021-07-09T13:55:39.116Z")
public abstract class StoreApiService {
    public abstract Response deleteOrder( @Min(1L)Long orderId,SecurityContext securityContext) throws NotFoundException;
    public abstract Response getInventory(SecurityContext securityContext) throws NotFoundException;
    public abstract Response getOrderById( @Min(1L) @Max(10L)Long orderId,SecurityContext securityContext) throws NotFoundException;
    public abstract Response placeOrder(Order body,SecurityContext securityContext) throws NotFoundException;
}
