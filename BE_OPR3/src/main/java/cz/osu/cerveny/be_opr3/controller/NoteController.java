package cz.osu.cerveny.be_opr3.controller;

import cz.osu.cerveny.be_opr3.service.NoteService;
import cz.osu.cerveny.be_opr3.service.dto.note.NoteCreateDTO;
import cz.osu.cerveny.be_opr3.service.dto.note.NoteDTO;
import cz.osu.cerveny.be_opr3.service.dto.note.NoteUpdateDTO;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/notes")
@RequiredArgsConstructor
@Tag(name = "NOTES", description = "Operations about notes")

public class NoteController {

    private final NoteService noteService;

    @GetMapping
    public Page<NoteDTO> getAllNotes(Pageable pageable){
        return noteService.getAllNotes(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NoteDTO> getNote(@PathVariable Long id){
        return ResponseEntity.ok(noteService.getNote(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        noteService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<NoteDTO> create(@RequestBody NoteCreateDTO noteCreateDTO){
        return ResponseEntity.ok(noteService.create(noteCreateDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<NoteDTO> update(@PathVariable Long id, @RequestBody NoteUpdateDTO noteUpdateDTO){
        return ResponseEntity.ok(noteService.update(id, noteUpdateDTO));
    }
}
