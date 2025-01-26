package cz.osu.cerveny.be_opr3.service.dto.topic;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.validation.annotation.Validated;

@Data
@Validated
public class TopicCreateUpdateDTO {
    @NotBlank(message = "The name must not be blank")
    private String name;
    @NotBlank(message = "The description must not be blank")
    private String description;
}
