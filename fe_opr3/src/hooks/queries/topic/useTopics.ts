import axiosInstance from "../../../api/axiosInstance";
import {useQuery} from "@tanstack/react-query";
import {BaseResponse, TopicDTO} from "../../../model/topic/TopicDTO";

const fetchTopics = async (): Promise<TopicDTO[]> => {
    try {
        const response = await axiosInstance.get<BaseResponse<TopicDTO[]>>('topics');
        return response.data.content;
    } catch (error) {
        console.error('Error fetching topics:', error);
        throw error;
    }
};

export const useTopics = () => {
    return useQuery<TopicDTO[], Error>({
        queryKey: topicsQueryKey,
        queryFn: fetchTopics
    });
};


export const topicsQueryKey = ["topics"]