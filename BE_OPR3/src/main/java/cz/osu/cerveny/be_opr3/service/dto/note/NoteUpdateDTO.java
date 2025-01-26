package cz.osu.cerveny.be_opr3.service.dto.note;


import lombok.Data;

import java.util.List;

@Data
public class NoteUpdateDTO {
    private String title;
    private String text;
    private Integer importancy;
    private List<Long> topicIds;
}
