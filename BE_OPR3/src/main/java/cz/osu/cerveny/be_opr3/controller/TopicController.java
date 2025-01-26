package cz.osu.cerveny.be_opr3.controller;

import cz.osu.cerveny.be_opr3.service.TopicService;
import cz.osu.cerveny.be_opr3.service.dto.topic.TopicCreateUpdateDTO;
import cz.osu.cerveny.be_opr3.service.dto.topic.TopicDTO;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @GetMapping
    public Page<TopicDTO> getAllTopics(Pageable pageable){
        return topicService.getAllTopics(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TopicDTO> getTopic(@PathVariable Long id){
        return ResponseEntity.ok(topicService.getTopic(id));
    }

    @PostMapping
    public ResponseEntity<TopicDTO> create(@RequestBody TopicCreateUpdateDTO topicCreateUpdateDTO){
        return ResponseEntity.ok(topicService.create(topicCreateUpdateDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        topicService.deleteTopic(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<TopicDTO> update(@PathVariable Long id, @RequestBody TopicCreateUpdateDTO topicCreateUpdateDTO){
        return ResponseEntity.ok(topicService.update(id, topicCreateUpdateDTO));
    }













}
