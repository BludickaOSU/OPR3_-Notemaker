package cz.osu.cerveny.be_opr3.service;

import cz.osu.cerveny.be_opr3.service.dto.note.NoteCreateDTO;
import cz.osu.cerveny.be_opr3.service.dto.note.NoteDTO;
import cz.osu.cerveny.be_opr3.service.dto.note.NoteUpdateDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface NoteService {

    void delete(Long id);
    NoteDTO getNote(Long id);
    Page<NoteDTO> getAllNotes(Pageable pageable);
    NoteDTO create(NoteCreateDTO noteCreateDTO);
    NoteDTO update(Long id, NoteUpdateDTO noteUpdateDTO);


}
