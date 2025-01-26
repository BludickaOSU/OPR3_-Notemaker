import {useMutation} from "@tanstack/react-query";
import axiosInstance from "../../../api/axiosInstance";
import {TopicCreateUpdateDTO} from "../../../model/topic/TopicCreateUpdateDTO";
import {TopicDTO} from "../../../model/topic/TopicDTO";


const createTopic = async (topic: TopicCreateUpdateDTO): Promise<TopicDTO> => {
    try {
        const response = await axiosInstance.post<TopicDTO>('/topics', topic);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const useCreateTopic = () => {
    return useMutation<TopicDTO, Error, TopicCreateUpdateDTO>({
        mutationFn: createTopic,
    });
};