import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {Tooltip,Select, ListBox, Separator, Label,Header} from "@heroui/react";
import { useDispatch } from 'react-redux';
import { setWorkspace, loadWorkspace, clearWorkspace, changeWorkspace } from './store/features/workspaceSlice';

function Api() {
  const redux_theme = useSelector((state) => state.theme);
  const isLight = redux_theme.theme === true;

  const [body, setBody] = useState(`{\n  "email": "developer@apiflow.com",\n  "password": "hashed_pwd_secret"\n}`);

  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('https://httpbin.org/status/404');
  const [activeTab, setActiveTab] = useState('params');

  const [headers, setHeaders] = useState([
    { key: 'Content-Type', value: 'application/json' },
  ]);

  const workspace = useSelector((state) => state.workspace ?? []);
  const activeWorkspace = workspace.find((item) => item.active);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadWorkspace());
  }, []);

  const [params, setParams] = useState([
    { key: 'limit', value: '100' },
  ]);


  const headerPresets = [
 
  // ─── Authentication ───────────────────────────────────────────────────────
  {
    category: "Authentication",
    headers: [
      { key: "Authorization",  placeholder: "Bearer eyJhbGciOiJIUzI1NiJ9...",  description: "Bearer token for OAuth 2.0 / JWT authentication" },
      { key: "Authorization",  placeholder: "Basic dXNlcjpwYXNz",              description: "Base64 encoded username:password for Basic auth" },
      { key: "X-API-Key",      placeholder: "your-api-key-here",               description: "API key passed as a custom request header" },
      { key: "X-Auth-Token",   placeholder: "your-auth-token",                 description: "Custom token-based authentication header" },
    ],
  },
 
  // ─── Content ─────────────────────────────────────────────────────────────
  {
    category: "Content",
    headers: [
      { key: "Content-Type",     placeholder: "application/json",                    description: "Media type of the request body being sent" },
      { key: "Content-Type",     placeholder: "multipart/form-data",                 description: "Used for file uploads and form data" },
      { key: "Content-Type",     placeholder: "application/x-www-form-urlencoded",   description: "URL-encoded form data submission" },
      { key: "Content-Type",     placeholder: "text/plain",                          description: "Plain text body content" },
      { key: "Accept",           placeholder: "application/json",                    description: "Tell the server what response format you expect" },
      { key: "Accept",           placeholder: "text/html",                           description: "Request HTML response from the server" },
      { key: "Accept",           placeholder: "*/*",                                 description: "Accept any response content type" },
      { key: "Accept-Language",  placeholder: "en-US",                              description: "Preferred language for the response content" },
      { key: "Accept-Encoding",  placeholder: "gzip, deflate, br",                  description: "Compression formats the client can handle" },
      { key: "Content-Length",   placeholder: "348",                                description: "Size of the request body in bytes" },
      { key: "Content-Encoding", placeholder: "gzip",                               description: "Encoding applied to the request body" },
    ],
  },
 
  // ─── Caching ─────────────────────────────────────────────────────────────
  {
    category: "Caching",
    headers: [
      { key: "Cache-Control",     placeholder: "no-cache",                          description: "Force revalidation with the server before using cache" },
      { key: "Cache-Control",     placeholder: "no-store",                          description: "Do not store the response in any cache" },
      { key: "Cache-Control",     placeholder: "max-age=3600",                      description: "Cache the response for up to 3600 seconds" },
      { key: "If-None-Match",     placeholder: "\"abc123etag\"",                    description: "Return 304 if the resource ETag has not changed" },
      { key: "If-Modified-Since", placeholder: "Wed, 21 Oct 2024 07:28:00 GMT",     description: "Return 304 if resource has not changed since this date" },
      { key: "Pragma",            placeholder: "no-cache",                          description: "Legacy HTTP/1.0 cache control directive" },
      { key: "Expires",           placeholder: "Thu, 01 Jan 2026 00:00:00 GMT",     description: "Date and time after which the response is stale" },
    ],
  },
 
  // ─── CORS ─────────────────────────────────────────────────────────────────
  {
    category: "CORS",
    headers: [
      { key: "Origin",                          placeholder: "https://yourapp.com",          description: "Origin of the request for CORS validation" },
      { key: "Access-Control-Request-Method",   placeholder: "POST",                         description: "HTTP method to be used in the actual CORS request" },
      { key: "Access-Control-Request-Headers",  placeholder: "Content-Type, Authorization",  description: "Headers to be sent in the actual CORS request" },
    ],
  },
 
  // ─── Request Metadata ────────────────────────────────────────────────────
  {
    category: "Request Metadata",
    headers: [
      { key: "User-Agent",    placeholder: "MyApp/1.0.0",               description: "Identifies the client application making the request" },
      { key: "Referer",       placeholder: "https://yourapp.com/page",  description: "URL of the page that initiated the request" },
      { key: "Host",          placeholder: "api.example.com",           description: "Domain name of the server being requested" },
      { key: "Connection",    placeholder: "keep-alive",                description: "Control whether the connection stays open after the request" },
      { key: "Upgrade",       placeholder: "websocket",                 description: "Request to upgrade the connection protocol" },
    ],
  },
 
  // ─── Custom / App-Specific ───────────────────────────────────────────────
  {
    category: "Custom",
    headers: [
      { key: "X-Request-ID",       placeholder: "abc-123-xyz",   description: "Unique ID to trace and identify a specific request" },
      { key: "X-Correlation-ID",   placeholder: "req-456",       description: "ID used to correlate requests across multiple services" },
      { key: "X-Tenant-ID",        placeholder: "tenant-001",    description: "Identifies the tenant in a multi-tenant application" },
      { key: "X-Client-Version",   placeholder: "1.0.0",         description: "Version of the client application sending the request" },
      { key: "X-Forwarded-For",    placeholder: "192.168.1.1",   description: "Original client IP when request passes through a proxy" },
      { key: "X-Real-IP",          placeholder: "203.0.113.5",   description: "Real IP address of the client behind a load balancer" },
    ],
  },
 
];

  const color_codes_bg = {
  100: "bg-blue-500/10",
  101: "bg-blue-500/10",
  102: "bg-blue-500/10",
  103: "bg-blue-500/10",
 
  // 2xx — emerald
  200: "bg-emerald-500/10",
  201: "bg-emerald-500/10",
  202: "bg-emerald-500/10",
  203: "bg-emerald-500/10",
  204: "bg-emerald-500/10",
  205: "bg-emerald-500/10",
  206: "bg-emerald-500/10",
  207: "bg-emerald-500/10",
  208: "bg-emerald-500/10",
  226: "bg-emerald-500/10",
 
  // 3xx — amber
  300: "bg-amber-500/10",
  301: "bg-amber-500/10",
  302: "bg-amber-500/10",
  303: "bg-amber-500/10",
  304: "bg-amber-500/10",
  305: "bg-amber-500/10",
  307: "bg-amber-500/10",
  308: "bg-amber-500/10",
 
  // 4xx — rose
  400: "bg-rose-500/10",
  401: "bg-rose-500/10",
  402: "bg-rose-500/10",
  403: "bg-rose-500/10",
  404: "bg-rose-500/10",
  405: "bg-rose-500/10",
  406: "bg-rose-500/10",
  407: "bg-rose-500/10",
  408: "bg-rose-500/10",
  409: "bg-rose-500/10",
  410: "bg-rose-500/10",
  411: "bg-rose-500/10",
  412: "bg-rose-500/10",
  413: "bg-rose-500/10",
  414: "bg-rose-500/10",
  415: "bg-rose-500/10",
  416: "bg-rose-500/10",
  417: "bg-rose-500/10",
  418: "bg-rose-500/10",
  421: "bg-rose-500/10",
  422: "bg-rose-500/10",
  423: "bg-rose-500/10",
  424: "bg-rose-500/10",
  425: "bg-rose-500/10",
  426: "bg-rose-500/10",
  428: "bg-rose-500/10",
  429: "bg-rose-500/10",
  431: "bg-rose-500/10",
  451: "bg-rose-500/10",
 
  // 5xx — orange
  500: "bg-orange-500/10",
  501: "bg-orange-500/10",
  502: "bg-orange-500/10",
  503: "bg-orange-500/10",
  504: "bg-orange-500/10",
  505: "bg-orange-500/10",
  506: "bg-orange-500/10",
  507: "bg-orange-500/10",
  508: "bg-orange-500/10",
  510: "bg-orange-500/10",
  511: "bg-orange-500/10",
  }

  const color_codes_text = {
    // 1xx — blue
  100: "text-blue-400",
  101: "text-blue-400",
  102: "text-blue-400",
  103: "text-blue-400",
 
  // 2xx — emerald
  200: "text-emerald-500",
  201: "text-emerald-500",
  202: "text-emerald-500",
  203: "text-emerald-500",
  204: "text-emerald-500",
  205: "text-emerald-500",
  206: "text-emerald-500",
  207: "text-emerald-500",
  208: "text-emerald-500",
  226: "text-emerald-500",
 
  // 3xx — amber
  300: "text-amber-400",
  301: "text-amber-400",
  302: "text-amber-400",
  303: "text-amber-400",
  304: "text-amber-400",
  305: "text-amber-400",
  307: "text-amber-400",
  308: "text-amber-400",
 
  // 4xx — rose
  400: "text-rose-500",
  401: "text-rose-500",
  402: "text-rose-500",
  403: "text-rose-500",
  404: "text-rose-500",
  405: "text-rose-500",
  406: "text-rose-500",
  407: "text-rose-500",
  408: "text-rose-500",
  409: "text-rose-500",
  410: "text-rose-500",
  411: "text-rose-500",
  412: "text-rose-500",
  413: "text-rose-500",
  414: "text-rose-500",
  415: "text-rose-500",
  416: "text-rose-500",
  417: "text-rose-500",
  418: "text-rose-500",
  421: "text-rose-500",
  422: "text-rose-500",
  423: "text-rose-500",
  424: "text-rose-500",
  425: "text-rose-500",
  426: "text-rose-500",
  428: "text-rose-500",
  429: "text-rose-500",
  431: "text-rose-500",
  451: "text-rose-500",
 
  // 5xx — orange
  500: "text-orange-500",
  501: "text-orange-500",
  502: "text-orange-500",
  503: "text-orange-500",
  504: "text-orange-500",
  505: "text-orange-500",
  506: "text-orange-500",
  507: "text-orange-500",
  508: "text-orange-500",
  510: "text-orange-500",
  511: "text-orange-500",
  }

  const color_codes_border = {
    // 1xx — blue
  100: "border-blue-500/20",
  101: "border-blue-500/20",
  102: "border-blue-500/20",
  103: "border-blue-500/20",
 
  // 2xx — emerald
  200: "border-emerald-500/20",
  201: "border-emerald-500/20",
  202: "border-emerald-500/20",
  203: "border-emerald-500/20",
  204: "border-emerald-500/20",
  205: "border-emerald-500/20",
  206: "border-emerald-500/20",
  207: "border-emerald-500/20",
  208: "border-emerald-500/20",
  226: "border-emerald-500/20",
 
  // 3xx — amber
  300: "border-amber-500/20",
  301: "border-amber-500/20",
  302: "border-amber-500/20",
  303: "border-amber-500/20",
  304: "border-amber-500/20",
  305: "border-amber-500/20",
  307: "border-amber-500/20",
  308: "border-amber-500/20",
 
  // 4xx — rose
  400: "border-rose-500/20",
  401: "border-rose-500/20",
  402: "border-rose-500/20",
  403: "border-rose-500/20",
  404: "border-rose-500/20",
  405: "border-rose-500/20",
  406: "border-rose-500/20",
  407: "border-rose-500/20",
  408: "border-rose-500/20",
  409: "border-rose-500/20",
  410: "border-rose-500/20",
  411: "border-rose-500/20",
  412: "border-rose-500/20",
  413: "border-rose-500/20",
  414: "border-rose-500/20",
  415: "border-rose-500/20",
  416: "border-rose-500/20",
  417: "border-rose-500/20",
  418: "border-rose-500/20",
  421: "border-rose-500/20",
  422: "border-rose-500/20",
  423: "border-rose-500/20",
  424: "border-rose-500/20",
  425: "border-rose-500/20",
  426: "border-rose-500/20",
  428: "border-rose-500/20",
  429: "border-rose-500/20",
  431: "border-rose-500/20",
  451: "border-rose-500/20",
 
  // 5xx — orange
  500: "border-orange-500/20",
  501: "border-orange-500/20",
  502: "border-orange-500/20",
  503: "border-orange-500/20",
  504: "border-orange-500/20",
  505: "border-orange-500/20",
  506: "border-orange-500/20",
  507: "border-orange-500/20",
  508: "border-orange-500/20",
  510: "border-orange-500/20",
  511: "border-orange-500/20",
  }

  const status_message = {
 
  // ─── 1xx Informational ───────────────────────────────────────────────────
 
  100: {
    message: "Continue",
    status_code: "100",
    description: "The server has received the request headers and the client should proceed to send the request body. This is used to avoid sending large request bodies when the server might reject the request based on headers alone.",
  },
  101: {
    message: "Switching Protocols",
    status_code: "101",
    description: "The server agrees to switch protocols as requested by the client via the Upgrade header. Commonly used when upgrading an HTTP connection to a WebSocket connection for real-time communication.",
  },
  102: {
    message: "Processing",
    status_code: "102",
    description: "The server has received and is processing the request, but no response is available yet. This prevents the client from timing out and assuming the request was lost during long operations.",
  },
  103: {
    message: "Early Hints",
    status_code: "103",
    description: "The server sends preliminary response headers before the final response is ready. This allows the browser to start preloading resources like CSS or JS files while the server prepares the full response.",
  },
 
  // ─── 2xx Success ─────────────────────────────────────────────────────────
 
  200: {
    message: "OK",
    status_code: "200",
    description: "The request has succeeded and the server has returned the requested resource. This is the standard success response for GET, POST, PUT, PATCH, and DELETE requests that complete without any issues.",
  },
  201: {
    message: "Created",
    status_code: "201",
    description: "The request has succeeded and a new resource has been created as a result. Typically returned after a successful POST request, and the Location header often contains the URL of the newly created resource.",
  },
  202: {
    message: "Accepted",
    status_code: "202",
    description: "The request has been accepted for processing but the processing has not been completed yet. Commonly used for asynchronous operations where the server will process the request in the background.",
  },
  203: {
    message: "Non-Authoritative Information",
    status_code: "203",
    description: "The request was successful but the response was returned from a third-party or cached source rather than the origin server. The data may differ slightly from what the origin server would have returned.",
  },
  204: {
    message: "No Content",
    status_code: "204",
    description: "The request has succeeded but there is no content to send in the response body. Commonly used for DELETE requests or updates where the client does not need any data returned from the server.",
  },
  205: {
    message: "Reset Content",
    status_code: "205",
    description: "The server has fulfilled the request and instructs the client to reset the document view. Often used after form submissions to tell the browser to clear the form fields ready for a new entry.",
  },
  206: {
    message: "Partial Content",
    status_code: "206",
    description: "The server is delivering only part of the resource due to a range request sent by the client. Used for resumable downloads or streaming where the client specifies a byte range via the Range header.",
  },
  207: {
    message: "Multi-Status",
    status_code: "207",
    description: "The response body contains multiple separate response codes for multiple independent operations. Primarily used in WebDAV where a single request may trigger multiple operations with different outcomes.",
  },
  208: {
    message: "Already Reported",
    status_code: "208",
    description: "The members of a WebDAV binding have already been enumerated in a preceding part of the multi-status response. This avoids sending the same resource information multiple times in a single response.",
  },
  226: {
    message: "IM Used",
    status_code: "226",
    description: "The server has fulfilled a GET request and the response is a result of one or more instance-manipulations applied to the current instance. Used in HTTP delta encoding to send only changes to a resource.",
  },
 
  // ─── 3xx Redirection ─────────────────────────────────────────────────────
 
  300: {
    message: "Multiple Choices",
    status_code: "300",
    description: "The request has more than one possible response and the client must choose between them. The server may indicate a preferred choice in the Location header but ultimately leaves the decision to the client.",
  },
  301: {
    message: "Moved Permanently",
    status_code: "301",
    description: "The requested resource has been permanently moved to a new URL given in the Location header. Browsers and search engines should update their links to use the new URL for all future requests.",
  },
  302: {
    message: "Found",
    status_code: "302",
    description: "The requested resource is temporarily located at a different URL given in the Location header. Unlike 301, clients and search engines should continue using the original URL for future requests.",
  },
  303: {
    message: "See Other",
    status_code: "303",
    description: "The server is redirecting the client to a different resource using a GET request specified in the Location header. Commonly used after a POST request to redirect to a confirmation or result page.",
  },
  304: {
    message: "Not Modified",
    status_code: "304",
    description: "The resource has not been modified since the version specified in the request headers. The client can safely use its cached version, saving bandwidth by not retransmitting the full response body.",
  },
  305: {
    message: "Use Proxy",
    status_code: "305",
    description: "The requested resource must be accessed through the proxy given in the Location header. This status code has been deprecated due to security concerns and is rarely used in modern web applications.",
  },
  307: {
    message: "Temporary Redirect",
    status_code: "307",
    description: "The requested resource is temporarily at a different URL and the client must use the same HTTP method for the redirect. Unlike 302, this guarantees the method will not change when following the redirect.",
  },
  308: {
    message: "Permanent Redirect",
    status_code: "308",
    description: "The requested resource has been permanently moved and the client must use the same HTTP method for all future requests. Unlike 301, the request method is not allowed to change when following the redirect.",
  },
 
  // ─── 4xx Client Errors ───────────────────────────────────────────────────
 
  400: {
    message: "Bad Request",
    status_code: "400",
    description: "The server cannot process the request due to malformed syntax, invalid framing, or deceptive routing. Common causes include invalid JSON, missing required fields, or incorrect data types in the request body.",
  },
  401: {
    message: "Unauthorized",
    status_code: "401",
    description: "The client must authenticate itself to get the requested response. This typically means the request is missing a valid authentication token or the provided credentials such as API key or JWT have expired.",
  },
  402: {
    message: "Payment Required",
    status_code: "402",
    description: "Reserved for future use but sometimes used when a user has exceeded their quota or needs to make a payment to access a resource. Commonly seen in API rate limiting and subscription-based services.",
  },
  403: {
    message: "Forbidden",
    status_code: "403",
    description: "The client does not have permission to access the requested resource even with valid authentication. Unlike 401, the server knows who the client is but has decided they are not allowed to access this resource.",
  },
  404: {
    message: "Not Found",
    status_code: "404",
    description: "The server cannot find the requested resource at the given URL. This may mean the URL is wrong, the resource has been deleted, or the server intentionally hides the resource for security reasons.",
  },
  405: {
    message: "Method Not Allowed",
    status_code: "405",
    description: "The HTTP method used in the request is not supported for the requested resource. For example, sending a DELETE request to an endpoint that only accepts GET and POST will result in this error.",
  },
  406: {
    message: "Not Acceptable",
    status_code: "406",
    description: "The server cannot produce a response matching the acceptable values defined in the request Accept headers. The server cannot send a response in the content type or language the client requested.",
  },
  407: {
    message: "Proxy Authentication Required",
    status_code: "407",
    description: "The client must first authenticate itself with the proxy server before the request can be fulfilled. Similar to 401 but authentication is required with the intermediate proxy rather than the origin server.",
  },
  408: {
    message: "Request Timeout",
    status_code: "408",
    description: "The server timed out waiting for the complete request from the client. The client may have been too slow sending the request body or there was a network interruption before the request was fully received.",
  },
  409: {
    message: "Conflict",
    status_code: "409",
    description: "The request conflicts with the current state of the server, such as trying to create a resource that already exists. Commonly returned when there is a duplicate entry or a version conflict in the data.",
  },
  410: {
    message: "Gone",
    status_code: "410",
    description: "The requested resource has been permanently deleted and will not be available again. Unlike 404, this explicitly tells the client that the resource used to exist but has been intentionally removed.",
  },
  411: {
    message: "Length Required",
    status_code: "411",
    description: "The server refuses to accept the request without a defined Content-Length header. The client must specify the size of the request body in the header before the server will process the request.",
  },
  412: {
    message: "Precondition Failed",
    status_code: "412",
    description: "One or more conditions specified in the request headers were evaluated as false by the server. Commonly used with conditional requests using headers like If-Match or If-Unmodified-Since.",
  },
  413: {
    message: "Content Too Large",
    status_code: "413",
    description: "The request body is larger than the server is willing or able to process. The server may close the connection or return a Retry-After header if the condition is temporary, such as during high traffic.",
  },
  414: {
    message: "URI Too Long",
    status_code: "414",
    description: "The URI requested by the client is longer than the server is willing to interpret. This can happen when query strings become excessively long, often due to GET requests that should have been POST requests.",
  },
  415: {
    message: "Unsupported Media Type",
    status_code: "415",
    description: "The server refuses to accept the request because the media type in the Content-Type header is not supported. Sending XML to an endpoint that only accepts application/json is a common cause of this error.",
  },
  416: {
    message: "Range Not Satisfiable",
    status_code: "416",
    description: "The range specified in the Range header of the request cannot be fulfilled. This occurs when the requested byte range falls outside the bounds of the actual size of the target resource.",
  },
  417: {
    message: "Expectation Failed",
    status_code: "417",
    description: "The server cannot meet the requirements of the Expect request-header field. This occurs when the client sends an Expect: 100-continue header but the server cannot or will not fulfill the expectation.",
  },
  418: {
    message: "I'm a Teapot",
    status_code: "418",
    description: "An April Fool's joke from RFC 2324 where the server refuses to brew coffee because it is a teapot. While humorous in origin, some APIs use this code to intentionally reject requests they consider invalid.",
  },
  421: {
    message: "Misdirected Request",
    status_code: "421",
    description: "The request was directed at a server that is not able to produce a response for the given combination of scheme and authority. The client may retry the request via a different connection or server.",
  },
  422: {
    message: "Unprocessable Content",
    status_code: "422",
    description: "The server understands the content type and syntax of the request but was unable to process the contained instructions. Commonly returned when form validation fails or business logic rules are violated.",
  },
  423: {
    message: "Locked",
    status_code: "423",
    description: "The resource being accessed is locked and cannot be modified at this time. Used in WebDAV to indicate that the source or destination resource is currently locked by another client or process.",
  },
  424: {
    message: "Failed Dependency",
    status_code: "424",
    description: "The request failed because it depended on another request that also failed. Used in WebDAV when a batch operation cannot complete because a prerequisite action within the same batch did not succeed.",
  },
  425: {
    message: "Too Early",
    status_code: "425",
    description: "The server is unwilling to risk processing a request that might be replayed. Used to protect against replay attacks when the client sends a request using early data before the TLS handshake is complete.",
  },
  426: {
    message: "Upgrade Required",
    status_code: "426",
    description: "The server refuses to perform the request using the current protocol but will accept it after the client upgrades. The server sends an Upgrade header indicating which protocol the client should switch to.",
  },
  428: {
    message: "Precondition Required",
    status_code: "428",
    description: "The server requires the request to be conditional to prevent lost updates. Used to force clients to check the current state of a resource before making changes, typically enforced via If-Match headers.",
  },
  429: {
    message: "Too Many Requests",
    status_code: "429",
    description: "The client has sent too many requests in a given amount of time and has been rate limited by the server. A Retry-After header is often included telling the client how long to wait before retrying.",
  },
  431: {
    message: "Request Header Fields Too Large",
    status_code: "431",
    description: "The server is unwilling to process the request because its header fields are too large. This can happen when cookies, authorization tokens, or custom headers accumulate to exceed the server's size limit.",
  },
  451: {
    message: "Unavailable For Legal Reasons",
    status_code: "451",
    description: "The server is denying access to the resource as a consequence of a legal demand such as a court order or DMCA takedown notice. The name is a reference to Ray Bradbury's novel Fahrenheit 451.",
  },
 
  // ─── 5xx Server Errors ───────────────────────────────────────────────────
 
  500: {
    message: "Internal Server Error",
    status_code: "500",
    description: "The server encountered an unexpected condition that prevented it from fulfilling the request. This is a generic catch-all error that usually indicates a bug, unhandled exception, or misconfiguration on the server.",
  },
  501: {
    message: "Not Implemented",
    status_code: "501",
    description: "The server does not support the functionality required to fulfill the request. Returned when the server does not recognize the request method or lacks the ability to process it for any resource.",
  },
  502: {
    message: "Bad Gateway",
    status_code: "502",
    description: "The server, while acting as a gateway or proxy, received an invalid response from the upstream server. Commonly occurs when a backend service is down, overloaded, or returning malformed responses.",
  },
  503: {
    message: "Service Unavailable",
    status_code: "503",
    description: "The server is currently unable to handle requests due to maintenance or being overloaded. This is a temporary condition and the server may include a Retry-After header indicating when it will recover.",
  },
  504: {
    message: "Gateway Timeout",
    status_code: "504",
    description: "The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server. Usually means the backend service is too slow or unreachable, causing the connection to time out.",
  },
  505: {
    message: "HTTP Version Not Supported",
    status_code: "505",
    description: "The server does not support the HTTP protocol version used in the request. The server should include a description of why that version is not supported and list the protocols it does accept.",
  },
  506: {
    message: "Variant Also Negotiates",
    status_code: "506",
    description: "The server has an internal configuration error where the chosen variant resource is itself configured to engage in content negotiation. This creates a circular reference that prevents a proper response.",
  },
  507: {
    message: "Insufficient Storage",
    status_code: "507",
    description: "The server is unable to store the representation needed to complete the request. This WebDAV status indicates the server has run out of disk space or storage quota to fulfill the current operation.",
  },
  508: {
    message: "Loop Detected",
    status_code: "508",
    description: "The server detected an infinite loop while processing a WebDAV request. This occurs when following redirects or bindings creates a circular reference that would never resolve without intervention.",
  },
  510: {
    message: "Not Extended",
    status_code: "510",
    description: "Further extensions to the request are required before the server can fulfill it. The server responds with information about what extensions are needed for the client to resubmit a valid request.",
  },
  511: {
    message: "Network Authentication Required",
    status_code: "511",
    description: "The client needs to authenticate to gain network access, such as agreeing to terms on a captive portal. Used by Wi-Fi hotspots and network gateways that require a login before allowing internet access.",
  },
 
};

  const handleAddHeader = () => {
    setHeaders((prevHeaders) => [...prevHeaders, { key: "", value: "" }]);
    console.log(`add Headers : `,headers);
  }

  const handleRemoveHeader = (index) => {
    setHeaders((prevHeaders) => prevHeaders.filter((_, i) => i !== index));
    console.log(`remove Headers : `,headers);
  }

  const handleHeaderChange = (index, field, value) => {
    console.log(`value :`,value)
    console.log(`change Headers : `,index, field, value);
    setHeaders((prevHeaders) =>
      prevHeaders.map((header, i) =>
        i === index ? { ...header, [field]: value.toString() } : header
      )
    );
  };

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const [status_color_code,setStatusColorCode] = useState({})
  const [status_message_text,setStatusMessageText] = useState("")
  const [status_message_statuscode,setStatusMessageStatuscode] = useState("")


  const status_ui = (status) => {

    if(status >= 200 && status < 300){
        setStatusMessageText(status_message[status])
        setStatusMessageStatuscode(status)
        setStatusColorCode({
            bg: "bg-emerald-500/10",
            text: "text-emerald-500",
            border: "border-emerald-500/20",
            message: "Ok",
        })
    }
    else{
        setStatusMessageText(status_message[status])
        setStatusMessageStatuscode(status)
        setStatusColorCode({
            bg: "bg-rose-500/10",
            text: "text-rose-500",
            border: "border-rose-500/20",
            message: "Error",
        })
    }
    
  }

      const handleSend = async () => {
        if (loading) return;

        setLoading(true);
        const startTime = Date.now();

        if (!url) {
          status_ui(400);
          setResponse({ status: "ERROR", status_message: "URL is required", time: "0 ms", size: "0 KB", data: ""});
          setLoading(false);
          return;
        }
        
        let queryParams = {};
        if(activeTab === "params"){
          queryParams = params.reduce((acc, { key, value }) => {
            if (key.trim()) acc[key.trim()] = value.trim();
            return acc;
            }, {});
        }

        let parsedBody;
        if (method !== "GET" && body) {

            parsedBody = JSON.parse(body);
          
        }

        try {
          const res = await axios({
            url,
            method,
            params: queryParams,
            headers: {
              ...headers,
              "Content-Type": "application/json",
            },
            data: parsedBody,
            validateStatus: () => true,
          });

          const data = res.data;
          const isEmpty = data === "" || data === null || data === undefined;

          setResponse({
            status: res.status,
            status_message: status_message[res.status] || "Unknown",
            time: `${Date.now() - startTime} ms`,
            size: isEmpty ? "0 KB" : `${(JSON.stringify(data).length / 1024).toFixed(2)} KB`,
            data: isEmpty ? null : data,
          });

          status_ui(res.status);

        } catch (error) {
          console.log(`error : `,error)
          setResponse({
            status: "NETWORK ERROR",
            status_message: "Failed",
            time: `${Date.now() - startTime} ms`,
            size: "0 KB",
            data: error.message,
          });

          status_ui(500);

        } finally {
          dispatch(setWorkspace({url, method}));
          dispatch(loadWorkspace());
          setLoading(false);
        }
      };   

  
  const handleAddParam = () => {
    setParams([...params, { key: '', value: '' }]);
  };

  const handleRemoveParam = (index) => {
    setParams(params.filter((_, i) => i !== index));
  };

  const handleParamChange = (index, field, value) => {
    const newParams = [...params];
    newParams[index][field] = value;
    setParams(newParams);
  };

  const getMethodColor = (m) => {
    switch(m) {
      case 'GET': return 'text-blue-500';
      case 'POST': return 'text-emerald-500';
      case 'PUT': return 'text-amber-500';
      case 'DELETE': return 'text-rose-500';
      case 'PATCH': return 'text-purple-500';
      default: return 'text-slate-500';
    }
  };

  // Helper function to beautifully format incoming JSON objects dynamcially
  const syntaxHighlight = (json) => {
    if (!json) return '';
    let jsonStr = typeof json !== 'string' ? JSON.stringify(json, undefined, 2) : json;
    jsonStr = jsonStr.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return jsonStr.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        let cls = 'text-amber-400 font-bold'; // number
        let value = match;
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'text-blue-500'; // key
                // remove quotes from keys for cleaner look 
                value = match.replace(/^"|":$/g, '') + '<span class="text-slate-500">:</span>';
            } else {
                cls = 'text-emerald-500'; // string
            }
        } else if (/true|false/.test(match)) {
            cls = 'text-purple-500'; // boolean
        } else if (/null/.test(match)) {
            cls = 'text-rose-400'; // null
        }
        return `<span class="${cls}">${value}</span>`;
    });
  };

  return (
    <div className={`w-full min-h-[calc(100vh-80px)] pt-6 pb-10 px-4 md:px-8 ${isLight ? 'bg-slate-50 text-slate-800' : 'bg-[#050505] text-slate-200'} font-sans transition-colors duration-500 flex justify-center`}>
      <div className={`w-full max-w-400 flex flex-col xl:flex-row gap-0 rounded-3xl overflow-hidden border ${isLight ? 'bg-white/80 border-slate-200 shadow-2xl shadow-slate-200/50' : 'bg-[#0a0f18]/90 border-slate-800 shadow-[0_0_50px_rgba(59,130,246,0.05)]'} backdrop-blur-xl transition-all duration-500`}>
        
        {/* Sidebar Collection View */}
        <div className={`w-full xl:w-72 flex border-r ${isLight ? 'border-slate-200 bg-slate-50/50' : 'border-slate-800/80 bg-[#0b101a]/50'} flex flex-col`}>
          <div className="p-5 border-b border-transparent">
            <h2 className={`font-bold text-xs tracking-widest uppercase ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>Workspace Memory</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
            {workspace.map((item, i) => {
              return (
                <div key={i} className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${item.id === activeWorkspace?.id ? (isLight ? 'bg-blue-50 text-blue-800 border-l-4 border-l-blue-500' : 'bg-blue-500/10 text-blue-300 border border-blue-500/20 border-l-4 border-l-blue-500') : (isLight ? 'hover:bg-slate-100/80 text-slate-600 border border-transparent border-l-4 border-l-transparent' : 'hover:bg-slate-800/40 text-slate-400 border border-transparent border-l-4 rounded border-l-transparent')}`} 
                onClick={() => {
                  dispatch(changeWorkspace(item.id))
                  dispatch(loadWorkspace())
                }}>
                  <div className="flex items-center gap-3 font-mono text-sm overflow-hidden">
                    <span className={`font-bold text-[11px] w-9 flex ${getMethodColor(item.method)}`}>{item.method}</span>
                    <span className="truncate">{item.url}</span>
                    <button className={`cursor-pointer w-10 h-10 shrink-0 p-3 rounded-xl border-2 flex justify-center items-center transition-colors ${isLight ? 'border-slate-200 text-slate-400 hover:text-rose-500 hover:bg-rose-50 hover:border-rose-200' : 'border-slate-800 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30'}`} onClick={() => {
                      dispatch(clearWorkspace(item.id))
                      dispatch(loadWorkspace())
                    }}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Workspace */}
        <div className="flex-1 flex flex-col min-h-[700px] mt-10">
          {/* Header & URL Action Bar */}
          <div className={`p-4 md:p-6 border-b flex ${isLight ? 'border-slate-200 bg-white/50' : 'border-slate-800/80 bg-slate-900/30'}`}>
            <div className={`flex w-full flex-col md:flex-row gap-2 md:gap-0 md:rounded-2xl border shadow-sm transition-colors ${isLight ? 'bg-white border-slate-200 shadow-slate-200/50' : 'bg-[#0d131c] border-slate-700/60 focus-within:border-blue-500/50'} rounded-2xl md:p-1.5`}>
              <div className={`flex items-center px-4 py-2 md:rounded-xl font-bold text-sm border-r border-transparent ${isLight ? 'bg-slate-100 text-slate-700' : 'bg-slate-800 text-slate-300'} md:mr-1`}>
                <select 
                  className="bg-transparent outline-none cursor-pointer appearance-none pr-4 font-mono font-bold tracking-wide"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                  <option value="PATCH">PATCH</option>
                </select>
              </div>
              <input 
                type="text" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter request endpoint URL..." 
                className={`flex-1 bg-transparent px-4 py-3 md:py-2 outline-none font-mono text-sm w-full transition-colors ${isLight ? 'placeholder-slate-400 text-slate-700' : 'placeholder-slate-600 text-slate-300'}`}
              />
              <button 
                onClick={handleSend}
                disabled={loading}
                className="mx-1 md:mx-0 px-8 py-3 md:py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-semibold text-sm transition-all duration-300 shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_20px_rgba(79,70,229,0.5)] transform hover:-translate-y-0.5 flex items-center justify-center gap-2 mt-2 md:mt-0"
              >
                {loading ? (
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : (
                  <>
                    <span>Send Protocol</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Settings & Execution Visualizer */}
          <div className="flex-1 flex flex-col xl:flex-row overflow-hidden min-h-0">
            
            {/* Request Settings Tab */}
            <div className={`w-full xl:w-1/2 border-r flex flex-col min-h-0 ${isLight ? 'border-slate-200' : 'border-slate-800/80'}`}>
              <div className={`flex px-2 border-b ${isLight ? 'border-slate-200 bg-slate-50/30' : 'border-slate-800/80 bg-slate-950/40'}`}>
                {['Params', 'Headers', 'Body', 'Auth'].map(tab => (
                  <button 
                    key={tab} 
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`px-6 py-3.5 text-sm font-semibold transition-colors border-b-2 ${activeTab === tab.toLowerCase() ? 'border-blue-500 text-blue-500' : `border-transparent ${isLight ? 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/50' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'}`}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-transparent min-h-0">
                {activeTab === 'params' && (
                  <div className="params-container space-y-3">
                    {params.map((param, index) => (
                      <div key={index} className="grid grid-cols-12 gap-3 items-center">
                        <input type="text" placeholder="Key" className={`col-span-12 md:col-span-5 px-4 py-3 rounded-xl border-2 font-mono text-sm bg-transparent outline-none focus:border-blue-500 transition-colors ${isLight ? 'border-slate-200 placeholder-slate-400' : 'border-slate-800 placeholder-slate-600 focus:bg-slate-800/30'} focus:shadow-[0_0_10px_rgba(59,130,246,0.1)]`} defaultValue={param.key} onChange={(e) => handleParamChange(index, 'key', e.target.value)}/>
                        <input type="text" placeholder="Value" className={`col-span-12 md:col-span-6 px-4 py-3 rounded-xl border-2 font-mono text-sm bg-transparent outline-none focus:border-blue-500 transition-colors ${isLight ? 'border-slate-200 placeholder-slate-400' : 'border-slate-800 placeholder-slate-600 focus:bg-slate-800/30'} focus:shadow-[0_0_10px_rgba(59,130,246,0.1)]`} defaultValue={param.value} onChange={(e) => handleParamChange(index, 'value', e.target.value)}/>
                        <button className={`w-10 h-10 shrink-0 p-3 rounded-xl border-2 flex justify-center items-center transition-colors ${isLight ? 'border-slate-200 text-slate-400 hover:text-rose-500 hover:bg-rose-50 hover:border-rose-200' : 'border-slate-800 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30'}`} onClick={() => handleRemoveParam(index)}>
                          <svg className="w-4 h-4 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                      </div>
                    ))}
                    <div className="grid grid-cols-12 gap-3 items-center opacity-70 hover:opacity-100 transition-opacity">
                      <button className={`w-10 h-10 shrink-0 p-3 rounded-xl border-2 flex justify-center items-center transition-colors ${isLight ? 'border-slate-200 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 hover:border-emerald-200' : 'border-slate-800 text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/30'}`} onClick={() => handleAddParam()}>
                        <svg className="w-4 h-4 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
                      </button>
                    </div>
                  </div>
                )}
                {activeTab === 'body' && (
                  <div className={`w-full h-full rounded-2xl border-2 p-5 font-mono text-sm focus-within:border-blue-500 transition-all min-h-0 ${isLight ? 'border-slate-200 bg-white shadow-inner' : 'border-slate-800 bg-[#0d131c]'}`}>
                    <textarea
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      className={`w-full h-full bg-transparent outline-none resize-none ${isLight ? 'text-slate-700' : 'text-slate-300'}`}
                      placeholder="{\n  &quot;key&quot;: &quot;value&quot;\n}"
                      spellCheck="false"
                      defaultValue={`{\n  "email": "developer@apiflow.com",\n  "password": "hashed_pwd_secret"\n}`}
                    ></textarea>
                  </div>
                )}
                {(activeTab === 'headers') && (
                  <div className="headers-container grid grid-row-3 gap-3 w-full">
                      {headers.map((header, index) => (
                      <div key={index} className="grid grid-cols-3 col-span-12 md:grid-cols-3 gap-3">
                        <Select className={`col-span-1 ${isLight ? 'border-slate-200 placeholder-slate-400' : 'border-slate-800 placeholder-slate-600'}` } placeholder="Select a Header" aria-label="Select a Header" selectedKey={header.key || null} onSelectionChange={(key) => handleHeaderChange(index, 'key', key)}>
                            <Select.Trigger className={`${isLight ? 'border-slate-200 placeholder-slate-400 bg-white text-slate-700' : 'border-slate-800 placeholder-slate-600 bg-[#0d131c] text-slate-300'}`}>
                              <Select.Value />
                              <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover className={`${isLight ? 'border-slate-200 placeholder-slate-400 bg-white text-slate-700' : 'border-slate-800 placeholder-slate-600 bg-[#0d131c] text-slate-300'}`}>
                              <ListBox className={`${isLight ? 'border-slate-200 placeholder-slate-400 bg-white text-slate-700' : 'border-slate-800 placeholder-slate-600 bg-[#0d131c] text-slate-300'} `}>
                                {headerPresets.map((header_list, groupIndex) => (
                                  <ListBox.Section key={groupIndex}>
                                    <Header slot="title">{header_list.category}</Header>  
                                    {header_list.headers.map((innerheader, itemIndex) => (
                                      <ListBox.Item
                                        className={`${isLight ? 'border-slate-200 placeholder-slate-400 bg-white text-slate-700 hover:bg-slate-200/30' : 'border-slate-800 placeholder-slate-600 bg-[#0d131c] text-slate-300 hover:bg-slate-800/30'}`}
                                        key={`${groupIndex}-${itemIndex}`}
                                        id={innerheader.key} 
                                        textValue={innerheader.key}
                                        onchange={(key) => handleHeaderChange(index, 'key', key)}
                                      >
                                        {innerheader.key}
                                        <ListBox.ItemIndicator />
                                      </ListBox.Item>
                                    ))}
                                  </ListBox.Section>
                                ))}
                              </ListBox>
                            </Select.Popover>
                          </Select>
                    <input type="text" placeholder="Value" className={`col-span-1 p-2 rounded-xl border-2 font-mono text-sm bg-transparent outline-none focus:border-blue-500 transition-colors ${isLight ? 'border-slate-200 placeholder-slate-400' : 'border-slate-800 placeholder-slate-600 focus:bg-slate-800/30'} focus:shadow-[0_0_10px_rgba(59,130,246,0.1)]`} defaultValue={header.value} onChange={(e) => handleHeaderChange(index, 'value', e.target.value)}/>
                    <button className={`w-10 h-10 shrink-0 p-3 rounded-xl border-2 flex justify-center items-center transition-colors ${isLight ? 'border-slate-200 text-slate-400 hover:text-rose-500 hover:bg-rose-50 hover:border-rose-200' : 'border-slate-800 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30'}`} onClick={() => handleRemoveHeader(index)}>
                      <svg className="w-4 h-4 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                    </div>
                      ))}
                    <div className="grid grid-cols-12 gap-3 items-center opacity-70 hover:opacity-100 transition-opacity">
                      <button className={`w-10 h-10 shrink-0 p-3 rounded-xl border-2 flex justify-center items-center transition-colors ${isLight ? 'border-slate-200 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 hover:border-emerald-200' : 'border-slate-800 text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/30'}`} onClick={() => handleAddHeader()}>
                        <svg className="w-4 h-4 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
                      </button>
                    </div>
                  </div>
                )}
                {(activeTab === 'auth') && (
                  <div className="auth-container space-y-3">
                    {auth.map((auth, index) => (
                      <div key={index} className="grid grid-cols-12 gap-3 items-center">
                        <input type="text" placeholder="Key" className={`col-span-12 md:col-span-5 px-4 py-3 rounded-xl border-2 font-mono text-sm bg-transparent outline-none focus:border-blue-500 transition-colors ${isLight ? 'border-slate-200 placeholder-slate-400' : 'border-slate-800 placeholder-slate-600 focus:bg-slate-800/30'} focus:shadow-[0_0_10px_rgba(59,130,246,0.1)]`} defaultValue={auth.key} onChange={(e) => handleAuthChange(index, 'key', e.target.value)}/>
                        <input type="text" placeholder="Value" className={`col-span-12 md:col-span-6 px-4 py-3 rounded-xl border-2 font-mono text-sm bg-transparent outline-none focus:border-blue-500 transition-colors ${isLight ? 'border-slate-200 placeholder-slate-400' : 'border-slate-800 placeholder-slate-600 focus:bg-slate-800/30'} focus:shadow-[0_0_10px_rgba(59,130,246,0.1)]`} defaultValue={auth.value} onChange={(e) => handleAuthChange(index, 'value', e.target.value)}/>
                        <button className={`w-10 h-10 shrink-0 p-3 rounded-xl border-2 flex justify-center items-center transition-colors ${isLight ? 'border-slate-200 text-slate-400 hover:text-rose-500 hover:bg-rose-50 hover:border-rose-200' : 'border-slate-800 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30'}`} onClick={() => handleRemoveAuth(index)}>
                          <svg className="w-4 h-4 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                      </div>
                    ))}
                    <div className="grid grid-cols-12 gap-3 items-center opacity-70 hover:opacity-100 transition-opacity">
                      <button className={`w-10 h-10 shrink-0 p-3 rounded-xl border-2 flex justify-center items-center transition-colors ${isLight ? 'border-slate-200 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 hover:border-emerald-200' : 'border-slate-800 text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/30'}`} onClick={() => handleAddAuth()}>
                        <svg className="w-4 h-4 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Realtime API Response Visualizer */}
            <div className={`w-full xl:w-2/3 flex flex-col relative min-h-0 ${isLight ? 'bg-slate-50/50' : 'bg-[#0a0f18]/30'}`}>
              <div className={`flex justify-between items-center px-6 py-3 border-b shrink-0 ${isLight ? 'border-slate-200 bg-slate-100/30' : 'border-slate-800/80 bg-slate-950/20'}`}>
                <h3 className="text-sm font-semibold tracking-wide flex items-center gap-1 w-1/3">
                   <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                   Transmission Response
                </h3>
                {response && (
                  <div className="flex gap-1 items-start justify-center">
                    <span className={`px-3 py-1 rounded-md ${status_color_code.bg} ${status_color_code.text} ${status_color_code.border} text-xs font-bold tracking-widest uppercase`}>
                      <Tooltip delay={0}>
                        <Tooltip.Trigger className={`cursor-pointer hover:opacity-80 transition-opacity`}>
                          {status_message_statuscode} {status_message_text?.message}
                        </Tooltip.Trigger>
                        <Tooltip.Content showArrow placement="bottom" className={`${isLight ? 'bg-slate-50/50' : 'bg-[#0a0f18]/30'} ${status_color_code.text} ${status_color_code.border} border-2`}>
                          <div className="max-w-xs px-1 py-1.5">
                            <p className="mb-1 font-semibold">{status_message_statuscode} {status_message_text?.message}</p>
                            <p className="text-sm text-muted">
                              {status_message_text?.description}
                            </p>
                          </div>
                        </Tooltip.Content>
                      </Tooltip>
                      </span>
                    <span className={`text-xs font-mono font-medium px-2 py-1 rounded border ${isLight ? 'text-slate-500 border-slate-200 bg-white' : 'text-slate-400 border-slate-700 bg-slate-800'}`}>{response.time}</span>
                    <span className={`text-xs font-mono font-medium px-2 py-1 rounded border ${isLight ? 'text-slate-500 border-slate-200 bg-white' : 'text-slate-400 border-slate-700 bg-slate-800'}`}>{response.size}</span>
                  </div>
                )}
              </div>
              <div className="flex-1 overflow-y-auto p-4 md:p-6 relative min-h-0">
                {!response && !loading && (
                   <div className="absolute inset-0 flex flex-col items-center justify-center opacity-60">
                    <div className="relative">
                       <div className={`absolute inset-0 rounded-full blur-xl mix-blend-multiply opacity-20 ${isLight ? 'bg-blue-400' : 'bg-blue-600'}`}></div>
                       <div className={`relative w-24 h-24 rounded-full flex items-center justify-center mb-6 border-2 border-dashed ${isLight ? 'bg-slate-100 text-slate-400 border-slate-300' : 'bg-slate-800/50 text-slate-500 border-slate-700'}`}>
                         <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                       </div>
                    </div>
                    <p className={`text-lg font-bold mb-2 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>Ready to Transmit</p>
                    <p className={`text-sm ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Configure your request and hit Send to analyze protocols.</p>
                  </div>
                )}
                {loading && (
                   <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                      <p className={`mt-6 text-sm font-mono tracking-widest uppercase font-bold animate-pulse ${isLight ? 'text-blue-500' : 'text-blue-400'}`}>Handshaking...</p>
                   </div>
                )}
                {response && !loading && (
                  <div className={`w-full h-fit min-h-full rounded-2xl border-2 p-5 md:p-6 font-mono text-[13px] md:text-[14px] leading-relaxed shadow-inner overflow-auto ${isLight ? 'bg-white text-slate-800 border-slate-200' : 'bg-[#0d131c] text-white border-slate-800'} transition-all`}>
                    <pre className="whitespace-pre-wrap break-all md:wrap-break-word">
                      <code dangerouslySetInnerHTML={{ __html: syntaxHighlight(response.data) }}>
                      </code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
            
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Api;