package cz.osu.cerveny.be_opr3.service.dto.topic;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.validation.annotation.Validated;

@Data
@Validated
public class TopicDTO {
    @NotNull
    private Long id;
    @NotBlank
    private String name;
    @NotBlank
    private String description;

}
