package cz.osu.cerveny.be_opr3.controller;

import cz.osu.cerveny.be_opr3.service.NoteService;
import cz.osu.cerveny.be_opr3.service.dto.note.NoteCreateDTO;
import cz.osu.cerveny.be_opr3.service.dto.note.NoteDTO;
import cz.osu.cerveny.be_opr3.service.dto.note.NoteUpdateDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/notes")
@RequiredArgsConstructor
@Tag(name = "NOTES", description = "Operations about notes")
@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
public class NoteController {

    private final NoteService noteService;

    @Operation(
            summary = "Get all notes",
            description = "Get all notes",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Notes found", useReturnTypeSchema = true)
            }
    )
    @GetMapping
    public Page<NoteDTO> getAllNotes(Pageable pageable){
        return noteService.getAllNotes(pageable);
    }

    @Operation(
            summary = "Get a note by id",
            description = "Get a note by id",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Note found", useReturnTypeSchema = true),
                    @ApiResponse(responseCode = "404", description = "Note not found", content = @Content(schema = @Schema(hidden = true)))
            }
    )
    @GetMapping("/{id}")
    public ResponseEntity<NoteDTO> getNote(@PathVariable Long id){
        return ResponseEntity.ok(noteService.getNote(id));
    }

    @Operation(
            summary = "Create a new note",
            description = "Create a new note",
            responses = {
                    @ApiResponse(responseCode = "201", description = "Note created", useReturnTypeSchema = true),
                    @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content(schema = @Schema(hidden = true)))
            }
    )
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<NoteDTO> create(@RequestBody NoteCreateDTO noteCreateDTO){
        return ResponseEntity.status(HttpStatus.CREATED).body(noteService.create(noteCreateDTO));
    }

    @Operation(
            summary = "Update a note by id",
            description = "Update a note by id",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Note updated", useReturnTypeSchema = true),
                    @ApiResponse(responseCode = "404", description = "Note not found", content = @Content(schema = @Schema(hidden = true)))
            }
    )
    @PutMapping("/{id}")
    public ResponseEntity<NoteDTO> update(@PathVariable Long id, @RequestBody NoteUpdateDTO noteUpdateDTO){
        return ResponseEntity.ok(noteService.update(id, noteUpdateDTO));
    }

    @Operation(
            summary = "Delete a note by id",
            description = "Delete a note by id",
            responses = {
                    @ApiResponse(responseCode = "204", description = "Note deleted"),
                    @ApiResponse(responseCode = "404", description = "Note not found", content = @Content(schema = @Schema(hidden = true)))
            }
    )
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> delete(@PathVariable Long id){
        noteService.delete(id);
        return ResponseEntity.noContent().build();
    }
}