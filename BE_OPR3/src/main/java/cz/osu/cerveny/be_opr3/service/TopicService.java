package cz.osu.cerveny.be_opr3.service;

import cz.osu.cerveny.be_opr3.service.dto.topic.TopicCreateUpdateDTO;
import cz.osu.cerveny.be_opr3.service.dto.topic.TopicDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TopicService {
    TopicDTO create(TopicCreateUpdateDTO topicCreateUpdateDTO);
    TopicDTO update(Long id, TopicCreateUpdateDTO topicCreateUpdateDTO);
    void deleteTopic(Long id);
    TopicDTO getTopic(Long id);
    Page<TopicDTO> getAllTopics(Pageable pageable);
}
