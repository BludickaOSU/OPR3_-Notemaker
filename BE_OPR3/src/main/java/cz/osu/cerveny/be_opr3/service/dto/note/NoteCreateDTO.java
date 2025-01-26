package cz.osu.cerveny.be_opr3.service.dto.note;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class NoteCreateDTO {
    private String title;
    private String text;
    private String expirationDate;


}
