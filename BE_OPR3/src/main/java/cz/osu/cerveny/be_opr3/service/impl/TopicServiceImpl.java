package cz.osu.cerveny.be_opr3.service.impl;

import cz.osu.cerveny.be_opr3.exception.NotFoundException;
import cz.osu.cerveny.be_opr3.model.entity.Topic;
import cz.osu.cerveny.be_opr3.model.entity.User;
import cz.osu.cerveny.be_opr3.repository.NoteRepository;
import cz.osu.cerveny.be_opr3.repository.TopicRepository;
import cz.osu.cerveny.be_opr3.repository.UserRepository;
import cz.osu.cerveny.be_opr3.service.TopicService;
import cz.osu.cerveny.be_opr3.service.dto.topic.TopicCreateUpdateDTO;
import cz.osu.cerveny.be_opr3.service.dto.topic.TopicDTO;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TopicServiceImpl implements TopicService {
    private final TopicRepository topicRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final NoteRepository noteRepository;

    @Override
    public TopicDTO create(TopicCreateUpdateDTO topicCreateUpdateDTO) {
        var topic = modelMapper.map(topicCreateUpdateDTO, Topic.class);
        topic.setOwnerOfTheTopic(getCurrentUser());
        return modelMapper.map(topicRepository.save(topic), TopicDTO.class);
    }

    @Override
    public TopicDTO update(Long id, TopicCreateUpdateDTO topicCreateUpdateDTO) {
        var topic = topicRepository.findById(id).orElseThrow(() -> new NotFoundException("Topic not found"));
        modelMapper.map(topicCreateUpdateDTO, topic);
        return modelMapper.map(topicRepository.save(topic), TopicDTO.class);
    }

    @Override
    public void deleteTopic(Long id) {
        noteRepository.deleteReferenceByTopicId(id);
        topicRepository.deleteById(id);
    }

    @Override
    public TopicDTO getTopic(Long id) {
        return modelMapper
                .map(topicRepository
                .findById(id)
                .orElseThrow(() -> new NotFoundException("Topic not found"))
                ,TopicDTO.class);
    }

    @Override
    public Page<TopicDTO> getAllTopics(Pageable pageable) {
        return topicRepository
                .findAllByOwnerOfTheTopicId(pageable, getCurrentUser().getId())
                .map(topic -> modelMapper.map(topic, TopicDTO.class));
    }

    private User getCurrentUser(){
        var username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(username).orElseThrow(() -> new NotFoundException("User not found"));
    }
}
