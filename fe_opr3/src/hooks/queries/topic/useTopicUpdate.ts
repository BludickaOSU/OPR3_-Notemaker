import {useMutation, useQueryClient} from "@tanstack/react-query";
import axiosInstance from "../../../api/axiosInstance";
import {TopicCreateUpdateDTO} from "../../../model/topic/TopicCreateUpdateDTO";
import {TopicDTO} from "../../../model/topic/TopicDTO";

const updateTopic = async ({ id, data }: { id: string; data: TopicCreateUpdateDTO }): Promise<TopicDTO> => {
    try {
        const response = await axiosInstance.put<TopicDTO>(`/topics/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

export const useTopicUpdate = () => {
    const queryClient = useQueryClient();

    return useMutation<TopicDTO, Error, { id: string; data: TopicCreateUpdateDTO }>({
        mutationFn: updateTopic,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: 'topics'}).then(r => console.log('Invalidated topics:', r));
        },
    });
};