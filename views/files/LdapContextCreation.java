/**
 * Description				-		This class contains LDAP Authentication Code for CDAC environment and Searching user details from LDAP Server.
 */

import java.util.Hashtable;

import javax.naming.AuthenticationException;
import javax.naming.AuthenticationNotSupportedException;
import javax.naming.Context;
import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.directory.Attributes;
import javax.naming.directory.DirContext;
import javax.naming.directory.InitialDirContext;
import javax.naming.directory.SearchControls;
import javax.naming.directory.SearchResult;

import org.apache.log4j.Logger;

public class LdapContextCreation {
	// Class Variables
	private static Logger LOGGER = Logger.getLogger(LdapContextCreation.class);
	final String ldapAdServer = "ldap://central.ds.cdac.in:389";
	final String ldapSearchBase = "dc=cdac,dc=in"; // the name of the context or object to search
	
	public boolean getLdap(String userName, String password){
	LOGGER.info("Inside LDAP Method");
	
	String getUid = getUserID(userName);
	// User Authentication LDAP Binding Variables
	final String ldapUsername = "uid="+getUid+",ou=People,dc=pn,ou=User,dc=cdac,dc=in";
	final String ldapPassword = password;
	boolean b=false;
	System.out.println(userName + " - " + password);
	
	Hashtable<String, Object> env = new Hashtable<String, Object>();
	env.put(Context.SECURITY_AUTHENTICATION, "simple");
	System.out.println("LDAPUserName "+ldapUsername);
	if(ldapUsername != null) {
		LOGGER.info("INSIDE LDAPUSERNAME IF");
		env.put(Context.SECURITY_PRINCIPAL, ldapUsername);
	}
	if(ldapPassword != null) {
		env.put(Context.SECURITY_CREDENTIALS, ldapPassword);
	}
	env.put(Context.INITIAL_CONTEXT_FACTORY,"com.sun.jndi.ldap.LdapCtxFactory");
	env.put(Context.PROVIDER_URL, ldapAdServer);
	
	// will be returned as a byte[] instead of a String
	env.put("java.naming.ldap.attributes.binary", "objectSID");
	// the following is helpful in debugging errors
    env.put("com.sun.jndi.ldap.trace.ber", System.err);
	// the following is helpful in debugging errors
	try {
		// Create initial context
		DirContext ctx = new InitialDirContext(env);
		
		// Close the context when we're done
		b = true;
		ctx.close();
	}catch (AuthenticationNotSupportedException ex) {
	    System.out.println("The authentication is not supported by the server");
	} catch (AuthenticationException ex) {
	    System.out.println("Incorrect Credentials or Distinguished Name");
	} catch (NamingException e){
		e.printStackTrace();
		b = false;
	}
		System.out.println("Value Bool of getLdap Method " + b);
		return b;
	}
	
	public String getUserID(String userName){
		if(userName.matches("\\d+")){ // \\d+ indicates digits {0-9} more than one digit
			return userName;
		}else{
	        final Hashtable<String, Object> env = new Hashtable<String, Object>();  
	        env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");  
	        env.put(Context.PROVIDER_URL, ldapAdServer);  
	        String uid=null;  
	        try{  
		        DirContext ctx = new InitialDirContext(env);  
		        // the filter expression to use for the search; may not be null
		        String filter = "(username="+userName+")"; // Enter User ID here.   
		        String[] attrIDs = {"uid","cn","mail"}; // Enter list of attributes to retrieve from LDAP here  
		        
		        //  Search controls that control the search. If null, the default search controls are used 
		        SearchControls ctls = new SearchControls();  
	            ctls.setSearchScope(SearchControls.SUBTREE_SCOPE);  
	            ctls.setReturningAttributes(attrIDs);  
	            
	            // Searches in the named context or object for entries that satisfy the given search filter. 
	            // Performs the search as specified by the search controls.
	            NamingEnumeration<SearchResult> answer = ctx.search(ldapSearchBase, filter, ctls);  
	            // LDAP Attributes to retrieve from LDAP Server central.ds.cdac.in / 10.208.0.146
	            SearchResult searchResult = null;  
	            String cn=null;  
	            String mail=null;  
	  
	            while (answer.hasMore()) { 
	                searchResult = (SearchResult) answer.next();  
	                Attributes attr = searchResult.getAttributes();  
	                cn=attr.get("cn").get(0).toString();  
	                uid=attr.get("uid").get(0).toString();  
	                mail=attr.get("mail").get(0).toString();  
	                  
	                System.out.println("Name: "+cn);  
	                System.out.println("User ID: "+uid);  
	                System.out.println("E-mail Address: "+mail);       
	             }  
	        	} catch (Exception e) {  
	        		e.printStackTrace();  
	        	}
	        System.out.println("UID: "+uid);
			return uid;
		}
	}
}