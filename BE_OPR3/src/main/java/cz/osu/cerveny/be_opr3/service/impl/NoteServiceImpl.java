package cz.osu.cerveny.be_opr3.service.impl;

import cz.osu.cerveny.be_opr3.exception.NotFoundException;
import cz.osu.cerveny.be_opr3.model.entity.Note;
import cz.osu.cerveny.be_opr3.model.entity.User;
import cz.osu.cerveny.be_opr3.repository.NoteRepository;
import cz.osu.cerveny.be_opr3.repository.TopicRepository;
import cz.osu.cerveny.be_opr3.repository.UserRepository;
import cz.osu.cerveny.be_opr3.service.NoteService;
import cz.osu.cerveny.be_opr3.service.dto.note.NoteCreateDTO;
import cz.osu.cerveny.be_opr3.service.dto.note.NoteDTO;
import cz.osu.cerveny.be_opr3.service.dto.note.NoteUpdateDTO;
import cz.osu.cerveny.be_opr3.service.dto.topic.TopicDTO;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NoteServiceImpl implements NoteService {

    private final NoteRepository noteRepository;
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final TopicRepository topicRepository;

    @Override
    public void delete(Long id) {
        noteRepository.deleteById(id);
    }

    @Override
    public NoteDTO getNote(Long id) {
        return noteRepository.findById(id)
                .map(note -> modelMapper.map(note, NoteDTO.class))
                .orElseThrow(() -> new NotFoundException("Note not found"));
    }

    @Override
    public Page<NoteDTO> getAllNotes(Pageable pageable) {
        return noteRepository
                .findAllByOwnerOfTheNote_IdOrderByImportancy_Priority(pageable, getCurrentUser().getId())
                .map(note -> {
                    NoteDTO noteDTO = modelMapper.map(note, NoteDTO.class);
                    noteDTO.setTopics(note.getTopics().stream()
                            .map(topic -> modelMapper.map(topicRepository.findById(topic.getId()).orElseThrow(() -> new NotFoundException("Topic not found")), TopicDTO.class))
                            .toList());
                    return noteDTO;
                });
    }


    @Override
    public NoteDTO create(NoteCreateDTO noteCreateDTO) {
        var note = modelMapper.map(noteCreateDTO, Note.class);
        note.setOwnerOfTheNote(getCurrentUser());
        note.setImportancy(0);
        return modelMapper.map(noteRepository.save(note), NoteDTO.class);

    }

    @Override
    public NoteDTO update(Long id, NoteUpdateDTO noteUpdateDTO) {
        var note = noteRepository.findById(id).orElseThrow(() -> new NotFoundException("Note not found"));
        var user = getCurrentUser();
        note.setTopics(topicRepository.findAllById(noteUpdateDTO.getTopicIds()));
        modelMapper.map(noteUpdateDTO, note);
        return modelMapper.map(noteRepository.save(note), NoteDTO.class);
    }

    private User getCurrentUser(){
        var username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(username).orElseThrow(() -> new NotFoundException("User not found"));
    }

}
