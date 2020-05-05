package com.project;

import javax.servlet.ServletException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.cerner.cloud.idm.idp.rp.AuthenticationFilter;
import com.cerner.cloud.idm.idp.rp.ForcedAuthenticationFilter;
import com.cerner.cloud.idm.idp.rp.RelyingPartyEndpoint;

@Configuration
public class WebConfiguration extends WebMvcConfigurerAdapter {

	@Autowired
	CustomInterceptor customInterceptor;

	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/{spring:\\w+}").setViewName("forward:/");
		registry.addViewController("/**/{spring:\\w+}").setViewName("forward:/");
		registry.addViewController("/{spring:\\w+}/**{spring:?!(\\.js|\\.css)$}").setViewName("forward:/");
	}

	@Bean
	public ServletRegistrationBean getAuthServer() throws ServletException {
		ServletRegistrationBean regBean = new ServletRegistrationBean(new RelyingPartyEndpoint(), "/openid");
		regBean.addInitParameter("com/cerner/cloud/idm/idp/rp/openidurl", "https://associates.devcerner.com/accounts/");

		return regBean;
	}
	
	 @Bean
	    public FilterRegistrationBean getAuthFilter() {
	        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
	        filterRegistrationBean.setName("AuthenticationFilter");
	        filterRegistrationBean.setFilter(new AuthenticationFilter());
	        filterRegistrationBean.addUrlPatterns("/");
	        filterRegistrationBean.addUrlPatterns("");
	        filterRegistrationBean.setOrder(1);
	        return filterRegistrationBean;

	    }

	    @Bean
	    public FilterRegistrationBean getForcedAuthFilter() {
	        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
	        filterRegistrationBean.setName("ForcedAuthenticationFilter");
	        filterRegistrationBean.setFilter(new ForcedAuthenticationFilter());
	        filterRegistrationBean.addUrlPatterns("/");
	        filterRegistrationBean.addUrlPatterns("");
	        filterRegistrationBean.addInitParameter("ExcludeURI", "/openid,/images,/logout");
	        filterRegistrationBean.setOrder(2);
	        return filterRegistrationBean;
	    }

	    @Override
	    public void addInterceptors(InterceptorRegistry registry) {
	        registry.addInterceptor(customInterceptor);
	    }
}
