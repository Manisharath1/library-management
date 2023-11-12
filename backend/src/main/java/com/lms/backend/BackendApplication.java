package com.lms.backend;

import java.io.File;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

@SpringBootApplication
@EnableMongoAuditing
@OpenAPIDefinition(info = @Info(title = "Library Management", version = "v1", description = "Manage library system"))
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner() {
		return args -> {
			String locations[] = { "library", "library/user", "library/book" };

			for (String location : locations) {
				createLocation(new File(location));
			}
		};
	}

	private void createLocation(File file) {
		try {
			file.mkdir();
		} catch (Exception e) {
			throw new RuntimeException("File creation problem");
		}
	}
}
