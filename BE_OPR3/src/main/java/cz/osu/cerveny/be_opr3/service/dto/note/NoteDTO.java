package cz.osu.cerveny.be_opr3.service.dto.note;

import cz.osu.cerveny.be_opr3.service.dto.topic.TopicDTO;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Data
@Validated
public class NoteDTO {
    @NotNull
    private Long id;
    @NotBlank
    private String title;
    @NotBlank
    private String text;
    @NotNull
    private Integer importancy;
    private List<TopicDTO> topics;
    @NotBlank
    private String createdDate;
    @NotBlank
    private String expirationDate;


}
