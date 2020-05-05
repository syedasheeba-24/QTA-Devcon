package com.project;

import org.apache.catalina.Context;
import org.apache.catalina.startup.Tomcat;
import org.apache.tomcat.util.descriptor.web.ContextEnvironment;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.embedded.tomcat.TomcatWebServer;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
//public class FormsApplication extends SpringBootServletInitializer {

public class FormsApplication {

	public static void main(String[] args) {
		SpringApplication.run(FormsApplication.class, args);
	}

	/*@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return builder.sources(FormsApplication.class);
	}*/

	@Bean
	public TomcatServletWebServerFactory tomcatFactory() {
		return new TomcatServletWebServerFactory() {

			@Override
			protected TomcatWebServer getTomcatWebServer(Tomcat tomcat) {
				tomcat.enableNaming();
				return super.getTomcatWebServer(tomcat);
			}

			@Override
			protected void postProcessContext(Context context) {
				ContextEnvironment contextEnv1 = new ContextEnvironment();
				contextEnv1.setName("com/cerner/cloud/idm/idp/SubjectProviderCookieExpiration");
				contextEnv1.setType("java.lang.Integer");
				contextEnv1.setValue("30");

				ContextEnvironment contextEnv2 = new ContextEnvironment();
				contextEnv2.setName("com/cerner/cloud/idm/idp/SubjectProviderCookieName");
				contextEnv2.setType("java.lang.String");
				contextEnv2.setValue("calmsubject");

				ContextEnvironment contextEnv3 = new ContextEnvironment();
				contextEnv3.setName("com/cerner/cloud/idm/idp/SubjectProviderSigningKey");
				contextEnv3.setType("java.lang.String");
				contextEnv3.setValue("jhlkjh");

				context.getNamingResources().addEnvironment(contextEnv1);
				context.getNamingResources().addEnvironment(contextEnv2);
				context.getNamingResources().addEnvironment(contextEnv3);

				super.postProcessContext(context);
			}

		};
	}

}
