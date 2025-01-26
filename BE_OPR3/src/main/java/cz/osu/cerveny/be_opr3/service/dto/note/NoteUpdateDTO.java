package cz.osu.cerveny.be_opr3.service.dto.note;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Data
@Validated
public class NoteUpdateDTO {
    @NotBlank(message = "Title is mandatory")
    private String title;
    @NotBlank(message = "Text is mandatory")
    private String text;
    @NotNull(message = "Importancy is mandatory")
    private Integer importancy;
    private List<Long> topicIds;
}
