package com.defesacivil.api.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.defesacivil.api.security.JWTAuthenticationFilter;
import com.defesacivil.api.security.JWTAuthorizationFilter;
import com.defesacivil.api.security.JWTUtil;

import io.jsonwebtoken.lang.Arrays;
@Configuration
@EnableWebSecurity      // CLASSE DE DEFINIÇÃO DE SEGURANÇA
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter{
	@Autowired
	private UserDetailsService userDetailsService;
	
   
    
	@Autowired
	private 
	JWTUtil jwtUtil;
	
// aqui é declarado o que está liberado sem autenticação
	private static final  String[] 	PUBLIC_MATCHERS = {
			//"/users/forgot/**"
	};
	//só libera através do comando get sem precisar de autenticação
	private static final  String[] 	PUBLIC_MATCHERS_GET = {
			"/só_comando_get/**"
	};
	private static final  String[] 	PUBLIC_MATCHERS_POST = {
			"/users/forgot/**"
			
			
			//implementação do ENDPOINT do cadastro via mobile
	};
	
	
	@Override// para o que tiver dentro do array "PUBLIC_MATCHES" será permitido, de resto será bloqueado
	protected void configure (HttpSecurity http) throws Exception{
	/*	if (Arrays.asList(env.getActiveProfiles()).contains("test")) {
            http.headers().frameOptions().disable();
		}*/
		
		http.cors().and().csrf().disable();
	
		http.authorizeRequests()
		.antMatchers(HttpMethod.GET, PUBLIC_MATCHERS_POST).permitAll()
		.antMatchers(HttpMethod.GET, PUBLIC_MATCHERS_GET).permitAll()
		.antMatchers(PUBLIC_MATCHERS).permitAll()
		.anyRequest().authenticated();
		http.addFilter(new JWTAuthenticationFilter(authenticationManager(), jwtUtil));
		http.addFilter(new JWTAuthorizationFilter(authenticationManager(), jwtUtil, userDetailsService));
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS); // não cria sessão
		
	}	
	
	@Override
	public void configure(AuthenticationManagerBuilder auth) throws Exception{
		auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder());
	}
	
    @Bean
	CorsConfigurationSource corsConfigurationSource() {
	final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

	CorsConfiguration config = new CorsConfiguration().applyPermitDefaultValues();
	config.addAllowedHeader("Authorization");
	config.addExposedHeader("Authorization");
	config.addAllowedOrigin("*");
	config.addAllowedMethod(HttpMethod.PUT);
	config.addAllowedMethod(HttpMethod.GET);
	config.addAllowedMethod(HttpMethod.DELETE);
	config.addAllowedMethod(HttpMethod.POST);

	source.registerCorsConfiguration("/**", config);
	return source;
	  }
	
	@Bean //gera o cógido apartir da senha
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
