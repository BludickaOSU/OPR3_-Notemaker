package cz.osu.cerveny.be_opr3.service.dto.note;

import cz.osu.cerveny.be_opr3.service.dto.topic.TopicDTO;
import lombok.Data;

import java.util.List;

@Data
public class NoteDTO {
    private Long id;
    private String title;
    private String text;
    private Integer importancy;
    private List<TopicDTO> topics;
    private String createdDate;
    private String expirationDate;


}
