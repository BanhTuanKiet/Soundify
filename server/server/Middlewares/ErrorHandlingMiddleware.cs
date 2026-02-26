using System.Net;
using System.Text.Json;
using server.Configs;
using server.Shared;

public class ErrorHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ErrorHandlingMiddleware> _logger;
    private const string DEFAULT_ERROR_MESSAGE = "Something went wrong! Please try again!";

    public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            Console.WriteLine("Not Error");
            await _next(context);
        }
        catch (ErrorException exception)
        {
            _logger.LogError(exception, "Custom error occurred.");
            Console.WriteLine(exception.ErrorMessage);
            await HandleExceptionAsync(context, exception);
        }
        catch (Exception otherException)
        {
            _logger.LogError(otherException, "Other exception.");
            Console.WriteLine(otherException.Message);
            await HandleOtherExceptionAsync(context, otherException);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, ErrorException exception)
    {
        Console.WriteLine("HandleExceptionAsync;");
        Console.WriteLine(exception.StackTrace);

        var response = context.Response;
        response.ContentType = "application/json";

        if (exception.StatusCode == 500)
        {
            exception.ErrorMessage = DEFAULT_ERROR_MESSAGE;
        }

        response.StatusCode = exception.StatusCode;

        var errorResponse = new
        {
            ErrorMessage = exception.ErrorMessage,
            //Detail = exception.StackTrace
        };

        return response.WriteAsync(JsonSerializer.Serialize(errorResponse));
    }

    private static Task HandleOtherExceptionAsync(HttpContext context, Exception exception)
    {
        Console.WriteLine("HandleOtherExceptionAsync");
        Console.WriteLine(exception.StackTrace);
        
        var response = context.Response;
        response.ContentType = "application/json";
        response.StatusCode = 500;

        var errorResponse = new
        {
            ErrorMessage = DEFAULT_ERROR_MESSAGE
            //Detail = exception.StackTrace
        };

        return response.WriteAsync(JsonSerializer.Serialize(errorResponse));
    }
}