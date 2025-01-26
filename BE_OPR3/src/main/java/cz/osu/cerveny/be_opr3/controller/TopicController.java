package cz.osu.cerveny.be_opr3.controller;

import cz.osu.cerveny.be_opr3.service.TopicService;
import cz.osu.cerveny.be_opr3.service.dto.topic.TopicCreateUpdateDTO;
import cz.osu.cerveny.be_opr3.service.dto.topic.TopicDTO;
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
@RequestMapping("/topics")
@RequiredArgsConstructor
@Tag(name = "TOPICS", description = "Operations about topics")
@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
public class TopicController {

    private final TopicService topicService;

    @Operation(
            summary = "Get all topics",
            description = "Get all topics",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Topics found", useReturnTypeSchema = true)
            }
    )
    @GetMapping
    public Page<TopicDTO> getAllTopics(Pageable pageable){
        return topicService.getAllTopics(pageable);
    }

    @Operation(
            summary = "Get a topic by id",
            description = "Get a topic by id",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Topic found", useReturnTypeSchema = true),
                    @ApiResponse(responseCode = "404", description = "Topic not found", content = @Content(schema = @Schema(hidden = true)))
            }
    )
    @GetMapping("/{id}")
    public ResponseEntity<TopicDTO> getTopic(@PathVariable Long id){
        return ResponseEntity.ok(topicService.getTopic(id));
    }

    @Operation(
            summary = "Create a new topic",
            description = "Create a new topic",
            responses = {
                    @ApiResponse(responseCode = "201", description = "Topic created", useReturnTypeSchema = true),
                    @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content(schema = @Schema(hidden = true)))
            }
    )
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<TopicDTO> create(@RequestBody TopicCreateUpdateDTO topicCreateUpdateDTO){
        return ResponseEntity.status(HttpStatus.CREATED).body(topicService.create(topicCreateUpdateDTO));
    }

    @Operation(
            summary = "Delete a topic by id",
            description = "Delete a topic by id",
            responses = {
                    @ApiResponse(responseCode = "204", description = "Topic deleted"),
                    @ApiResponse(responseCode = "404", description = "Topic not found", content = @Content(schema = @Schema(hidden = true)))
            }
    )
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> delete(@PathVariable Long id){
        topicService.deleteTopic(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(
            summary = "Update a topic by id",
            description = "Update a topic by id",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Topic updated", useReturnTypeSchema = true),
                    @ApiResponse(responseCode = "404", description = "Topic not found", content = @Content(schema = @Schema(hidden = true)))
            }
    )
    @PutMapping("/{id}")
    public ResponseEntity<TopicDTO> update(@PathVariable Long id, @RequestBody TopicCreateUpdateDTO topicCreateUpdateDTO){
        return ResponseEntity.ok(topicService.update(id, topicCreateUpdateDTO));
    }
}