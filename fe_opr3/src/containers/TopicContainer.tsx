import React, { useState } from 'react';
import { useTopics } from '../hooks/queries/topic/useTopics';
import { useTopicDelete } from '../hooks/queries/topic/useTopicDelete';
import { useTopicUpdate } from '../hooks/queries/topic/useTopicUpdate';
import { useCreateTopic } from '../hooks/queries/topic/useTopicCreate';
import TopicCard from '../component/cards/topic/TopicCard';
import TopicCardDetail from '../component/cards/topic/TopicCardDetail';
import TopicUpdateForm from '../component/forms/topic/TopicUpdateForm';
import TopicCreateForm from '../component/forms/topic/TopicCreateForm';
import { Box, Container, Typography, Button, Modal } from '@mui/material';
import { TopicDTO } from '../model/topic/TopicDTO';

const TopicContainer: React.FC = () => {
    const { data: topics, isLoading, error, refetch } = useTopics();
    const deleteTopic = useTopicDelete();
    const updateTopic = useTopicUpdate();
    const createTopic = useCreateTopic();
    const [selectedTopic, setSelectedTopic] = useState<TopicDTO | null>(null);
    const [isUpdateFormOpen, setIsUpdateFormOpen] = useState<boolean>(false);
    const [isCreateFormOpen, setIsCreateFormOpen] = useState<boolean>(false);

    const handleTopicClick = (topic: TopicDTO) => {
        setSelectedTopic(topic);
    };

    const handleTopicDetailClose = () => {
        setSelectedTopic(null);
    };

    const handleSuccess = () => {
        refetch();
    };

    const handleDelete = async (id: number) => {
        await deleteTopic(id);
        handleSuccess();
        handleTopicDetailClose();
    };

    const handleUpdate = (topic: TopicDTO) => {
        setSelectedTopic(topic);
        setIsUpdateFormOpen(true);
    };

    const handleUpdateSubmit = async (topic: TopicDTO) => {
        const updateData = {
            id: topic.id.toString(),
            data: {
                name: topic.name,
                description: topic.description,
            }
        };
        await updateTopic.mutateAsync(updateData);
        handleSuccess();
        setIsUpdateFormOpen(false);
        handleTopicDetailClose();
    };

    const handleCreate = () => {
        setIsCreateFormOpen(true);
    };

    const handleCreateSubmit = async (topic: TopicDTO) => {
        await createTopic.mutateAsync(topic);
        handleSuccess();
        setIsCreateFormOpen(false);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading topics</div>;

    return (
        <Container>
            <Box sx={{ flexDirection: 'column', alignItems: 'center', textAlign: "center"}}>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', textAlign: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Topics
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleCreate}>
                        Add Topic
                    </Button>
                </Box>
                {topics?.map(topic => (
                    <TopicCard key={topic.id} topic={topic} onClick={handleTopicClick} />
                ))}
                <Modal
                    open={!!selectedTopic}
                    onClose={handleTopicDetailClose}
                    aria-labelledby="topic-detail-modal"
                    aria-describedby="topic-detail-modal-description"
                >
                    <Box>
                        {selectedTopic && (
                            <TopicCardDetail
                                topic={selectedTopic}
                                onClose={handleTopicDetailClose}
                                onDelete={handleDelete}
                                onUpdate={handleUpdate}
                            />
                        )}
                    </Box>
                </Modal>
                <Modal
                    open={isUpdateFormOpen}
                    onClose={() => setIsUpdateFormOpen(false)}
                    aria-labelledby="topic-update-modal"
                    aria-describedby="topic-update-modal-description"
                >
                    <Box>
                        {selectedTopic && (
                            <TopicUpdateForm
                                topic={selectedTopic}
                                onClose={() => setIsUpdateFormOpen(false)}
                                onUpdate={handleUpdateSubmit}
                            />
                        )}
                    </Box>
                </Modal>
                <Modal
                    open={isCreateFormOpen}
                    onClose={() => setIsCreateFormOpen(false)}
                    aria-labelledby="topic-create-modal"
                    aria-describedby="topic-create-modal-description"
                >
                    <Box>
                        <TopicCreateForm
                            onClose={() => setIsCreateFormOpen(false)}
                            onCreate={handleCreateSubmit}
                        />
                    </Box>
                </Modal>
            </Box>
        </Container>
    );
};

export default TopicContainer;