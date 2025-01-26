package cz.osu.cerveny.be_opr3.repository;

import cz.osu.cerveny.be_opr3.model.entity.Topic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TopicRepository extends JpaRepository<Topic, Long> {

    Page<Topic> findAllByOwnerOfTheTopicId(Pageable pageable, Long ownerId);


}
