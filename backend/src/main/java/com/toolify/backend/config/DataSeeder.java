package com.toolify.backend.config;

import com.toolify.backend.model.Tool;
import com.toolify.backend.service.ToolService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataSeeder {

    @Bean
    public CommandLineRunner seedDatabase(ToolService toolService) {
        return args -> {
            try {
                List<Tool> existingTools = toolService.getAllTools();
                if (existingTools.isEmpty()) {
                    System.out.println("No tools found in Firestore. Seeding initial data...");

                    Tool t1 = new Tool("MK-0912", "Makita Impact Driver", "18V LITHIUM-ION / BRUSHLESS", "available", 
                            "https://lh3.googleusercontent.com/aida-public/AB6AXuClHw_e6WhgrGEw-fxyRlPoaotFGXrhwE5vb48OtuFaxUJJLHfJETJmkE9xICuBWiwa4lJTiuZlXhk-9O-aN4UKry1AjJWlWgGsOoVqzf7hIi9BsBAZ7A7pXmgbmZT9LMMDajiA8TXjCdAnPZQTo-0Rsh-2cu_pnKs6KtiY6RbNMlNoEqZLqn60DkYA-qLv_kWzpoMynMDWvwOOBvuqkeRD0ZkAXFjWaERXjdLmC7RJFLf-r6FFKe9AZ21kwIqjnJ7uRZKyO3HXph4");
                    t1.setCategory("Heavy Duty // Cordless");
                    t1.setSerialId("8829-MK-90");
                    toolService.createTool(t1);

                    Tool t2 = new Tool("DW-4401", "DeWalt Miter Saw", "12-INCH / COMPOUND SLIDE", "in_use", 
                            "https://lh3.googleusercontent.com/aida-public/AB6AXuDKwegRN0Eh6CA7ICEEFusCfNXmTnKMe2s216vNkHGxRX4SwhhFk_kuS_iQY8miD2ADto4J7JYQvZiCqECMTE7agr3fHVhISCKay43sG8aWg0Tqs16msee5Ars6TkRBjCvdzuoFKGhiooCbCgsVnF5wHBr3j-bEBiOVjMYNylEbxPP_S4roIVtGPannlaq6IkBETBUqtPMmw1uBinhXhS3mfjqlyAPCXtMMQQqwhYQ5sQ3dxuekztVrfujV-KpkjXUd1yk7wR5XSt8");
                    t2.setBorrower("OPERATOR_12");
                    t2.setLockedUntil("09/24");
                    toolService.createTool(t2);

                    Tool t3 = new Tool("BS-2209", "Bosch Rotary Hammer", "SDS-PLUS / 8.0 AMP", "available", 
                            "https://lh3.googleusercontent.com/aida-public/AB6AXuBn7ToLmouPkdUNYsMoEu_xIydi4kwnXs0-1CS-82Wr5QlQgUffjduZzntimJGOP9HHTHhz8gIxjUSkS0Kjgfet0cBhKdVGQCEMNQHbFuNHCLRPhQHcv9UeWfFs55p0KKn5Cra7E2Ne2syB0XJ6E2Z-lvulUyIDAnqGINC4vSJVgdVhvC-bzKSVWSRilpBP5UdsCyQJCn6xS59ZivkYMAjVZCHg6W2--XJWztyYZSgQuBoj_Dva4QWvPTLV72aiQz-MBjY3x5JkCEw");
                    t3.setCategory("Heavy Duty");
                    toolService.createTool(t3);

                    System.out.println("Seeding complete.");
                } else {
                    System.out.println("Database already populated. Skipping seeder.");
                }
            } catch (Exception e) {
                System.err.println("Database connection error or no credentials loaded. Skipping seeding.");
                e.printStackTrace();
            }
        };
    }
}
