package cz.osu.cerveny.be_opr3.repository;

import cz.osu.cerveny.be_opr3.model.entity.Note;
import cz.osu.cerveny.be_opr3.model.entity.Topic;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface NoteRepository extends JpaRepository<Note, Long> {

        @Query("SELECT n FROM Note n WHERE n.ownerOfTheNote.id = :userId ORDER BY n.importancy")
        Page<Note> findAllByOwnerOfTheNote_IdOrderByImportancy_Priority(Pageable pageable, @Param("userId") Long userId);

        @Modifying
        @Transactional
        @Query(value = "DELETE FROM note_topic WHERE topic_id = :topicId", nativeQuery = true)
        void deleteReferenceByTopicId(@Param("topicId") Long topicId);
}
