import axiosInstance from "../../../api/axiosInstance";
import {useQuery} from "@tanstack/react-query";
import {TopicDTO} from "../../../model/topic/TopicDTO";


const fetchTopic = async (id: string): Promise<TopicDTO> => {
    try {
        const response = await axiosInstance.get<TopicDTO>(`topics/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching topic:', error);
        throw error;
    }
};

export const useTopic = (id: string) => {
    return useQuery<TopicDTO, Error>({
        queryKey: topicQueryKey(id),
        queryFn: () => fetchTopic(id),
    });
};

export const topicQueryKey = (id: string) => ['topic', id];
